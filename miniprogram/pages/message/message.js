// pages/message/message.js
const { mockApi } = require('../../utils/mock-data');
const { formatTime } = require('../../utils/util');

Page({
  data: {
    tabs: [
      { type: 'all', name: '全部', unread: 0 },
      { type: 'like', name: '点赞', unread: 0 },
      { type: 'comment', name: '评论', unread: 0 },
      { type: 'follow', name: '关注', unread: 0 },
      { type: 'system', name: '系统', unread: 0 }
    ],
    activeTab: 'all',
    messages: [],
    filteredList: [],
    loading: false
  },

  onLoad() {
    this.loadMessages();
  },

  onShow() {
    // 每次显示时刷新
    this.loadMessages();
  },

  // 加载消息
  async loadMessages() {
    this.setData({ loading: true });
    try {
      const messages = await mockApi.getMessages();
      const formatted = messages.map(m => ({
        ...m,
        timeFormatted: formatTime(m.createdAt)
      }));

      // 计算未读数
      const tabs = this.data.tabs.map(tab => {
        if (tab.type === 'all') {
          return { ...tab, unread: formatted.filter(m => !m.isRead).length };
        }
        return {
          ...tab,
          unread: formatted.filter(m => m.type === tab.type && !m.isRead).length
        };
      });

      this.setData({
        messages: formatted,
        tabs,
        loading: false
      });
      this.filterMessages();
    } catch (err) {
      console.error('加载消息失败:', err);
      this.setData({ loading: false });
    }
  },

  // 切换标签
  onTabChange(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ activeTab: type });
    this.filterMessages();
  },

  // 过滤消息
  filterMessages() {
    const { messages, activeTab } = this.data;
    let filtered;
    if (activeTab === 'all') {
      filtered = messages;
    } else {
      filtered = messages.filter(m => m.type === activeTab);
    }
    this.setData({ filteredList: filtered });
  },

  // 点击消息
  onMessageTap(e) {
    const index = e.currentTarget.dataset.index;
    const message = this.data.filteredList[index];

    // 标记已读
    if (!message.isRead) {
      const messages = this.data.messages.map(m => {
        if (m.id === message.id) {
          return { ...m, isRead: true };
        }
        return m;
      });
      this.setData({ messages });

      // 更新未读数
      const tabs = this.data.tabs.map(tab => {
        if (tab.type === 'all') {
          return { ...tab, unread: messages.filter(m => !m.isRead).length };
        }
        return {
          ...tab,
          unread: messages.filter(m => m.type === tab.type && !m.isRead).length
        };
      });
      this.setData({ tabs });
      this.filterMessages();
    }

    // 根据消息类型跳转
    if (message.type === 'like' || message.type === 'comment' || message.type === 'reply') {
      if (message.blogTitle) {
        wx.showToast({ title: '跳转到博客详情', icon: 'none' });
      }
    } else if (message.type === 'follow') {
      wx.showToast({ title: '查看用户主页', icon: 'none' });
    }
  }
});
