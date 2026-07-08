// app.js
App({
  globalData: {
    userInfo: null,
    isLoggedIn: false,
    baseUrl: 'https://api.campus-blog.example.com'
  },

  onLaunch() {
    // 检查登录状态
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
      this.globalData.isLoggedIn = true;
    }

    // 检查更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate();
                }
              }
            });
          });
        }
      });
    }
  },

  // 全局登录方法
  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            // 实际项目中这里调用后端接口换取 openId 和 session_key
            const mockUserInfo = {
              id: 'u_' + Date.now(),
              nickName: '校园用户',
              avatarUrl: '/images/default-avatar.png',
              school: '某某大学',
              major: '计算机科学与技术',
              bio: '这个人很懒，什么都没写~',
              followCount: 0,
              fansCount: 0,
              blogCount: 0
            };
            this.globalData.userInfo = mockUserInfo;
            this.globalData.isLoggedIn = true;
            wx.setStorageSync('userInfo', mockUserInfo);
            resolve(mockUserInfo);
          } else {
            reject(new Error('登录失败'));
          }
        },
        fail: reject
      });
    });
  },

  // 全局退出登录
  logout() {
    this.globalData.userInfo = null;
    this.globalData.isLoggedIn = false;
    wx.removeStorageSync('userInfo');
  }
});
