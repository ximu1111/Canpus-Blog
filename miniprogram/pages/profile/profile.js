// pages/profile/profile.js
const { mockApi } = require('../../utils/mock-data');
const { formatTime, checkLogin } = require('../../utils/util');

Page({
  data: {
    isLoggedIn: false,
    userInfo: null,
    myBlogs: [],
    draftCount: 0
  },

  onLoad() {
    this.checkLoginStatus();
  },

  onShow() {
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus() {
    const app = getApp();
    if (app.globalData.isLoggedIn && app.globalData.userInfo) {
      this.setData({
        isLoggedIn: true,
        userInfo: app.globalData.userInfo
      });
      this.loadMyBlogs();
    } else {
      this.setData({
        isLoggedIn: false,
        userInfo: null,
        myBlogs: []
      });
    }
  },

  // 登录
  async onLogin() {
    const app = getApp();
    try {
      wx.showLoading({ title: '登录中...' });
      const userInfo = await app.login();
      wx.hideLoading();

      this.setData({
        isLoggedIn: true,
        userInfo
      });
      wx.showToast({ title: '登录成功', icon: 'success' });
      this.loadMyBlogs();
    } catch (err) {
      wx.hideLoading();
      wx.showToast({ title: '登录失败', icon: 'none' });
    }
  },

  // 加载我的博客
  async loadMyBlogs() {
    if (!this.data.isLoggedIn) return;

    try {
      const result = await mockApi.getBlogList(1, 5, 'all');
      // 模拟筛选自己的博客
      const app = getApp();
      const myBlogs = result.list
        .filter(b => b.userId === (app.globalData.userInfo?.id || ''))
        .slice(0, 3)
        .map(b => ({
          ...b,
          timeFormatted: formatTime(b.createdAt)
        }));

      this.setData({ myBlogs });
    } catch (err) {
      console.error('加载博客失败:', err);
    }
  },

  // 统计点击
  onStatTap(e) {
    const type = e.currentTarget.dataset.type;
    const labels = { blog: '我的博客', follow: '我的关注', fans: '我的粉丝' };
    wx.showToast({ title: labels[type] + ' - 开发中', icon: 'none' });
  },

  // 博客点击
  onBlogTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    });
  },

  // 查看全部博客
  onMyBlogs() {
    wx.showToast({ title: '博客列表 - 开发中', icon: 'none' });
  },

  // 菜单点击
  onMenuTap(e) {
    const type = e.currentTarget.dataset.type;
    if (!checkLogin()) return;

    const labels = {
      collect: '我的收藏',
      history: '浏览历史',
      draft: '草稿箱',
      setting: '设置',
      about: '关于'
    };
    wx.showToast({ title: labels[type] + ' - 开发中', icon: 'none' });
  },

  // 退出登录
  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          app.logout();
          this.setData({
            isLoggedIn: false,
            userInfo: null,
            myBlogs: []
          });
          wx.showToast({ title: '已退出登录', icon: 'success' });
        }
      }
    });
  }
});
