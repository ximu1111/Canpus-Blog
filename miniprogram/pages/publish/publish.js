// pages/publish/publish.js
const { mockApi, categories } = require('../../utils/mock-data');
const { checkLogin, showSuccess, showError } = require('../../utils/util');
const Toast = require('@vant/weapp/toast/toast');

Page({
  data: {
    title: '',
    content: '',
    imageList: [],
    categories: [],
    selectedCategory: null,
    tempCategory: null,
    showCategoryPicker: false,
    showPreview: false,
    canPublish: false,
    userAvatar: '/images/default-avatar.png',
    userName: '校园用户',
    userSchool: ''
  },

  onLoad() {
    this.setData({ categories });
    const app = getApp();
    if (app.globalData.userInfo) {
      this.setData({
        userAvatar: app.globalData.userInfo.avatarUrl,
        userName: app.globalData.userInfo.nickName,
        userSchool: app.globalData.userInfo.school
      });
    }
  },

  // 标题输入
  onTitleInput(e) {
    const title = e.detail.value;
    this.setData({ title });
    this.checkCanPublish();
  },

  // 内容输入
  onContentInput(e) {
    const content = e.detail.value;
    this.setData({ content });
    this.checkCanPublish();
  },

  // 检查是否可发布
  checkCanPublish() {
    const { title, content, selectedCategory } = this.data;
    const canPublish = title.trim().length > 0 &&
      content.trim().length > 0 &&
      selectedCategory !== null;
    this.setData({ canPublish });
  },

  // 分类选择
  onCategorySelect() {
    this.setData({
      showCategoryPicker: true,
      tempCategory: this.data.selectedCategory
    });
  },

  onCloseCategoryPicker() {
    this.setData({ showCategoryPicker: false });
  },

  onPickerItemTap(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ tempCategory: this.data.categories[index] });
  },

  onConfirmCategory() {
    if (this.data.tempCategory) {
      this.setData({
        selectedCategory: this.data.tempCategory,
        showCategoryPicker: false
      });
      this.checkCanPublish();
    }
  },

  // 图片上传
  onChooseImage() {
    const remaining = 9 - this.data.imageList.length;
    wx.chooseMedia({
      count: remaining,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: (res) => {
        const newImages = res.tempFiles.map(file => ({
          url: file.tempFilePath,
          size: file.size,
          compressing: true
        }));

        this.setData({
          imageList: [...this.data.imageList, ...newImages]
        });

        // 模拟压缩
        newImages.forEach((img, i) => {
          const idx = this.data.imageList.length - newImages.length + i;
          setTimeout(() => {
            this.setData({
              [`imageList[${idx}].compressing`]: false
            });
          }, 500 + Math.random() * 1000);
        });
      }
    });
  },

  // 图片预览
  onImagePreview(e) {
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.imageList[index].url,
      urls: this.data.imageList.map(img => img.url)
    });
  },

  // 图片删除
  onImageDelete(e) {
    const index = e.currentTarget.dataset.index;
    const imageList = [...this.data.imageList];
    imageList.splice(index, 1);
    this.setData({ imageList });
  },

  // 工具栏操作
  onInsertBold() {
    const content = this.data.content;
    this.setData({ content: content + '**加粗文字**' });
  },

  onInsertEmoji() {
    const emojis = ['😊', '👍', '🎉', '❤️', '🔥', '✨', '📚', '🎓', '💪', '🌟'];
    const random = emojis[Math.floor(Math.random() * emojis.length)];
    this.setData({ content: this.data.content + random });
  },

  onInsertLink() {
    wx.showModal({
      title: '插入链接',
      editable: true,
      placeholderText: '请输入链接地址',
      success: (res) => {
        if (res.confirm && res.content) {
          this.setData({
            content: this.data.content + '\n[链接](' + res.content + ')'
          });
        }
      }
    });
  },

  // 预览
  onPreview() {
    if (!this.data.title.trim() && !this.data.content.trim()) {
      Toast('请先填写内容');
      return;
    }
    this.setData({ showPreview: true });
  },

  onClosePreview() {
    this.setData({ showPreview: false });
  },

  // 发布
  async onPublish() {
    if (!this.data.canPublish) return;
    if (!checkLogin()) return;

    wx.showLoading({ title: '发布中...' });

    try {
      const blogData = {
        title: this.data.title,
        content: this.data.content,
        images: this.data.imageList.map(img => img.url),
        category: this.data.selectedCategory.id
      };

      const result = await mockApi.publishBlog(blogData);

      wx.hideLoading();
      showSuccess('发布成功');

      // 通知首页刷新
      const pages = getCurrentPages();
      const indexPage = pages.find(p => p.route === 'pages/index/index');
      if (indexPage) {
        indexPage._needRefresh = true;
      }

      // 返回首页
      setTimeout(() => {
        wx.switchTab({ url: '/pages/index/index' });
      }, 1000);
    } catch (err) {
      wx.hideLoading();
      showError('发布失败');
      console.error('发布失败:', err);
    }
  }
});
