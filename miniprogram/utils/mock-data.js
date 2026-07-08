// utils/mock-data.js - 模拟数据层
// 实际项目中应替换为真实 API 调用

const { generateId } = require('./util');

// 模拟用户数据
const users = [
  {
    id: 'u_001',
    nickName: '林小晴',
    avatarUrl: '/images/avatar1.png',
    school: '北京大学',
    major: '中文系',
    bio: '用文字记录生活的温度',
    followCount: 128,
    fansCount: 356,
    blogCount: 42,
    isFollowed: false
  },
  {
    id: 'u_002',
    nickName: '张学长',
    avatarUrl: '/images/avatar2.png',
    school: '清华大学',
    major: '计算机科学',
    bio: '代码改变世界，也改变自己',
    followCount: 89,
    fansCount: 1203,
    blogCount: 67,
    isFollowed: true
  },
  {
    id: 'u_003',
    nickName: '苏小暖',
    avatarUrl: '/images/avatar3.png',
    school: '复旦大学',
    major: '新闻传播',
    bio: '校园记者，记录每一个精彩瞬间',
    followCount: 256,
    fansCount: 890,
    blogCount: 103,
    isFollowed: false
  },
  {
    id: 'u_004',
    nickName: '王同学',
    avatarUrl: '/images/avatar4.png',
    school: '浙江大学',
    major: '设计学',
    bio: '设计让生活更美好',
    followCount: 67,
    fansCount: 445,
    blogCount: 28,
    isFollowed: false
  },
  {
    id: 'u_005',
    nickName: '李思远',
    avatarUrl: '/images/avatar5.png',
    school: '武汉大学',
    major: '哲学',
    bio: '思考，是最浪漫的冒险',
    followCount: 198,
    fansCount: 672,
    blogCount: 55,
    isFollowed: true
  }
];

// 校园分类
const categories = [
  { id: 'all', name: '全部', icon: '📚' },
  { id: 'campus', name: '校园生活', icon: '🏫' },
  { id: 'study', name: '学习干货', icon: '📖' },
  { id: 'emotion', name: '情感树洞', icon: '💭' },
  { id: 'activity', name: '社团活动', icon: '🎭' },
  { id: 'food', name: '美食探店', icon: '🍜' },
  { id: 'travel', name: '旅行游记', icon: '✈️' }
];

