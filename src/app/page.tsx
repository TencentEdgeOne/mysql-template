"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, ExternalLink, Zap } from "lucide-react"

export default function Home() {
  const [apiResult, setApiResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleApiCall = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/express");
      const data = await response.json();
      setApiResult(data.message);
    } catch (error) {
      setApiResult("Error: Failed to call API")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">logo</span>
            </div>
            <h1 className="text-lg font-semibold">EdgeOne Pages</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight">
              Node Functions on EdgeOne Pages - Express
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Node Functions 允许您在 Node Runtime 中运行代码,而无需管理服务器。借助其能力,您可以方便的在 Pages 开发部署基于 Express 框架的全栈应用。
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-[#1c66e5] hover:bg-[#1c66e5]/90 text-white px-8 py-3 text-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              一键部署
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-600 hover:bg-gray-800 text-white px-8 py-3 text-lg"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              查看文档
            </Button>
          </div>

          {/* Code Block */}
          <Card className="bg-gray-900 border-gray-700 text-left">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-mono text-gray-400">
                ./node-functions/[[default]].js
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm text-gray-200 font-mono leading-relaxed">
{`import express from "express";
const app = express();

// 添加日志中间件
app.use((req, res, next) => {
  console.log(\`[${new Date().toISOString()}] $\{req.method} $\{req.url}\`);
  next();
});

// 添加根路由处理
app.get("/", (req, res) => {
  res.json({ message: "Hello from Express on Node Functions!" });
});

// 导出处理函数
export default app;`}
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
                  className="bg-[#1c66e5] hover:bg-[#1c66e5]/90 text-white"
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
                      {apiResult}
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
