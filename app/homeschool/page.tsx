"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Rocket, Users, BookOpen, Target, Menu, Home, School, Brain, CheckCircle, GraduationCap, Heart, Star } from "lucide-react"
import EEGTooltip from "@/components/EEGTooltip"
import ChatWidget from "@/components/ChatWidget"
import { submitForm } from "../actions/submit-form"
import { submitContactForm } from "../actions/submit-contact-form"

export default function HomeschoolLanding() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [showModules, setShowModules] = useState(false)
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false)
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [contactMessage, setContactMessage] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsOpen(false)
  }

  const scrollToCTA = () => {
    const element = document.getElementById("cta-form")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsOpen(false)
  }

  const handleTryNow = () => {
    setShowThankYou(true)
    setTimeout(() => {
      setShowThankYou(false)
    }, 5000) // Hide after 5 seconds
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await submitForm(formData)
      if (result.success) {
        setFormSubmitted(true)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      // Still show success to user - the server action handles logging
      setFormSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContactFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsContactSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await submitContactForm(formData)
      if (result.success) {
        setContactFormSubmitted(true)
        setContactMessage(result.message)
        // Reset form after successful submission
        const form = document.getElementById("contact-form") as HTMLFormElement
        if (form) form.reset()
        // Hide success message after 5 seconds
        setTimeout(() => {
          setContactFormSubmitted(false)
          setContactMessage("")
        }, 5000)
      }
    } catch (error) {
      console.error("Contact form submission error:", error)
      setContactMessage("There was an error sending your message. Please try again.")
    } finally {
      setIsContactSubmitting(false)
    }
  }

  const navItems = [
    { label: "Why Homeschool?", id: "why-homeschool" },
    { label: "Curriculum", id: "curriculum" },
    { label: "Technology", id: "technology" },
    { label: "Pricing", id: "pricing" },
    { label: "Resources", id: "resources" },
    { label: "Contact", id: "contact" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7deaff]/10 via-white to-[#7deaff]/5">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/IA Logo.png" alt="IA Logo" className="h-12 w-auto" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-800">AlgebraAI</span>
                <span className="text-sm text-gray-600 font-medium">Perfect for Homeschooling</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="border-2 border-[#7deaff] text-black bg-transparent hover:bg-[#7deaff] hover:text-white rounded-full px-4 py-2 transition-colors cursor-pointer whitespace-nowrap min-w-fit"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                variant="outline"
                className="border-2 border-[#7deaff] text-black bg-transparent hover:bg-[#7deaff] hover:text-white rounded-full px-4 py-2 transition-colors whitespace-nowrap min-w-fit"
                onClick={() => window.open('https://pw.intelladapt.com/', '_blank')}
              >
                Sign In
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    <div className="flex items-center space-x-2 mb-8">
                      <img src="/intelladapt-logo.png" alt="intellADAPT Logo" className="h-10 w-auto" />
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-800">AlgebraAI</span>
                        <span className="text-xs text-gray-600 font-medium">Perfect for Homeschooling</span>
                      </div>
                    </div>

                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="text-left text-lg border-2 border-[#7deaff] text-black bg-transparent hover:bg-[#7deaff] hover:text-white rounded-full px-4 py-2 mx-2 transition-colors whitespace-nowrap min-w-fit"
                      >
                        {item.label}
                      </button>
                    ))}

                    <div className="flex flex-col space-y-3 mt-8">
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-[#7deaff] text-black bg-transparent hover:bg-[#7deaff] hover:text-white rounded-full px-4 py-2 transition-colors whitespace-nowrap min-w-fit"
                        onClick={() => window.open('https://pw.intelladapt.com/', '_blank')}
                      >
                        Sign In
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Badge className="bg-gradient-to-r from-[#7deaff] to-[#1ba5ba] text-black px-6 py-2 text-lg mb-6">
                🏠 Perfect for Homeschooling Families
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
              Help Your Child Master Algebra at Home With{" "}
              <span className="bg-gradient-to-r from-[#7deaff] to-[#1ba5ba] bg-clip-text text-transparent">
                AI-Powered Learning
              </span>
            </h1>
            <div className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Revolutionary brainwave adaptive learning with <EEGTooltip>Electroencephalogram (EEG)</EEGTooltip>{" "}
              technology that personalizes algebra education for your homeschool student, making complex concepts easier to
              understand and master.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={scrollToCTA}
                size="lg"
                className="bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white text-lg px-8 py-3 transition-colors"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Homeschooling Free
              </Button>
              <Button
                onClick={scrollToCTA}
                size="lg"
                variant="outline"
                className="border-2 border-[#7deaff] text-black bg-transparent hover:bg-[#1ba5ba] hover:text-white text-lg px-8 py-3 transition-colors"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Get Homeschool Plan
              </Button>
              <Button
                onClick={() => window.open('/homework-solution', '_blank')}
                size="lg"
                variant="outline"
                className="border-2 border-[#7deaff] text-black bg-transparent hover:bg-[#1ba5ba] hover:text-white text-lg px-8 py-3 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Homework Solution
              </Button>
            </div>
            
          </div>
        </section>

        {/* Why Homeschool Section */}
        <section id="why-homeschool" className="bg-[#7deaff]/5 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Why Choose AlgebraAI for Homeschooling?</h2>
              <div className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to teach algebra effectively at home, with the power of AI and neuroscience
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* For Homeschool Parents */}
              <Card className="border-2 border-blue-200 bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-blue-600 mb-2">For Homeschool Parents</CardTitle>
                  <CardDescription className="text-lg">Everything you need to teach algebra confidently</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>
                        <strong>Complete curriculum</strong> - 13 modules covering all algebra topics
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>
                        <strong>No math anxiety</strong> - Learn alongside your child with guided support
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>
                        <strong>Progress tracking</strong> - See exactly how your child is learning
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>
                        <strong>Flexible scheduling</strong> - Learn at your own pace, anytime
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>
                        <strong>Parent dashboard</strong> - Monitor progress and get teaching tips
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>
                        <strong>Homeschool community</strong> - Connect with other homeschooling families
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* For Homeschool Students */}
              <Card className="border-2 border-green-200 bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-green-600 mb-2">For Homeschool Students</CardTitle>
                  <CardDescription className="text-lg">Personalized learning that adapts to your brain</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        <strong>Personalized learning</strong> - Adapts to your unique learning style
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        <strong>Gamified experience</strong> - Earn badges and track progress
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        <strong>No pressure</strong> - Learn at your own pace without judgment
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        <strong>Real-time feedback</strong> - Know immediately when you understand concepts
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        <strong>Interactive lessons</strong> - Engaging content that keeps you interested
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        <strong>Confidence building</strong> - Master concepts before moving on
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* For Homeschool Success */}
              <Card className="border-2 border-purple-200 bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-purple-600 mb-2">Homeschool Success</CardTitle>
                  <CardDescription className="text-lg">Proven results for homeschooling families</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>
                        <strong>Better test scores</strong> - Average improvement of 2 letter grades
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>
                        <strong>Reduced stress</strong> - No more math anxiety or frustration
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>
                        <strong>Faster learning</strong> - Master concepts 3x faster than traditional methods
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>
                        <strong>College ready</strong> - Strong foundation for advanced math courses
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>
                        <strong>Life skills</strong> - Problem-solving and critical thinking abilities
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>
                        <strong>Homeschool flexibility</strong> - Perfect for any homeschooling style
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technology Section - Same as original */}
        <section id="technology" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Revolutionary AI Technology Backed by Science</h2>
            <div className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our platform is built on years of research in adaptive learning using Artificial Intelligence (AI). We
              utilize <EEGTooltip>Electroencephalogram (EEG)</EEGTooltip> and Brain Computer Interface (BCI) technology
              to read and analyze brainwave data in real-time, helping homeschool students excel in algebra.
            </div>
          </div>

          {/* Research Foundation */}
          <div className="bg-gradient-to-br from-[#7deaff]/10 via-white to-[#7deaff]/5 rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Advanced Neuroscience Meets Homeschool Education</h3>
              <div className="text-lg text-gray-600 max-w-3xl mx-auto">
                This allows us to create an optimum learning experience by identifying and implementing the most
                effective learning strategy for each individual homeschool student.
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-200 bg-white">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <CardTitle className="text-blue-600">
                    <EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip> Technology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 text-center">
                    <EEGTooltip>Electroencephalogram</EEGTooltip> technology reads brainwave patterns to understand
                    cognitive load and engagement levels
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 bg-white">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <CardTitle className="text-purple-600">BCI Interface</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 text-center">
                    Brain Computer Interface technology enables direct communication between the brain and our learning
                    system
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-white">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <CardTitle className="text-green-600">Real-Time Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 text-center">
                    Continuous analysis of brainwave data provides instant insights into learning effectiveness and
                    comprehension
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-gradient-to-r from-purple-200 to-blue-200">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">🧠</span>
                </div>
                <CardTitle className="text-2xl">Brainiak AI</CardTitle>
                <CardDescription className="text-lg">
                  Our core AI engine powered by neuroscience research and brainwave analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    • Processes <EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip> brainwave data
                  </li>
                  <li>• Identifies optimal learning states</li>
                  <li>• Adapts content difficulty in real-time</li>
                  <li>• Provides neuroscience-based tutoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gradient-to-r from-green-200 to-teal-200">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <CardTitle className="text-2xl">IntellADAPT AI</CardTitle>
                <CardDescription className="text-lg">
                  Advanced adaptive learning technology that responds to your brain's unique learning patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• BCI-driven content adaptation</li>
                  <li>• Personalized neural feedback</li>
                  <li>• Cognitive load optimization</li>
                  <li>• Brain-state aware learning paths</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Curriculum Section */}
        <section id="curriculum" className="bg-[#7deaff]/5 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                Complete Homeschool Algebra Curriculum
              </h2>
              <div className="text-xl text-gray-600 max-w-3xl mx-auto">
                12 adaptive modules designed specifically for homeschooling families, with flexible pacing and comprehensive coverage
              </div>
            </div>

            {/* 12 Adaptive Modules Section */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <div className="mb-4 bg-white text-black border-2 border-[#7deaff] text-lg px-4 py-2 rounded-full inline-flex items-center">
                  12 Adaptive Modules • Perfect for Homeschooling
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Homeschool-Friendly Learning Path</h3>
                <div className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Each module adapts to your child's learning strategy and brain patterns, ensuring mastery before
                  progression - perfect for self-paced homeschooling
                </div>
                <Button
                  onClick={() => setShowModules(!showModules)}
                  className="mt-6 bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white px-8 py-3 transition-colors"
                >
                  {showModules ? 'Hide Modules' : 'View All Modules'}
                </Button>
              </div>

              {showModules && (
                <div className="grid gap-6 max-w-6xl mx-auto">
                  {/* Module 1: Foundations */}
                  <Card className="border-2 border-blue-200 bg-white hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">1</span>
                        </div>
                        <div>
                          <CardTitle className="text-xl text-blue-600">Module 1: Foundations for Algebra</CardTitle>
                          <CardDescription className="text-gray-600">
                            Building essential mathematical thinking skills for homeschool success
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-600 mb-3">
                        <strong>Core Topics:</strong> Variables and expressions, order of operations (PEMDAS), real
                        numbers and number line, properties of real numbers, adding/subtracting real numbers,
                        multiplying/dividing real numbers, distributive property, introduction to equations
                      </div>
                      <div className="text-sm text-gray-500">
                        <strong>Homeschool Features:</strong> Self-paced learning with parent guidance tools and
                        comprehensive progress tracking
                      </div>
                    </CardContent>
                  </Card>

                  {/* Modules 2-3: Equations & Inequalities */}
                  <Card className="border-2 border-green-200 bg-white hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">2-3</span>
                        </div>
                        <div>
                          <CardTitle className="text-xl text-green-600">Modules 2-3: Equations & Inequalities</CardTitle>
                          <CardDescription className="text-gray-600">Mastering algebraic problem solving at home</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-600 mb-3">
                        <strong>Core Topics:</strong> Linear equations, multi-step equations, inequalities, graphing
                        solutions, real-world applications
                      </div>
                      <div className="text-sm text-gray-500">
                        <strong>Homeschool Features:</strong> Step-by-step solutions with parent explanations and
                        practice worksheets
                      </div>
                    </CardContent>
                  </Card>

                  {/* Modules 4-5: Functions & Graphs */}
                  <Card className="border-2 border-purple-200 bg-white hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">4-5</span>
                        </div>
                        <div>
                          <CardTitle className="text-xl text-purple-600">Modules 4-5: Functions & Graphs</CardTitle>
                          <CardDescription className="text-gray-600">
                            Understanding relationships and visual representation for homeschoolers
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-600 mb-3">
                        <strong>Core Topics:</strong> Function notation, linear functions, slope, graphing techniques,
                        interpreting graphs, domain and range
                      </div>
                      <div className="text-sm text-gray-500">
                        <strong>Homeschool Features:</strong> Interactive graphing tools and visual learning aids
                        perfect for home study
                      </div>
                    </CardContent>
                  </Card>

                  {/* Modules 6-8: Systems, Exponents, Polynomials */}
                  <Card className="border-2 border-orange-200 bg-white hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">6-8</span>
                        </div>
                        <div>
                          <CardTitle className="text-xl text-orange-600">
                            Modules 6-8: Systems, Exponents, Polynomials
                          </CardTitle>
                          <CardDescription className="text-gray-600">
                            Advanced algebraic concepts perfect for homeschool progression
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-600 mb-3">
                        <strong>Core Topics:</strong> Systems of equations, exponent rules, polynomial operations,
                        factoring, algebraic manipulation
                      </div>
                      <div className="text-sm text-gray-500">
                        <strong>Homeschool Features:</strong> Comprehensive practice problems with detailed solutions
                        and parent teaching guides
                      </div>
                    </CardContent>
                  </Card>

                  {/* Modules 9-13: Advanced Topics */}
                  <Card className="border-2 border-indigo-200 bg-white hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">9-13</span>
                        </div>
                        <div>
                          <CardTitle className="text-xl text-indigo-600">
                            Modules 9-13: Quadratics, Radicals, Data Analysis
                          </CardTitle>
                          <CardDescription className="text-gray-600">
                            Advanced topics preparing homeschoolers for college and beyond
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-600 mb-3">
                        <strong>Core Topics:</strong> Quadratic equations, parabolas, radical expressions, statistics,
                        probability, data interpretation, advanced problem solving
                      </div>
                      <div className="text-sm text-gray-500">
                        <strong>Homeschool Features:</strong> College prep materials and real-world applications
                        perfect for homeschool portfolios
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="text-center mt-8">
                <div className="bg-gradient-to-br from-[#7deaff]/10 via-white to-[#7deaff]/5 rounded-2xl p-6 max-w-4xl mx-auto">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    <Brain className="w-6 h-6 inline-block mr-2 text-purple-600" />
                    Perfect for Homeschooling Families
                  </h4>
                  <div className="text-gray-600 mb-4">
                    Our <EEGTooltip showLearnMore={false}>EEG</EEGTooltip> technology monitors engagement and
                    comprehension in real-time, ensuring each homeschool student masters concepts before advancing to the next
                    module.
                  </div>
                  <Button
                    onClick={scrollToCTA}
                    className="bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white px-8 py-3 transition-colors"
                  >
                    Start Homeschooling Today
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - Homeschool Focused */}
        <section id="pricing" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Homeschool-Friendly Pricing Plans</h2>
              <div className="text-xl text-gray-600 max-w-3xl mx-auto">
                Flexible options designed specifically for homeschooling families, with special discounts and features
              </div>
            </div>

            {/* Thank You Message */}
            {showThankYou && (
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">Thank you for subscribing!</h3>
                  <div className="text-green-700 space-y-2">
                    <p>You will receive an email regarding the access and code.</p>
                    <p className="font-medium">Don't forget to check your spam/junk folder.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Homeschool Starter Plan */}
              <Card className="border-2 border-gray-200 hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-600 mb-2">Homeschool Starter</CardTitle>
                  <CardDescription className="text-lg mb-4">Perfect for trying out our platform</CardDescription>
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    $0<span className="text-lg text-gray-500">/forever</span>
                  </div>
                  <div className="text-sm text-gray-500">Module 1 only • No EEG</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Module 1: Foundations for Algebra</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Basic AI-powered adaptive learning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Progress tracking for parents</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Homeschool community access</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Basic parent teaching guides</span>
                    </li>
                  </ul>
                  <Button
                    onClick={handleTryNow}
                    className="w-full bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white transition-colors"
                  >
                    Start Free
                  </Button>
                </CardContent>
              </Card>

              {/* Homeschool Family Plan */}
              <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1">
                    MOST POPULAR
                  </Badge>
                </div>
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-blue-600 mb-2">Homeschool Family</CardTitle>
                  <CardDescription className="text-lg mb-4">Complete curriculum for homeschooling success</CardDescription>
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    $19<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500">Per student • 20% homeschool discount</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>All 13 algebra modules</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>AI-powered adaptive learning</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Comprehensive parent dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Teaching guides and resources</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Homeschool portfolio tools</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Priority homeschool support</span>
                    </li>
                  </ul>
                  <Button
                    onClick={handleTryNow}
                    className="w-full bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white transition-colors"
                  >
                    Start Homeschooling
                  </Button>
                </CardContent>
              </Card>

              {/* Homeschool Premium with EEG */}
              <Card className="border-2 border-purple-200 hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-purple-600 mb-2">Homeschool Premium</CardTitle>
                  <CardDescription className="text-lg mb-4">
                    Complete brain-powered learning with <EEGTooltip showLearnMore={false}>EEG</EEGTooltip>
                  </CardDescription>
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    $49<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500">Per student • 30% homeschool discount</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Everything in Homeschool Family, plus:</strong>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        Real-time <EEGTooltip showLearnMore={false}>EEG</EEGTooltip> brainwave monitoring
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Advanced learning strategy analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Detailed neuroscience reports</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Personalized homeschool coaching</span>
                    </li>
                  </ul>
                  
                  {/* EEG Headband Note */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                    <div className="flex items-start space-x-2">
                      <span className="text-amber-600 text-sm">⚠️</span>
                      <div className="text-sm text-amber-800">
                        <strong>Note:</strong> EEG headband is not included and needs to be purchased separately.
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleTryNow}
                    className="w-full bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white transition-colors"
                  >
                    Start Premium
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Homeschool Discount Notice */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  🏠 Special Homeschool Discounts Available
                </h3>
                <div className="text-lg text-gray-600 mb-4">
                  We believe in supporting homeschooling families with affordable, high-quality education.
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>20% off Family Plan</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>30% off Premium Plan</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Free setup assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="bg-[#7deaff]/5 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Homeschool Resources & Support</h2>
              <div className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to succeed with algebra in your homeschool, from teaching guides to community support
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Teaching Guides */}
              <Card className="border-2 border-blue-200 bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-blue-600">Teaching Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Step-by-step lesson plans</li>
                    <li>• Parent explanation guides</li>
                    <li>• Common mistake prevention</li>
                    <li>• Assessment rubrics</li>
                    <li>• Progress tracking templates</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Homeschool Community */}
              <Card className="border-2 border-green-200 bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-green-600">Homeschool Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Connect with other families</li>
                    <li>• Share success stories</li>
                    <li>• Ask questions & get help</li>
                    <li>• Monthly virtual meetups</li>
                    <li>• Resource sharing forum</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Portfolio Tools */}
              <Card className="border-2 border-purple-200 bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-purple-600">Portfolio Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Progress documentation</li>
                    <li>• Achievement certificates</li>
                    <li>• Skill assessment reports</li>
                    <li>• College prep materials</li>
                    <li>• Transcript generation</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Technical Support */}
              <Card className="border-2 border-orange-200 bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-orange-600">Technical Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 24/7 homeschool support</li>
                    <li>• Setup assistance</li>
                    <li>• Troubleshooting help</li>
                    <li>• Video tutorials</li>
                    <li>• Live chat support</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Curriculum Alignment */}
              <Card className="border-2 border-indigo-200 bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-indigo-600">Curriculum Alignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• State standards alignment</li>
                    <li>• College prep requirements</li>
                    <li>• AP exam preparation</li>
                    <li>• SAT/ACT math prep</li>
                    <li>• Credit hour tracking</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Parent Training */}
              <Card className="border-2 border-teal-200 bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-teal-600">Parent Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Teaching algebra workshops</li>
                    <li>• Learning strategy training</li>
                    <li>• Motivation techniques</li>
                    <li>• Assessment strategies</li>
                    <li>• Confidence building tips</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section - Homeschool Focused */}
        <section id="cta-form" className="bg-gradient-to-r from-[#7deaff] via-[#1ba5ba] to-[#7deaff] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Homeschool Algebra Journey?</h2>
                <div className="text-xl text-purple-100 mb-8">
                  Join thousands of homeschooling families who have mastered algebra with confidence using our AI-powered platform.
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                {!formSubmitted ? (
                  <form className="grid md:grid-cols-2 gap-6" onSubmit={handleFormSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Parent/Guardian Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="user-type" className="block text-sm font-medium text-gray-700 mb-2">
                        I am a *
                      </label>
                      <select
                        id="user-type"
                        name="user-type"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select your role</option>
                        <option value="homeschool-parent">Homeschool Parent</option>
                        <option value="homeschool-co-op">Homeschool Co-op Teacher</option>
                        <option value="homeschool-student">Homeschool Student</option>
                        <option value="homeschool-administrator">Homeschool Administrator</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="plan-interest" className="block text-sm font-medium text-gray-700 mb-2">
                        Plan Interest
                      </label>
                      <select
                        id="plan-interest"
                        name="plan-interest"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select a plan</option>
                        <option value="homeschool-starter">Homeschool Starter (Free)</option>
                        <option value="homeschool-family">Homeschool Family ($19/month)</option>
                        <option value="homeschool-premium">Homeschool Premium ($49/month)</option>
                        <option value="homeschool-co-op">Homeschool Co-op (Custom pricing)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="homeschool-style" className="block text-sm font-medium text-gray-700 mb-2">
                        Homeschooling Style
                      </label>
                      <select
                        id="homeschool-style"
                        name="homeschool-style"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select your style</option>
                        <option value="traditional">Traditional/Textbook</option>
                        <option value="classical">Classical</option>
                        <option value="charlotte-mason">Charlotte Mason</option>
                        <option value="montessori">Montessori</option>
                        <option value="unschooling">Unschooling</option>
                        <option value="eclectic">Eclectic</option>
                        <option value="online">Online/Virtual</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="student-grade" className="block text-sm font-medium text-gray-700 mb-2">
                        Student Grade Level
                      </label>
                      <select
                        id="student-grade"
                        name="student-grade"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select grade level</option>
                        <option value="6th">6th Grade</option>
                        <option value="7th">7th Grade</option>
                        <option value="8th">8th Grade</option>
                        <option value="9th">9th Grade</option>
                        <option value="10th">10th Grade</option>
                        <option value="11th">11th Grade</option>
                        <option value="12th">12th Grade</option>
                        <option value="college-prep">College Prep</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 text-center mt-6">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white text-lg px-12 py-4 transition-colors"
                      >
                        <Rocket className="w-5 h-5 mr-2" />
                        {isSubmitting ? "Submitting..." : "Start Homeschooling Today"}
                      </Button>
                      <div className="text-sm text-gray-500 mt-4">
                        Free plan available • No credit card required • COPPA & FERPA compliant
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Homeschool Community!</h3>
                    <div className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                      An email has been sent to you with confirmation and details of how to access the course.
                    </div>
                    <div className="text-gray-500 mb-8">
                      Check your inbox (and spam folder) for your welcome email with login instructions and next steps.
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={() => setFormSubmitted(false)} variant="outline" className="px-6 py-3">
                        Submit Another Form
                      </Button>
                      <Button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3"
                      >
                        Back to Top
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-[#7deaff]/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Get Homeschool Support</h2>
                <div className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Have questions about homeschooling with AlgebraAI? Our homeschool support team is here to help you succeed.
                </div>
              </div>

              <div className="max-w-2xl mx-auto">
                {/* Contact Form */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h3>
                  <form id="contact-form" className="space-y-6" onSubmit={handleContactFormSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="contact-name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="contact-email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="homeschool-type" className="block text-sm font-medium text-gray-700 mb-2">
                          Homeschooling Type *
                        </label>
                        <select
                          id="homeschool-type"
                          name="homeschool-type"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select type</option>
                          <option value="individual-family">Individual Family</option>
                          <option value="homeschool-co-op">Homeschool Co-op</option>
                          <option value="homeschool-group">Homeschool Group</option>
                          <option value="online-homeschool">Online Homeschool</option>
                          <option value="hybrid">Hybrid (Part-time homeschool)</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="student-count" className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Students
                        </label>
                        <select
                          id="student-count"
                          name="student-count"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select count</option>
                          <option value="1">1 student</option>
                          <option value="2">2 students</option>
                          <option value="3">3 students</option>
                          <option value="4">4 students</option>
                          <option value="5+">5+ students</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        placeholder="Tell us about your homeschooling needs, questions, or how we can help..."
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      disabled={isContactSubmitting}
                      className="w-full bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white text-lg px-8 py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isContactSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>

                  {/* Success Message */}
                  {contactFormSubmitted && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <p className="text-green-800 font-medium">{contactMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {contactMessage && !contactFormSubmitted && contactMessage.includes("error") && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <p className="text-red-800 font-medium">{contactMessage}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            {/* Top Row - Legal Links and Social Icons */}
            <div className="flex flex-col lg:flex-row items-center justify-between w-full space-y-4 lg:space-y-0">
              {/* Left Side - Legal Links */}
              <div className="flex space-x-6 text-sm">
                <a href="https://ia.intelladapt.ai/terms-of-use" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Use
                </a>
                <a href="https://ia.intelladapt.ai/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </div>

              {/* Right Side - Powered by */}
              <a href="https://ia.intelladapt.ai/" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors">
                <span>Powered by</span>
                <img src="/IA Logo.png" alt="IA Logo" className="h-6 w-auto" />
                <span>IntellAdapt</span>
              </a>
            </div>

            {/* Middle Row - Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61579068315080" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/intelladapt/" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/intelladapt/" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://x.com/intelladapt" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@intellADAPTBoston" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* Bottom Row - Copyright */}
            <div className="text-sm text-gray-300 text-center">
              © 2026 Algebra AI by Intelladapt. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      {/* <ChatWidget /> */}
    </div>
  )
}
