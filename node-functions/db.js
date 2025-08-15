import mysql from 'mysql2/promise';

// 腾讯云 MySQL 数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'your-tencent-mysql-host',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'your-username',
  password: process.env.DB_PASSWORD || 'your-password',
  database: process.env.DB_NAME || 'your-database-name',
  charset: 'utf8mb4',
  timezone: '+08:00',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// 数据库连接池
let pool = null;

// 初始化数据库连接
const initDatabase = () => {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
    console.log('Database connection pool created');
  }
  return pool;
};

// 执行数据库查询
const executeQuery = async (sql, params = []) => {
  try {
    const connection = initDatabase();
    const [rows] = await connection.execute(sql, params);
    return { success: true, data: rows };
  } catch (error) {
    console.error('Database query error:', error);
    return { success: false, error: error.message };
  }
};


export const onRequestGet = async (context) => {
  // 在这里添加数据库查询逻辑
  const result = await executeQuery('SELECT * FROM user LIMIT 100');

  return new Response(JSON.stringify({
    success: result.success,
    data: result.success ? result.data : null,
    error: result.success ? null : result.error,
    thisis: 'get'
  }), {
    status: result.success ? 200 : 500,
    headers: { 'Content-Type': 'application/json' }
  });
};
