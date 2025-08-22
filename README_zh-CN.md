# EdgeOne Pages MySQL Template

一个基于 **EdgeOne Pages** 和 **Next.js** 的全栈应用模板，支持 MySQL 数据库连接，无需管理服务器即可部署生产级应用。

## ✨ 功能特性

- 🚀 **Serverless 架构** - 基于 EdgeOne Pages Node Functions，无需管理服务器
- 🗄️ **MySQL 集成** - 内置数据库连接池和查询执行器
- ⚡ **现代前端** - Next.js 15 + React 19 + TypeScript
- 🎨 **美观 UI** - Tailwind CSS 4 + 响应式设计
- 🔧 **开箱即用** - 预配置的开发环境和构建流程
- 📱 **移动优先** - 完全响应式设计，支持所有设备

## 🛠️ 技术栈

### 前端
- **Next.js 15.4.6** - React 全栈框架
- **React 19.1.0** - 用户界面库
- **TypeScript 5** - 类型安全的 JavaScript
- **Tailwind CSS 4** - 实用优先的 CSS 框架

### 后端
- **EdgeOne Pages** - 边缘计算平台
- **Node Functions** - 无服务器函数运行时
- **MySQL2** - MySQL 数据库驱动

### 开发工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS 后处理器
- **Turbopack** - 快速构建工具

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- MySQL 5.7 或更高版本
- EdgeOne Pages 账户

### 安装依赖

```bash
# 克隆项目
git clone <your-repo-url>
cd mysql-template

# 安装依赖
npm install
```

### 环境配置

创建 `.env.local` 文件并配置数据库连接：

```bash
# 数据库配置
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
```

### 本地开发

```bash
# 启动开发服务器
edgeone pages dev

# 访问 http://localhost:8088
```

### 构建部署

```bash
# 构建生产版本
edgeone pages build
```

## 📚 API 文档

### 数据库查询 API

**端点**: `/db`  
**方法**: `GET`  
**功能**: 执行 MySQL 查询并返回结果

**响应格式**:
```json
{
  "success": true,
  "data": [...],
  "error": null,
  "thisis": "get"
}
```

**示例请求**:
```bash
curl -X GET https://your-domain.com/db
```

### 自定义查询

修改 `node-functions/db.js` 文件中的 SQL 语句：

```javascript
// 修改查询逻辑
const result = await executeQuery('SELECT * FROM your_table LIMIT 100');
```

## 🗄️ 数据库配置

### MySQL 连接配置

项目使用连接池管理数据库连接，支持以下配置：

```javascript
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4',
  timezone: '+08:00',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};
```

### 数据库表结构

确保你的 MySQL 数据库中有相应的表结构。示例：

```sql

```

## 🏗️ 项目结构

```
mysql-template/
├── src/                    # 源代码目录
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # 根布局组件
│   │   ├── page.tsx       # 首页组件
│   │   └── globals.css    # 全局样式
│   ├── components/        # React 组件
│   │   └── ui/           # UI 组件库
│   └── lib/              # 工具函数
├── node-functions/        # EdgeOne Pages 函数
│   └── db.js            # 数据库操作函数
├── public/               # 静态资源
├── package.json          # 项目配置
├── next.config.ts        # Next.js 配置
├── tailwind.config.js    # Tailwind CSS 配置
└── tsconfig.json         # TypeScript 配置
```

## 🔧 开发指南

### 添加新的 API 端点

在 `node-functions/` 目录下创建新的 `.js` 文件：

```javascript
export const onRequestGet = async (context) => {
  // 处理 GET 请求
  return new Response(JSON.stringify({ message: "Hello World" }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const onRequestPost = async (context) => {
  // 处理 POST 请求
  const body = await context.request.json();
  return new Response(JSON.stringify({ received: body }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
```

### 样式定制

项目使用 Tailwind CSS 4，可以在 `src/app/globals.css` 中添加自定义样式：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .custom-button {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
}
```


## 环境变量配置

在 EdgeOne Pages 控制台中配置以下环境变量：

- `DB_HOST` - MySQL 主机地址
- `DB_PORT` - MySQL 端口（默认 3306）
- `DB_USER` - 数据库用户名
- `DB_PASSWORD` - 数据库密码
- `DB_NAME` - 数据库名称

## 🐛 故障排除

### 常见问题

**数据库连接失败**
- 检查环境变量配置
- 确认 MySQL 服务状态
- 验证网络连接和防火墙设置

**构建错误**
- 清理 `node_modules` 和 `.next` 目录
- 重新安装依赖：`npm install`
- 检查 TypeScript 类型错误

**API 调用失败**
- 检查 EdgeOne Pages 函数部署状态
- 查看函数日志输出
- 确认数据库表结构

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 部署
[![Deploy with EdgeOne Pages](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/pages/new?from=github&template=express-template)
