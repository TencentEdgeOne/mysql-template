"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, ExternalLink, Zap } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const [apiResult, setApiResult] = useState<Array<Record<string, unknown>>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleApiCall = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/db");
      const data = await response.json();
      setApiResult(data.data);
    } catch {
      setApiResult([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                <Image src="/eo-logo-white.svg" alt="EdgeOne Pages" width={32} height={32} />
              </div>
              <h1 className="text-lg font-semibold">EdgeOne Pages</h1>
            </div>
            <a
              href="https://github.com/TencentEdgeOne/mysql-template"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight">
              Node Functions on EdgeOne Pages - MySQL
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Node Functions 允许您在 Node Runtime 中运行代码，而无需管理服务器。借助其能力，您可以方便的在 Pages 开发部署连接MySQL 数据库的全栈应用。
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-[#1c66e5] hover:bg-[#1c66e5]/90 text-white px-8 py-3 text-lg cursor-pointer"
            >
              <Zap className="w-5 h-5 mr-2" />
              一键部署
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-600 hover:bg-gray-800 text-white px-8 py-3 text-lg cursor-pointer"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              查看文档
            </Button>
          </div>

          {/* Code Block */}
          <Card className="bg-gray-900 border-gray-700 text-left">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-mono text-gray-400">
                ./node-functions/db.js
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm text-gray-200 font-mono leading-relaxed">
{`import mysql from 'mysql2/promise';

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
`}
              </pre>
            </CardContent>
          </Card>

          {/* API Call Section */}
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Button 
                  onClick={handleApiCall}
                  disabled={isLoading}
                  className="bg-[#1c66e5] hover:bg-[#1c66e5]/90 text-white cursor-pointer"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  执行 API 调用
                </Button>
                {apiResult && (
                  <div className="text-left">
                    <p className="text-sm text-gray-400 mb-2">API 调用结果:</p>
                    <p className="text-green-400 font-mono bg-gray-800 px-3 py-2 rounded">
                      {JSON.stringify(apiResult)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-400">
            <p>Powered by EdgeOne Pages & Next.js</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
