// components/blog-card/blog-card.js
const { formatTime, formatNumber } = require('../../utils/util');

Component({
  properties: {
    blog: {
      type: Object,
      value: {},
      observer(newVal) {
        if (newVal && newVal.id) {
          this.setData({
            'blog.timeFormatted': formatTime(newVal.createdAt),
            'blog.viewCountFormatted': formatNumber(newVal.viewCount),
            'blog.likeCountFormatted': formatNumber(newVal.likeCount)
          });
        }
      }
    }
  },

  data: {
    animating: false
  },

  methods: {
    onCardTap() {
      const { blog } = this.data;
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + blog.id
      });
    },

    onLikeTap() {
      if (this.data.animating) return;

      this.setData({ animating: true });
      setTimeout(() => {
        this.setData({ animating: false });
      }, 300);

      this.triggerEvent('like', { blogId: this.data.blog.id });
    },

    onCommentTap() {
      const { blog } = this.data;
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + blog.id + '&focusComment=true'
      });
    }
  }
});
