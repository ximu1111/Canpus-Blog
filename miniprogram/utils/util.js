// utils/util.js - 工具函数

/**
 * 格式化时间
 */
function formatTime(date) {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  const now = new Date();
  const diff = now - date;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return '刚刚';
  } else if (diff < hour) {
    return Math.floor(diff / minute) + '分钟前';
  } else if (diff < day) {
    return Math.floor(diff / hour) + '小时前';
  } else if (diff < 7 * day) {
    return Math.floor(diff / day) + '天前';
  } else {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const d = date.getDate();
    if (year === now.getFullYear()) {
      return month + '月' + d + '日';
    }
    return year + '年' + month + '月' + d + '日';
  }
}

/**
 * 格式化数字（点赞数、评论数等）
 */
function formatNumber(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return String(num);
}

/**
 * 生成唯一ID
 */
function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * 防抖函数
 */
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流函数
 */
function throttle(fn, interval = 300) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/**
 * 显示加载提示
 */
function showLoading(title = '加载中...') {
  wx.showLoading({ title, mask: true });
}

function hideLoading() {
  wx.hideLoading();
}

/**
 * 显示成功提示
 */
function showSuccess(title) {
  wx.showToast({ title, icon: 'success' });
}

/**
 * 显示错误提示
 */
function showError(title) {
  wx.showToast({ title, icon: 'none' });
}

/**
 * 检查是否登录
 */
function checkLogin() {
  const app = getApp();
  if (!app.globalData.isLoggedIn) {
    wx.showModal({
      title: '提示',
      content: '请先登录后再操作',
      confirmText: '去登录',
      success(res) {
        if (res.confirm) {
          wx.switchTab({ url: '/pages/profile/profile' });
        }
      }
    });
    return false;
  }
  return true;
}

module.exports = {
  formatTime,
  formatNumber,
  generateId,
  debounce,
  throttle,
  showLoading,
  hideLoading,
  showSuccess,
  showError,
  checkLogin
};
