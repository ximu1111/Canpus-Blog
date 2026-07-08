# AGENTS.md - 校园博客小程序

## 项目概览
校园博客是一个面向大学生的校园内容社区微信小程序，基于微信小程序原生开发 + Vant Weapp 组件库。

## 技术栈
- 微信小程序原生框架（WXML + WXSS + JS）
- Vant Weapp 组件库（按需引入）
- CSS Variables 全局主题
- Mock 数据层（可替换为真实 API）

## 目录结构
```
miniprogram/
├── app.js / app.json / app.wxss  # 小程序入口与全局配置
├── pages/                         # 页面目录
│   ├── index/                     # 首页（瀑布流博客列表）
│   ├── detail/                    # 博客详情（评论互动）
│   ├── publish/                   # 发布页（图文编辑）
│   ├── message/                   # 消息页（通知中心）
│   └── profile/                   # 个人中心
├── components/                    # 自定义组件
│   ├── blog-card/                 # 博客卡片
│   └── comment-item/              # 评论项
├── utils/                         # 工具函数
│   ├── util.js                    # 通用工具
│   └── mock-data.js               # 模拟数据（替换为真实API）
└── images/                        # 图标与占位图
```

## 构建与运行
- 安装依赖：在 miniprogram/ 目录下执行 `npm install`
- 构建 npm：在微信开发者工具中 "工具 → 构建 npm"
- 预览：点击开发者工具"编译"按钮

## 代码风格
- 使用 2 空格缩进
- WXML 属性使用 kebab-case
- CSS 使用 BEM 风格命名 + CSS Variables
- JS 使用 CommonJS 模块规范（require/module.exports）

## 关键文件定位
- 全局样式变量：`miniprogram/app.wxss`
- 模拟数据/API：`miniprogram/utils/mock-data.js`
- 工具函数：`miniprogram/utils/util.js`
- 博客卡片组件：`miniprogram/components/blog-card/`
- 评论组件：`miniprogram/components/comment-item/`
- 首页逻辑：`miniprogram/pages/index/index.js`
- 发布逻辑：`miniprogram/pages/publish/publish.js`

## 设计规范
- 主色：#4F86C6（学院蓝）
- 辅色：#FF8C42（暖阳橙）
- 背景色：#F5F7FA
- 详见 DESIGN.md