// 模拟博客数据
function generateBlogs() {
  const blogs = [];
  const titles = [
    '图书馆的清晨，阳光洒在书桌上',
    '期末复习攻略：如何高效备考',
    '校园美食地图：食堂隐藏菜单大揭秘',
    '社团招新季，你准备好了吗？',
    '记一次说走就走的周末旅行',
    '大学四年，我最想对大一的自己说的话',
    '实验室日常：科研人的快乐与焦虑',
    '校园歌手大赛回顾，太精彩了！',
    '宿舍改造计划：小空间也能很温馨',
    '考研 vs 就业，我该怎么选？',
    '春天的校园，樱花开了',
    '分享我的英语学习笔记',
    '志愿者活动记录：温暖的一天',
    '校园跑步打卡第100天',
    '毕业季：那些难忘的瞬间'
  ];

  const contents = [
    '清晨六点半，图书馆门口已经排起了长队。推开大门，熟悉的书香扑面而来，阳光透过落地窗洒在木质书桌上，形成斑驳的光影。找一个靠窗的位置坐下，翻开书本，整个世界都安静了下来。',
    '期末考试临近，很多同学开始焦虑。其实高效备考是有方法的：首先制定合理的复习计划，把大目标拆分成小任务；其次利用好番茄工作法，25分钟专注+5分钟休息；最后，不要忽视运动和睡眠的重要性。',
    '作为一个资深吃货，我把学校三个食堂都吃了个遍，终于整理出了这份隐藏菜单！一食堂的麻辣香锅加一份宽粉，绝了；二食堂的番茄鸡蛋面，汤底浓郁；三食堂的铁板饭，量大管饱。',
    '又到了一年一度的社团招新季！从学术科技到文艺体育，从志愿服务到创业实践，总有一个社团适合你。建议大一的学弟学妹们多尝试几个，找到真正热爱的方向。',
    '上周末和室友来了一场说走就走的短途旅行，去了隔壁城市的一座古镇。没有做详细的攻略，就是随意走走逛逛，吃当地的小吃，看老建筑，感受不一样的生活节奏。'
  ];

  const categoryIds = ['campus', 'study', 'emotion', 'activity', 'food', 'travel'];
  const imageCounts = [1, 2, 3, 4, 6, 9];

  for (let i = 0; i < 30; i++) {
    const user = users[i % users.length];
    const imgCount = imageCounts[i % imageCounts.length];
    const images = [];
    for (let j = 0; j < imgCount; j++) {
      images.push('/images/blog-img-' + ((i * 3 + j) % 9 + 1) + '.png');
    }

    blogs.push({
      id: 'b_' + (1000 + i),
      userId: user.id,
      user: user,
      title: titles[i % titles.length],
      content: contents[i % contents.length],
      images: images,
      category: categoryIds[i % categoryIds.length],
      categoryName: categories.find(c => c.id === categoryIds[i % categoryIds.length]).name,
      likeCount: Math.floor(Math.random() * 500),
      commentCount: Math.floor(Math.random() * 100),
      viewCount: Math.floor(Math.random() * 2000) + 100,
      isLiked: Math.random() > 0.7,
      isCollected: Math.random() > 0.8,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  // 按时间排序
  blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return blogs;
}

// 模拟评论数据
function generateComments(blogId) {
  const commentTexts = [
    '写得太好了，收藏了！',
    '同感，我也有类似的经历',
    '感谢分享，很有帮助',
    '哈哈哈太真实了',
    '期待后续更新！',
    '这个观点很新颖',
    '求问具体位置在哪里？',
    '已转发给室友看了',
    '好羡慕这样的生活',
    '加油，继续写下去'
  ];

  const comments = [];
  const count = Math.floor(Math.random() * 8) + 2;

  for (let i = 0; i < count; i++) {
    const user = users[i % users.length];
    const comment = {
      id: 'c_' + generateId(),
      blogId: blogId,
      userId: user.id,
      user: user,
      content: commentTexts[i % commentTexts.length],
      likeCount: Math.floor(Math.random() * 50),
      isLiked: Math.random() > 0.7,
      createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      replies: []
    };

    // 随机添加回复
    if (Math.random() > 0.5) {
      const replyUser = users[(i + 2) % users.length];
      comment.replies.push({
        id: 'r_' + generateId(),
        commentId: comment.id,
        userId: replyUser.id,
        user: replyUser,
        replyToUserId: user.id,
        replyToUserName: user.nickName,
        content: '回复：' + commentTexts[(i + 3) % commentTexts.length],
        likeCount: Math.floor(Math.random() * 20),
        isLiked: false,
        createdAt: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toISOString()
      });
    }

    comments.push(comment);
  }

  return comments;
}

// 模拟消息数据
function generateMessages() {
  return [
    {
      id: 'm_001',
      type: 'like',
      content: '赞了你的博客',
      blogTitle: '图书馆的清晨',
      fromUser: users[1],
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      isRead: false
    },
    {
      id: 'm_002',
      type: 'comment',
      content: '评论了你的博客：写得太好了！',
      blogTitle: '期末复习攻略',
      fromUser: users[2],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isRead: false
    },
    {
      id: 'm_003',
      type: 'follow',
      content: '关注了你',
      fromUser: users[3],
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      isRead: true
    },
    {
      id: 'm_004',
      type: 'reply',
      content: '回复了你的评论：谢谢支持！',
      blogTitle: '校园美食地图',
      fromUser: users[4],
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      isRead: true
    },
    {
      id: 'm_005',
      type: 'system',
      content: '你的博客已被推荐到首页',
      fromUser: null,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      isRead: true
    }
  ];
}

// 数据存储
let allBlogs = generateBlogs();

// 模拟 API 方法
const mockApi = {
  // 获取博客列表（分页）
  getBlogList(page = 1, pageSize = 10, category = 'all') {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = allBlogs;
        if (category !== 'all') {
          filtered = allBlogs.filter(b => b.category === category);
        }
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const list = filtered.slice(start, end);
        resolve({
          list: list,
          total: filtered.length,
          hasMore: end < filtered.length,
          page: page,
          pageSize: pageSize
        });
      }, 500 + Math.random() * 500);
    });
  },

  // 获取博客详情
  getBlogDetail(blogId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const blog = allBlogs.find(b => b.id === blogId);
        resolve(blog || null);
      }, 300);
    });
  },

  // 点赞/取消点赞
  toggleLike(blogId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const blog = allBlogs.find(b => b.id === blogId);
        if (blog) {
          blog.isLiked = !blog.isLiked;
          blog.likeCount += blog.isLiked ? 1 : -1;
          resolve({ isLiked: blog.isLiked, likeCount: blog.likeCount });
        }
      }, 200);
    });
  },

  // 获取评论列表
  getComments(blogId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateComments(blogId));
      }, 400);
    });
  },

  // 发表评论
  addComment(blogId, content) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const app = getApp();
        const comment = {
          id: 'c_' + generateId(),
          blogId: blogId,
          userId: app.globalData.userInfo ? app.globalData.userInfo.id : 'u_anonymous',
          user: app.globalData.userInfo || { nickName: '匿名用户', avatarUrl: '/images/default-avatar.png' },
          content: content,
          likeCount: 0,
          isLiked: false,
          createdAt: new Date().toISOString(),
          replies: []
        };
        resolve(comment);
      }, 300);
    });
  },

  // 回复评论
  replyComment(blogId, commentId, content, replyToUser) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const app = getApp();
        const reply = {
          id: 'r_' + generateId(),
          commentId: commentId,
          userId: app.globalData.userInfo ? app.globalData.userInfo.id : 'u_anonymous',
          user: app.globalData.userInfo || { nickName: '匿名用户', avatarUrl: '/images/default-avatar.png' },
          replyToUserId: replyToUser.id,
          replyToUserName: replyToUser.nickName,
          content: content,
          likeCount: 0,
          isLiked: false,
          createdAt: new Date().toISOString()
        };
        resolve(reply);
      }, 300);
    });
  },

  // 关注/取消关注
  toggleFollow(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find(u => u.id === userId);
        if (user) {
          user.isFollowed = !user.isFollowed;
          user.fansCount += user.isFollowed ? 1 : -1;
          resolve({ isFollowed: user.isFollowed, fansCount: user.fansCount });
        }
      }, 200);
    });
  },

  // 发布博客
  publishBlog(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const app = getApp();
        const newBlog = {
          id: 'b_' + generateId(),
          userId: app.globalData.userInfo ? app.globalData.userInfo.id : 'u_anonymous',
          user: app.globalData.userInfo || { nickName: '匿名用户', avatarUrl: '/images/default-avatar.png', school: '' },
          title: data.title,
          content: data.content,
          images: data.images || [],
          category: data.category,
          categoryName: categories.find(c => c.id === data.category)?.name || '校园生活',
          likeCount: 0,
          commentCount: 0,
          viewCount: 0,
          isLiked: false,
          isCollected: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        allBlogs.unshift(newBlog);
        resolve(newBlog);
      }, 800);
    });
  },

  // 获取消息列表
  getMessages() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMessages());
      }, 400);
    });
  },

  // 获取分类列表
  getCategories() {
    return Promise.resolve(categories);
  },

  // 获取用户信息
  getUserInfo(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find(u => u.id === userId);
        resolve(user || null);
      }, 200);
    });
  }
};

module.exports = {
  mockApi,
  categories,
  users
};
