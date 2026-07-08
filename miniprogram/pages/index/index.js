// pages/index/index.js
const { mockApi } = require('../../utils/mock-data');
const { formatTime, formatNumber, debounce } = require('../../utils/util');

Page({
  data: {
    categories: [],
    activeCategory: 'all',
    blogList: [],
    page: 1,
    pageSize: 10,
    hasMore: true,
    loading: false,
    searchValue: '',
    showBackTop: false,
    scrollTop: 0
  },

  onLoad() {
    this.loadCategories();
    this.loadBlogList(true);
  },

  onShow() {
    // 从发布页返回时刷新列表
    if (this._needRefresh) {
      this.loadBlogList(true);
      this._needRefresh = false;
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadBlogList(true).then(() => {
      wx.stopPullDownRefresh();
    });
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadBlogList(false);
    }
  },

  // 页面滚动
  onPageScroll(e) {
    const showBackTop = e.scrollTop > 600;
    if (showBackTop !== this.data.showBackTop) {
      this.setData({ showBackTop });
    }
  },

  // 加载分类
  async loadCategories() {
    const categories = await mockApi.getCategories();
    this.setData({ categories });
  },

  // 加载博客列表
  async loadBlogList(refresh = false) {
    if (this.data.loading) return;

    const page = refresh ? 1 : this.data.page;
    this.setData({ loading: true });

    try {
      const result = await mockApi.getBlogList(
        page,
        this.data.pageSize,
        this.data.activeCategory
      );

      // 格式化数据
      const list = result.list.map(blog => ({
        ...blog,
        timeFormatted: formatTime(blog.createdAt),
        viewCountFormatted: formatNumber(blog.viewCount),
        likeCountFormatted: formatNumber(blog.likeCount)
      }));

      const blogList = refresh ? list : [...this.data.blogList, ...list];

      this.setData({
        blogList,
        page: page + 1,
        hasMore: result.hasMore,
        loading: false
      });
    } catch (err) {
      console.error('加载博客列表失败:', err);
      this.setData({ loading: false });
      wx.showToast({ title: '加载失败', icon: 'none' });
    }
  },

  // 分类切换
  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    if (id === this.data.activeCategory) return;

    this.setData({
      activeCategory: id,
      blogList: [],
      page: 1,
      hasMore: true
    });
    this.loadBlogList(true);
  },

  // 搜索相关
  onSearchChange(e) {
    this.setData({ searchValue: e.detail });
  },

  onSearch: debounce(function () {
    wx.showToast({ title: '搜索功能开发中', icon: 'none' });
  }, 500),

  onSearchClear() {
    this.setData({ searchValue: '' });
    this.loadBlogList(true);
  },

  // 点赞
  async onBlogLike(e) {
    const { blogId } = e.detail;
    try {
      const result = await mockApi.toggleLike(blogId);
      const blogList = this.data.blogList.map(blog => {
        if (blog.id === blogId) {
          return {
            ...blog,
            isLiked: result.isLiked,
            likeCount: result.likeCount,
            likeCountFormatted: formatNumber(result.likeCount)
          };
        }
        return blog;
      });
      this.setData({ blogList });
    } catch (err) {
      console.error('点赞失败:', err);
    }
  },

  // 返回顶部
  onBackTop() {
    wx.pageScrollTo({ scrollTop: 0, duration: 300 });
  }
});
