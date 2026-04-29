"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Brain, Target, Users, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { submitWaitlistEmail } from "../actions/submit-waitlist"

export default function HomeworkSolutionPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    setMessage("")

    const formData = new FormData()
    formData.append('email', email.trim())
    formData.append('source', 'Homework Solution')

    const result = await submitWaitlistEmail(formData)
    
    setIsSubmitting(false)
    setIsSuccess(result.success)
    setMessage(result.message)
    
    if (result.success) {
      setEmail("")
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7deaff]/10 via-white to-[#7deaff]/5">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/IA Logo Full.png" alt="IA Logo" className="h-12 w-auto" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-800">AlgebraAI</span>
                <span className="text-sm text-gray-600 font-medium">Help Your Child Master Algebra</span>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" className="border-2 border-[#7deaff] text-black bg-transparent hover:bg-[#7deaff] hover:text-white rounded-full px-4 py-2 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Coming Soon Section */}
          <div className="mb-16">
            <div className="w-24 h-24 bg-gradient-to-r from-[#7deaff] to-[#1ba5ba] rounded-full flex items-center justify-center mx-auto mb-8">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
              Homework Solution
            </h1>
            <div className="text-2xl text-gray-600 mb-8">
              <span className="bg-gradient-to-r from-[#7deaff] to-[#1ba5ba] bg-clip-text text-transparent font-bold">
                Coming Soon
              </span>
            </div>
            <div className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              We're building an AI-powered homework assistance tool that will help students solve algebra problems step-by-step, 
              with personalized explanations based on their learning strategy.
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 border-blue-200 bg-white hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-blue-600">AI-Powered Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-600">
                  Get step-by-step solutions to algebra problems with explanations tailored to your learning style.
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-white hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-green-600">Personalized Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-600">
                  Solutions adapt to your brain's learning strategy, making concepts easier to understand and remember.
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-white hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-purple-600">24/7 Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-600">
                  Get homework help anytime, anywhere. No more waiting for office hours or tutoring sessions.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notification Signup */}
          <Card className="border-2 border-[#7deaff] bg-white max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800 mb-2">Be the First to Know</CardTitle>
              <CardDescription className="text-lg">
                Sign up to get notified when Homework Solution launches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7deaff] focus:border-transparent transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white px-8 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Notify Me"}
                  </Button>
                </div>
                {message && (
                  <div className={`text-sm p-3 rounded-lg ${
                    isSuccess 
                      ? "bg-green-100 text-green-700 border border-green-200" 
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}>
                    {message}
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  We'll send you an email when Homework Solution is ready. No spam, unsubscribe anytime.
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Back to Main Site */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button 
                size="lg"
                className="bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white text-lg px-8 py-3 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to AlgebraAI Home
              </Button>
            </Link>
            <Link href="/homeschool">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#7deaff] text-black bg-transparent hover:bg-[#1ba5ba] hover:text-white text-lg px-8 py-3 transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Homeschooling
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full space-y-4 lg:space-y-0">
              <div className="flex space-x-6 text-sm">
                <a href="https://ia.intelladapt.ai/terms-of-use" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Use
                </a>
                <a href="https://ia.intelladapt.ai/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </div>
              <a href="https://ia.intelladapt.ai/" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors">
                <span>Powered by</span>
                <img src="/IA Logo Full.png" alt="IA Logo" className="h-6 w-auto" />
                <span>IntellAdapt</span>
              </a>
            </div>
            <div className="text-sm text-gray-300 text-center">
              © 2026 Algebra AI by Intelladapt. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
