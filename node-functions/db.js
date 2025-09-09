import mysql from 'mysql2/promise';

// Tencent Cloud MySQL database configuration
const dbConfig = {
  charset: 'utf8mb4',
  timezone: '+08:00',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Database connection pool
let pool = null;

// Initialize database connection
const initDatabase = (env) => {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME
    });
    console.log('Database connection pool created');
  }
  return pool;
};

// Execute database query
const executeQuery = async (sql, params = [], env = {}) => {
  try {
    const connection = initDatabase(env);
    const [rows] = await connection.execute(sql, params);
    return { success: true, data: rows };
  } catch (error) {
    console.error('Database query error:', error);
    return { success: false, error: error.message };
  }
};

export const onRequestGet = async (context) => {
  // Add database query logic here
  const result = await executeQuery('SELECT * FROM user LIMIT 100', [], context.env);

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
