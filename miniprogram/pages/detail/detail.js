// pages/detail/detail.js
const { mockApi } = require('../../utils/mock-data');
const { formatTime, formatNumber, checkLogin } = require('../../utils/util');

Page({
  data: {
    blogId: '',
    blog: null,
    comments: [],
    isSelf: false,
    sortType: 'latest',
    commentLoading: false,
    showCommentInput: false,
    commentText: '',
    replyToUser: null,
    replyToComment: null
  },

  onLoad(options) {
    const { id, focusComment } = options;
    this.setData({ blogId: id });
    this.loadBlogDetail(id);
    this.loadComments(id);

    if (focusComment) {
      setTimeout(() => {
        this.onCommentInputTap();
      }, 500);
    }
  },

  // 加载博客详情
  async loadBlogDetail(blogId) {
    try {
      const blog = await mockApi.getBlogDetail(blogId);
      if (blog) {
        const app = getApp();
        const isSelf = app.globalData.userInfo && app.globalData.userInfo.id === blog.userId;
        this.setData({
          blog: {
            ...blog,
            timeFormatted: formatTime(blog.createdAt),
            likeCountFormatted: formatNumber(blog.likeCount)
          },
          isSelf
        });
      }
    } catch (err) {
      console.error('加载博客详情失败:', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  // 加载评论
  async loadComments(blogId) {
    this.setData({ commentLoading: true });
    try {
      const comments = await mockApi.getComments(blogId);
      const formatted = comments.map(c => ({
        ...c,
        timeFormatted: formatTime(c.createdAt),
        replies: (c.replies || []).map(r => ({
          ...r,
          timeFormatted: formatTime(r.createdAt)
        }))
      }));
      this.setData({ comments: formatted, commentLoading: false });
    } catch (err) {
      console.error('加载评论失败:', err);
      this.setData({ commentLoading: false });
    }
  },

  // 点赞
  async onLikeTap() {
    if (!checkLogin()) return;
    const { blog, blogId } = this.data;
    try {
      const result = await mockApi.toggleLike(blogId);
      this.setData({
        'blog.isLiked': result.isLiked,
        'blog.likeCount': result.likeCount,
        'blog.likeCountFormatted': formatNumber(result.likeCount)
      });
    } catch (err) {
      console.error('点赞失败:', err);
    }
  },

  // 收藏
  onCollectTap() {
    if (!checkLogin()) return;
    const isCollected = !this.data.blog.isCollected;
    this.setData({ 'blog.isCollected': isCollected });
    wx.showToast({
      title: isCollected ? '已收藏' : '已取消收藏',
      icon: 'success'
    });
  },

  // 关注
  async onFollowTap() {
    if (!checkLogin()) return;
    const { blog } = this.data;
    try {
      const result = await mockApi.toggleFollow(blog.user.id);
      this.setData({
        'blog.user.isFollowed': result.isFollowed,
        'blog.user.fansCount': result.fansCount
      });
      wx.showToast({
        title: result.isFollowed ? '已关注' : '已取消关注',
        icon: 'success'
      });
    } catch (err) {
      console.error('关注失败:', err);
    }
  },

  // 分享
  onShareTap() {
    wx.showShareMenu({ withShareTicket: true });
  },

  onShareAppMessage() {
    const { blog } = this.data;
    return {
      title: blog.title,
      path: '/pages/detail/detail?id=' + blog.id
    };
  },

  // 图片预览
  onImagePreview(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: this.data.blog.images
    });
  },

  // 评论输入
  onCommentInputTap() {
    this.setData({
      showCommentInput: true,
      replyToUser: null,
      replyToComment: null
    });
  },

  onCloseCommentInput() {
    this.setData({
      showCommentInput: false,
      commentText: '',
      replyToUser: null,
      replyToComment: null
    });
  },

  onCommentTextChange(e) {
    this.setData({ commentText: e.detail.value });
  },

  // 回复评论
  onCommentReply(e) {
    const { comment, replyToUser } = e.detail;
    this.setData({
      showCommentInput: true,
      replyToUser: replyToUser,
      replyToComment: comment
    });
  },

  // 发送评论
  async onSendComment() {
    const { commentText, blogId, replyToComment, replyToUser } = this.data;
    if (!commentText.trim()) return;
    if (!checkLogin()) return;

    wx.showLoading({ title: '发送中...' });

    try {
      if (replyToComment && replyToUser) {
        // 回复评论
        const reply = await mockApi.replyComment(
          blogId,
          replyToComment.id,
          commentText,
          replyToUser
        );
        reply.timeFormatted = formatTime(reply.createdAt);

        const comments = this.data.comments.map(c => {
          if (c.id === replyToComment.id) {
            return {
              ...c,
              replies: [...(c.replies || []), reply]
            };
          }
          return c;
        });
        this.setData({ comments });
      } else {
        // 发表评论
        const comment = await mockApi.addComment(blogId, commentText);
        comment.timeFormatted = formatTime(comment.createdAt);
        const comments = [comment, ...this.data.comments];
        this.setData({
          comments,
          'blog.commentCount': this.data.blog.commentCount + 1
        });
      }

      this.setData({
        showCommentInput: false,
        commentText: '',
        replyToUser: null,
        replyToComment: null
      });
      wx.hideLoading();
      wx.showToast({ title: '发送成功', icon: 'success' });
    } catch (err) {
      wx.hideLoading();
      wx.showToast({ title: '发送失败', icon: 'none' });
    }
  },

  // 评论点赞
  onCommentLike(e) {
    const { commentId } = e.detail;
    const comments = this.data.comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          isLiked: !c.isLiked,
          likeCount: c.isLiked ? c.likeCount - 1 : c.likeCount + 1
        };
      }
      return c;
    });
    this.setData({ comments });
  },

  // 用户点击
  onUserTap(e) {
    // 可以跳转到用户主页
    wx.showToast({ title: '用户主页开发中', icon: 'none' });
  },

  // 排序切换
  onSortChange() {
    const sortType = this.data.sortType === 'latest' ? 'hot' : 'latest';
    this.setData({ sortType });

    let comments = [...this.data.comments];
    if (sortType === 'hot') {
      comments.sort((a, b) => b.likeCount - a.likeCount);
    } else {
      comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    this.setData({ comments });
  }
});
