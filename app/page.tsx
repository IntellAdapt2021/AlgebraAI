"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Rocket, Users, BookOpen, Target, Menu, Home, School, Brain, CheckCircle } from "lucide-react"
import EEGTooltip from "@/components/EEGTooltip"
import ChatWidget from "@/components/ChatWidget"
import { submitForm } from "./actions/submit-form"
import { submitContactForm } from "./actions/submit-contact-form"

export default function AlgebraAILanding() {
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

  useEffect(() => {
    // Handle video loading with better initialization
    const initializeVideo = () => {
      const video = document.getElementById('demo-video') as HTMLVideoElement
      const fallback = document.getElementById('video-fallback')
      
      if (video && fallback) {
        const handleCanPlay = () => {
          fallback.style.display = 'none'
          console.log('Video loaded successfully')
        }
        
        const handleError = () => {
          console.error('Video failed to load')
          fallback.innerHTML = `
            <div class="text-center p-8">
              <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen class="w-10 h-10 text-red-600" />
              </div>
              <p class="text-lg font-medium text-red-800">Video Loading Failed</p>
              <p class="text-sm text-red-600">Please check the video file</p>
            </div>
          `
        }
        
        video.addEventListener('canplay', handleCanPlay)
        video.addEventListener('error', handleError)
        
        // Force video to load immediately
        console.log('Initializing video...')
        video.load()
        
        return () => {
          video.removeEventListener('canplay', handleCanPlay)
          video.removeEventListener('error', handleError)
        }
      }
    }
    
    // Try to initialize immediately
    initializeVideo()
    
    // Also try after a short delay to ensure DOM is ready
    const timer = setTimeout(initializeVideo, 100)
    
    return () => clearTimeout(timer)
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
    { label: "Features", id: "features" },
    { label: "Why AlgebraAI?", id: "why-algebraai" },
    { label: "Technology", id: "technology" },
    { label: "Learning Strategy", id: "learning-strategy" },
    { label: "Pricing", id: "pricing" },
    { label: "Neuroscience 101", id: "neuroscience-101" },
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
                <span className="text-sm text-gray-600 font-medium">Help Your Child Master Algebra</span>
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
                        <span className="text-xs text-gray-600 font-medium">Help Your Child Master Algebra</span>
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
              Master Algebra with
              <br />
              AI-Powered Learning
            </h1>
            <div className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Revolutionary brainwave adaptive learning with <EEGTooltip>Electroencephalogram (EEG)</EEGTooltip>{" "}
              technology that personalizes algebra education for K12 students, making complex concepts easier to
              understand and master.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={scrollToCTA}
                size="lg"
                className="bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white text-lg px-8 py-3 transition-colors"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Learning Free
              </Button>
              <Button
                onClick={scrollToCTA}
                size="lg"
                variant="outline"
                className="border-2 border-[#7deaff] text-black bg-transparent hover:bg-[#1ba5ba] hover:text-white text-lg px-8 py-3 transition-colors"
              >
                Get Started For Pilot
              </Button>
            </div>
            
            {/* Demo Video Section */}
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
                <video
                  id="demo-video"
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                  muted
                  onLoadStart={() => console.log('Video loading started')}
                  onCanPlay={() => console.log('Video can play')}
                  onError={(e) => console.error('Video error:', e)}
                  onLoadedData={() => console.log('Video data loaded')}
                  onLoad={() => console.log('Video load event')}
                  onLoadedMetadata={() => console.log('Video metadata loaded')}
                >
                  <source src="/videos/demoAlgebra.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Fallback content if video fails to load */}
                <div id="video-fallback" className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-10 h-10 text-gray-600" />
                    </div>
                    <p className="text-lg font-medium text-gray-800">Demo Video</p>
                    <p className="text-sm text-gray-600">Loading video...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section id="technology" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Revolutionary AI Technology Backed by Science</h2>
            <div className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our platform is built on years of research in adaptive learning using Artificial Intelligence (AI). We
              utilize <EEGTooltip>Electroencephalogram (EEG)</EEGTooltip> and Brain Computer Interface (BCI) technology
              to read and analyze brainwave data in real-time, helping K12 students excel in algebra.
            </div>
          </div>

          {/* Research Foundation */}
          <div className="bg-gradient-to-r from-[#7deaff]/10 to-white rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Advanced Neuroscience Meets Education</h3>
              <div className="text-lg text-gray-600 max-w-3xl mx-auto">
                This allows us to create an optimum learning experience by identifying and implementing the most
                effective learning strategy for each individual learner.
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

        {/* Learning Strategy Section */}
        <section id="learning-strategy" className="bg-gradient-to-r from-[#7deaff]/10 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Personalized Learning Strategy</h2>
              <div className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every student has a unique learning strategy. Our AI identifies and adapts to how your brain naturally
                processes information.
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-2 border-green-200 bg-white">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-green-600 text-center">What is Learning Strategy?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-gray-600 text-center mb-4">
                      Learning strategy refers to the specific cognitive approaches and mental processes your brain uses
                      to understand, organize, and retain new information.
                    </div>
                    <div className="text-gray-600 text-center">
                      Unlike learning styles (visual, auditory, kinesthetic), learning strategy focuses on{" "}
                      <strong>how</strong> your brain thinks through problems and makes connections.
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 bg-white">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-blue-600 text-center">Why It Matters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-gray-600 text-center mb-4">
                      When teaching matches your natural learning strategy, comprehension increases dramatically and
                      frustration disappears.
                    </div>
                    <div className="text-gray-600 text-center">
                      Our <EEGTooltip showLearnMore={false}>EEG</EEGTooltip> technology reveals these patterns in
                      real-time, allowing instant adaptation.
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
                  Common Learning Strategies We Identify
                </h3>

                <div className="grid md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">👨‍🏫</span>
                    </div>
                    <h4 className="font-bold text-blue-600 mb-2">Apprentice</h4>
                    <div className="text-gray-600 text-sm">
                      Learns through guided practice and step-by-step instruction
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">🌱</span>
                    </div>
                    <h4 className="font-bold text-green-600 mb-2">Incidental</h4>
                    <div className="text-gray-600 text-sm">Natural absorption through exposure and context</div>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">🔍</span>
                    </div>
                    <h4 className="font-bold text-purple-600 mb-2">Inductive</h4>
                    <div className="text-gray-600 text-sm">Pattern observation to form general rules</div>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">📐</span>
                    </div>
                    <h4 className="font-bold text-orange-600 mb-2">Deductive</h4>
                    <div className="text-gray-600 text-sm">Applying general principles to specific problems</div>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">🚀</span>
                    </div>
                    <h4 className="font-bold text-indigo-600 mb-2">Discovery</h4>
                    <div className="text-gray-600 text-sm">Independent exploration and experimentation</div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <div className="text-gray-600 mb-4">
                    <strong>BrainiakAI continuously monitors these patterns</strong> and adjusts content delivery to
                    match your child's natural cognitive approach.
                  </div>
                  <Button
                    onClick={scrollToCTA}
                    className="bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white px-8 py-3 transition-colors"
                  >
                    Try Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section - What Everyone Gets */}
        <section id="why-algebraai" className="bg-gradient-to-r from-[#7deaff]/10 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Why Choose AlgebraAI?</h2>
              <div className="text-xl text-gray-600 max-w-3xl mx-auto">
                Clear benefits for students, teachers, and parents - making the decision easy for everyone
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Students Get */}
              <Card className="border-2 border-blue-200 bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-blue-600 mb-2">What Students Get</CardTitle>
                  <CardDescription className="text-lg">Personalized learning that adapts to your brain</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>
                        <strong>Real-time brain feedback</strong> - Learn when your brain is most ready
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>
                        <strong>No more frustration</strong> - System adapts before you get stuck
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>
                        <strong>Faster mastery</strong> - Learn algebra concepts 3x faster
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>
                        <strong>Confidence building</strong> - Success at your own pace
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>
                        <strong>Better grades</strong> - Improved test scores and understanding
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>
                        <strong>Gamified experience</strong> - Earn badges and compete with friends
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Teachers Get */}
              <Card className="border-2 border-green-200 bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-green-600 mb-2">What Teachers Get</CardTitle>
                  <CardDescription className="text-lg">
                    Powerful insights and classroom management tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        <strong>Real-time student insights</strong> - See who needs help before they ask
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        <strong>Detailed progress reports</strong> - Track learning at the brain level
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        <strong>Curriculum alignment</strong> - Perfectly matches your lesson plans
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        <strong>Differentiated instruction</strong> - Automatic personalization for each student
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        <strong>Time savings</strong> - Reduce grading and prep time by 50%
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>
                        <strong>Professional development</strong> - Learn neuroscience-based teaching methods
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Parents Get */}
              <Card className="border-2 border-purple-200 bg-white hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-purple-600 mb-2">What Parents Get</CardTitle>
                  <CardDescription className="text-lg">Peace of mind and clear progress visibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>
                        <strong>Understand their learning strategy</strong> - BrainiakAI reveals your child's unique
                        cognitive approach
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>
                        <strong>Better homework help</strong> - Know exactly how to explain concepts to your child
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>
                        <strong>Transparent progress tracking</strong> - See exactly how your child is learning
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>
                        <strong>Safe technology</strong> - FDA-approved, non-invasive{" "}
                        <EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip> monitoring
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>
                        <strong>Better grades</strong> - Average improvement of 2 letter grades
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>
                        <strong>Confidence at home</strong> - Less math anxiety and frustration
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Parent Learning Insights Section */}
            <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  <Brain className="w-8 h-8 inline-block mr-3 text-purple-600" />
                  Help Your Child Master Algebra - Even If You're Not a Math Teacher
                </h3>
                <div className="text-lg text-gray-600 max-w-4xl mx-auto">
                  Most parents are smart and want to help with homework, but struggle to understand how their child
                  learns best. BrainiakAI changes that by showing you exactly how your child's brain processes algebra
                  concepts.
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-purple-600 mb-4">The Problem Every Parent Faces:</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-600 text-xs font-bold">✗</span>
                      </div>
                      <div className="text-gray-600">Your child asks for help with algebra homework</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-600 text-xs font-bold">✗</span>
                      </div>
                      <div className="text-gray-600">You explain it the way you learned, but they don't get it</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-600 text-xs font-bold">✗</span>
                      </div>
                      <div className="text-gray-600">Frustration builds for both of you</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-600 text-xs font-bold">✗</span>
                      </div>
                      <div className="text-gray-600">Your child loses confidence in math</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-green-600 mb-4">How BrainiakAI Helps You Help Them:</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-gray-600">
                        <strong>See their learning strategy:</strong> Understand how your child's brain processes and
                        retains algebra concepts
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-gray-600">
                        <strong>Know when they're confused:</strong> Real-time brain data shows exactly where they get
                        stuck
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-gray-600">
                        <strong>Get personalized tips:</strong> AI suggests the best way to explain concepts to your
                        specific child
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-gray-600">
                        <strong>Build their confidence:</strong> Success breeds success - watch their math anxiety
                        disappear
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clear Call to Action */}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Choose Your AlgebraAI Plan, All Plans Free For 1 Month!</h2>
              <div className="text-xl text-gray-600 max-w-3xl mx-auto">
                Flexible options for families and schools, with or without EEG technology
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

            <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* Free Plan */}
              <Card className="border-2 border-gray-200 hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-600 mb-2">Free</CardTitle>
                  <CardDescription className="text-lg mb-4">Get started with Module 1</CardDescription>
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    $0<span className="text-lg text-gray-500">/forever</span>
                  </div>
                  <div className="text-sm text-gray-500">No EEG • Module 1 only</div>
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
                      <span>Progress tracking</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Basic gamification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Community support</span>
                    </li>
                  </ul>
                  <Button
                    onClick={handleTryNow}
                    className="w-full bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white transition-colors"
                  >
                    Try Now
                  </Button>
                </CardContent>
              </Card>

              {/* Family Plan - Standard */}
              <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-blue-600 mb-2">Standard</CardTitle>
                  <CardDescription className="text-lg mb-4">Perfect for parents helping with homework</CardDescription>
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    $29<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500">Per child • Cancel anytime</div>
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
                      <span>Parent dashboard with progress insights</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Homework help recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Gamified learning experience</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>24/7 customer support</span>
                    </li>
                  </ul>
                  <Button
                    onClick={handleTryNow}
                    className="w-full bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white transition-colors"
                  >
                    Try Now
                  </Button>
                </CardContent>
              </Card>

              {/* Family Plan - Premium with EEG */}
              <Card className="border-2 border-purple-200 hover:shadow-xl transition-shadow relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
                    MOST POPULAR
                  </Badge>
                </div>
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-purple-600 mb-2">Premium</CardTitle>
                  <CardDescription className="text-lg mb-4">
                    Complete brain-powered learning with <EEGTooltip showLearnMore={false}>EEG</EEGTooltip>
                  </CardDescription>
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    $79<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <div className="text-sm text-gray-500">Per child • EEG headset included (one-time)</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Everything in Standard, plus:</strong>
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
                      <span>BrainiakAI Learning Strategy analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Advanced progress analytics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Priority support & setup assistance</span>
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
                    Try Now
                  </Button>
                </CardContent>
              </Card>

              {/* School Plan */}
              <Card className="border-2 border-green-200 hover:shadow-xl transition-shadow">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <School className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-green-600 mb-2">School & District</CardTitle>
                  <CardDescription className="text-lg mb-4">Comprehensive solution for educators</CardDescription>
                  <div className="text-4xl font-bold text-gray-800 mb-2">Custom</div>
                  <div className="text-sm text-gray-500">Volume pricing available</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Classroom management dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Teacher progress tracking</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Student performance analytics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Curriculum alignment tools</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Professional development resources</span>
                    </li>
                  </ul>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="w-full bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white transition-colors"
                  >
                    Contact Us for a Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section - Complete Algebra Curriculum */}
        <section id="features" className="bg-[#7deaff]/5 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                Complete Algebra Curriculum with AI-Powered Learning
              </h2>
              <div className="text-xl text-gray-600 max-w-3xl mx-auto">
                13 adaptive modules that take students from foundations to advanced topics, personalized by
                brain-powered technology
              </div>
            </div>

            {/* 13 Adaptive Modules Section */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <div className="mb-4 bg-white text-black border-2 border-[#7deaff] text-lg px-4 py-2 rounded-full inline-flex items-center">
                  13 Adaptive Modules • Foundations to Advanced
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Progressive Learning Path</h3>
                <div className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Each module adapts to your child's learning strategy and brain patterns, ensuring mastery before
                  progression
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
                            Building essential mathematical thinking skills
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
                        <strong>Brain-Adaptive Features:</strong> Uses the SOLVE method for systematic problem-solving and
                        identifies learning gaps through personalized pacing
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
                          <CardDescription className="text-gray-600">Mastering algebraic problem solving</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-600 mb-3">
                        <strong>Core Topics:</strong> Linear equations, multi-step equations, inequalities, graphing
                        solutions, real-world applications
                      </div>
                      <div className="text-sm text-gray-500">
                        <strong>Brain-Adaptive Features:</strong> Adjusts complexity based on cognitive load and
                        comprehension patterns
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
                            Understanding relationships and visual representation
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
                        <strong>Brain-Adaptive Features:</strong> Visual learning optimization based on individual
                        processing preferences
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
                            Advanced algebraic concepts and operations
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
                        <strong>Brain-Adaptive Features:</strong> Breaks complex concepts into digestible steps based on
                        cognitive capacity
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
                            Advanced topics and real-world applications
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
                        <strong>Brain-Adaptive Features:</strong> Connects abstract concepts to real-world applications
                        based on learning strategy
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="text-center mt-8">
                <div className="bg-gradient-to-r from-[#7deaff]/10 to-white rounded-2xl p-6 max-w-4xl mx-auto">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    <Brain className="w-6 h-6 inline-block mr-2 text-purple-600" />
                    Every Module Adapts to Your Child's Brain
                  </h4>
                  <div className="text-gray-600 mb-4">
                    Our <EEGTooltip showLearnMore={false}>EEG</EEGTooltip> technology monitors engagement and
                    comprehension in real-time, ensuring each student masters concepts before advancing to the next
                    module.
                  </div>
                  <Button
                    onClick={scrollToCTA}
                    className="bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white px-8 py-3 transition-colors"
                  >
                    Try Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Neuroscience 101 */}
        <section id="neuroscience-101" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Neuroscience 101: Understanding <EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip>
              Technology
            </h2>
            <div className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn how our brain-computer interface technology works and why it's safe and effective for students
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600 flex items-center">
                    <span className="text-2xl mr-3">🧠</span>
                    What is&nbsp;<EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip>&nbsp;?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 mb-4">
                    <strong>
                      <EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip> stands for
                      Electroencephalogram
                    </strong>
                    - a non-invasive medical test that measures and records the electrical activity in your brain. Think
                    of it as "listening" to your brain's electrical conversations.
                  </div>
                  <div className="text-gray-600">
                    Brain cells (neurons) naturally produce small electrical signals when they communicate with each
                    other. <EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip> sensors placed on
                    the scalp detect these signals and record them as brainwaves - wavy lines that show different
                    patterns of brain activity.
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600 flex items-center">
                    <span className="text-2xl mr-3">⚡</span>
                    How does&nbsp;<EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip>&nbsp;work in learning?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 mb-4">
                    <EEGTooltip showLearnMore={false}>EEG</EEGTooltip> reveals different types of brainwaves that
                    correspond to different mental states:
                  </div>
                  <ul className="text-gray-600 space-y-2 mb-4">
                    <li>
                      <strong>Alpha waves:</strong> Relaxed, calm state - ideal for absorbing new information
                    </li>
                    <li>
                      <strong>Beta waves:</strong> Active thinking and concentration - perfect for problem-solving
                    </li>
                    <li>
                      <strong>Theta waves:</strong> Deep relaxation and creativity - great for making connections
                    </li>
                    <li>
                      <strong>Gamma waves:</strong> High-level cognitive processing - advanced understanding
                    </li>
                  </ul>
                  <div className="text-gray-600">
                    Our AI uses this information to understand when you're in the optimal state for learning different
                    types of content.
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600 flex items-center">
                    <span className="text-2xl mr-3">📊</span>
                    How does this help my learning?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 mb-4">
                    In AlgebraAI's adaptive learning system,
                    <EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip> technology provides:
                  </div>
                  <ul className="text-gray-600 space-y-2">
                    <li>
                      <strong>Real-time engagement monitoring:</strong> Detecting when you're focused, confused, or
                      losing attention
                    </li>
                    <li>
                      <strong>Instant adaptation:</strong> The system adjusts difficulty or teaching approach based on
                      your brain activity
                    </li>
                    <li>
                      <strong>Personalized pacing:</strong> Understanding your optimal learning state and rhythm
                    </li>
                    <li>
                      <strong>Cognitive load assessment:</strong> Knowing when your brain is overwhelmed or
                      under-challenged
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600 flex items-center">
                    <span className="text-2xl mr-3">🛡️</span>
                    Is&nbsp;<EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip>&nbsp;technology safe for
                    students?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 mb-4">
                    <strong>
                      <EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip> is completely safe and
                      comfortable:
                    </strong>
                  </div>
                  <ul className="text-gray-600 space-y-2 mb-4">
                    <li>
                      <strong>Non-invasive:</strong> Sensors just rest on the scalp - no needles or surgery
                    </li>
                    <li>
                      <strong>Painless:</strong> Students don't feel anything during use
                    </li>
                    <li>
                      <strong>Only reads signals:</strong>
                      <EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip> doesn't send any
                      electrical signals to the brain
                    </li>
                    <li>
                      <strong>FDA approved:</strong>
                      <EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip> technology has been
                      safely used in medicine for decades
                    </li>
                  </ul>
                  <div className="text-gray-600">
                    It's similar to how a heart monitor (EKG) reads heart electrical activity - completely safe and
                    widely used in healthcare and research.
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-teal-100">
                <CardHeader>
                  <CardTitle className="text-xl text-teal-600 flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    What makes this different from other learning apps?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 mb-4">
                    Traditional learning apps guess what you need based on right or wrong answers. AlgebraAI knows what
                    you need based on how your brain is actually processing information:
                  </div>
                  <ul className="text-gray-600 space-y-2">
                    <li>
                      <strong>Beyond test scores:</strong> We see confusion before you even realize you're confused
                    </li>
                    <li>
                      <strong>Individual brain patterns:</strong> Every brain learns differently - we adapt to yours
                    </li>
                    <li>
                      <strong>Optimal timing:</strong> Present new concepts when your brain is ready to receive them
                    </li>
                    <li>
                      <strong>Prevent frustration:</strong> Adjust before you get overwhelmed or bored
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-indigo-100">
                <CardHeader>
                  <CardTitle className="text-xl text-indigo-600 flex items-center">
                    <span className="text-2xl mr-3">👨‍👩‍👧‍👦</span>
                    What do parents need to know?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 mb-4">
                    <strong>Privacy and safety are our top priorities:</strong>
                  </div>
                  <ul className="text-gray-600 space-y-2 mb-4">
                    <li>
                      <strong>Data security:</strong> All brainwave data is encrypted and never shared
                    </li>
                    <li>
                      <strong>Educational use only:</strong> Data is used solely to improve learning outcomes
                    </li>
                    <li>
                      <strong>Parental control:</strong> Full transparency and control over your child's data
                    </li>
                    <li>
                      <strong>Opt-out anytime:</strong>
                      <EEGTooltip showLearnMore={false}>Electroencephalogram (EEG)</EEGTooltip> features can be disabled
                      while still using the platform
                    </li>
                  </ul>
                  <div className="text-gray-600">
                    This technology helps your child learn more effectively while maintaining the highest standards of
                    safety and privacy.
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={scrollToCTA}
                  size="lg"
                  className="bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white text-lg px-8 py-3 transition-colors"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Learning Free
                </Button>
                <Button size="lg" className="bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white text-lg px-8 py-3 transition-colors">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta-form" className="bg-gradient-to-r from-[#7deaff] via-[#1ba5ba] to-[#7deaff] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Algebra Journey?</h2>
                <div className="text-xl text-purple-100 mb-8">
                  Sign up now and help your child master algebra with confidence.
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                {!formSubmitted ? (
                  <form className="grid md:grid-cols-2 gap-6" onSubmit={handleFormSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
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
                        <option value="parent">Parent</option>
                        <option value="teacher">Teacher</option>
                        <option value="administrator">School Administrator</option>
                        <option value="student">Student</option>
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
                        <option value="free">Free Plan</option>
                        <option value="family-standard">Family Standard ($29/month)</option>
                        <option value="family-premium">Family Premium with EEG ($79/month)</option>
                        <option value="school">School/District (Custom pricing)</option>
                        <option value="pilot">Pilot</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
                        School/Organization
                      </label>
                      <input
                        type="text"
                        id="school"
                        name="school"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="Enter school or organization name"
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        placeholder="City, State/Province, Country"
                      />
                    </div>

                    <div className="md:col-span-2 text-center mt-6">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="bg-[#7deaff] hover:bg-[#1ba5ba] text-black hover:text-white text-lg px-12 py-4 transition-colors"
                      >
                        <Rocket className="w-5 h-5 mr-2" />
                        {isSubmitting ? "Submitting..." : "Get Started Now"}
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
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h3>
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
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                <div className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Ready to bring AlgebraAI to your school or district? Contact us for custom pricing and implementation
                  support.
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
                          placeholder="your.email@school.edu"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                          School/Organization *
                        </label>
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                          placeholder="School or district name"
                        />
                      </div>
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Role *
                        </label>
                        <select
                          id="role"
                          name="role"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select your role</option>
                          <option value="administrator">School Administrator</option>
                          <option value="principal">Principal</option>
                          <option value="superintendent">Superintendent</option>
                          <option value="curriculum-director">Curriculum Director</option>
                          <option value="teacher">Teacher</option>
                          <option value="it-director">IT Director</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="students" className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Students
                        </label>
                        <select
                          id="students"
                          name="students"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select range</option>
                          <option value="1-50">1-50 students</option>
                          <option value="51-200">51-200 students</option>
                          <option value="201-500">201-500 students</option>
                          <option value="501-1000">501-1000 students</option>
                          <option value="1000+">1000+ students</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                          Implementation Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select timeline</option>
                          <option value="immediate">Immediate (within 30 days)</option>
                          <option value="next-quarter">Next quarter</option>
                          <option value="next-semester">Next semester</option>
                          <option value="next-year">Next school year</option>
                          <option value="exploring">Just exploring options</option>
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
                        placeholder="Tell us about your needs, questions, or how we can help..."
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
              <a href="https://ia.intelladapt.ai/" className="text-gray-400 hover:text-white transition-colors">
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
              © 2025 Algebra AI by Intelladapt. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      {/* <ChatWidget /> */}
    </div>
  )
}
