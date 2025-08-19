"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  showButtons?: boolean
}

const ALGEBRA_MODULE_1_CONTENT = {
  variables: {
    definition:
      "A variable is a symbol (usually a letter like x, y, or z) that represents an unknown value that can change or vary.",
    examples: [
      "If x = 2, then x + 5 = 7",
      "You have y dollars and earn 3 more: y + 3",
      "Temperature t can vary throughout the day",
    ],
  },
  expressions: {
    definition: "An algebraic expression is a collection of constants and variables joined by operations (+, -, ×, ÷).",
    examples: [
      "2x + 1 means 'twice x, then add 1'",
      "(y - 3) × 4 means 'subtract 3 from y, then multiply by 4'",
      "3a + 2b - 5 combines multiple variables and constants",
    ],
  },
  pemdas: {
    definition:
      "PEMDAS is the order of operations: Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right)",
    steps: [
      "P - Parentheses first",
      "E - Exponents (powers and roots)",
      "MD - Multiplication and Division (left to right)",
      "AS - Addition and Subtraction (left to right)",
    ],
    example: "6 + 2 × (4 + 1) = 6 + 2 × 5 = 6 + 10 = 16",
  },
  distributive: {
    definition: "The distributive property: a(b + c) = ab + ac",
    examples: [
      "2(3 + 4) = 2×3 + 2×4 = 6 + 8 = 14",
      "5(10 - 2) = 5×10 - 5×2 = 50 - 10 = 40",
      "-3(6 + 5) = -3×6 + (-3)×5 = -18 - 15 = -33",
    ],
  },
  solve_method: {
    definition: "SOLVE is a 5-step method for tackling math problems",
    steps: [
      "S - Study the problem (read carefully)",
      "O - Organize the facts (write down what you know)",
      "L - Line up a plan (choose your strategy)",
      "V - Verify your plan with action (do the math)",
      "E - Examine your results (check if it makes sense)",
    ],
  },
  real_numbers: {
    definition:
      "Real numbers include all numbers on the number line: whole numbers, fractions, decimals, negatives, and special numbers like π",
    types: [
      "Positive numbers (like 5, 2.5, 1/2)",
      "Negative numbers (like -3, -0.5)",
      "Zero (neither positive nor negative)",
      "Fractions and decimals",
      "Irrational numbers (like √2, π)",
    ],
  },
  equations: {
    definition:
      "An equation is a mathematical statement showing two expressions are equal, always containing an equals sign (=)",
    example: "3x + 5 = 20 means 'when you multiply x by 3 and add 5, you get 20'",
    balance_concept:
      "Think of equations like a balance scale - whatever you do to one side, you must do to the other to keep it balanced",
  },
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [helpMode, setHelpMode] = useState<"general" | "algebra" | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hi! I'm your AlgebraAI assistant. How can I help you today?",
      timestamp: new Date(),
      showButtons: true,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (content: string, type: "user" | "bot") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    scrollToBottom()
  }

  const handleGeneralHelp = () => {
    setHelpMode("general")
    addMessage("I selected General Help", "user")
    addMessage(
      "Great! I can help you with:\n\n🧠 **EEG Technology & Safety**\n💰 **Pricing and Plans**\n🔬 **How our adaptive learning works**\n🎯 **Platform features**\n📞 **Support and contact info**\n\nWhat would you like to know?",
      "bot",
    )
  }

  const handleAlgebraHelp = () => {
    setHelpMode("algebra")
    addMessage("I selected AlgebraAI Help", "user")
    addMessage(
      "Perfect! I'm your Algebra Module 1 tutor. I can help you with:\n\n🔤 **Variables and Expressions**\n🔢 **Order of Operations (PEMDAS)**\n📐 **Distributive Property**\n⚖️ **Introduction to Equations**\n🎯 **SOLVE Method for Problem Solving**\n🔢 **Real Numbers**\n\nWhich topic would you like to explore?",
      "bot",
    )
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Algebra Module 1 Content Responses
    if (
      helpMode !== "general" &&
      (message.includes("variable") || message.includes("what is x") || message.includes("unknown"))
    ) {
      return `**Variables in Algebra** 🔤\n\n${ALGEBRA_MODULE_1_CONTENT.variables.definition}\n\n**Examples:**\n${ALGEBRA_MODULE_1_CONTENT.variables.examples.map((ex) => `• ${ex}`).join("\n")}\n\n**Key Point:** Variables are like mystery boxes that can hold different numbers!`
    }

    if (
      helpMode !== "general" &&
      (message.includes("expression") || message.includes("2x + 1") || message.includes("algebraic expression"))
    ) {
      return `**Algebraic Expressions** ✏️\n\n${ALGEBRA_MODULE_1_CONTENT.expressions.definition}\n\n**Examples:**\n${ALGEBRA_MODULE_1_CONTENT.expressions.examples.map((ex) => `• ${ex}`).join("\n")}\n\n**Remember:** Expressions don't have equals signs - that's what makes them different from equations!`
    }

    if (
      helpMode !== "general" &&
      (message.includes("pemdas") || message.includes("order of operations") || message.includes("parentheses"))
    ) {
      return `**Order of Operations (PEMDAS)** 🔢\n\n${ALGEBRA_MODULE_1_CONTENT.pemdas.definition}\n\n**Steps to Remember:**\n${ALGEBRA_MODULE_1_CONTENT.pemdas.steps.map((step) => `• ${step}`).join("\n")}\n\n**Example:** ${ALGEBRA_MODULE_1_CONTENT.pemdas.example}\n\n**Memory Trick:** "Please Excuse My Dear Aunt Sally"`
    }

    if (
      helpMode !== "general" &&
      (message.includes("distributive") || message.includes("distribute") || message.includes("a(b + c)"))
    ) {
      return `**Distributive Property** 📐\n\n${ALGEBRA_MODULE_1_CONTENT.distributive.definition}\n\n**Examples:**\n${ALGEBRA_MODULE_1_CONTENT.distributive.examples.map((ex) => `• ${ex}`).join("\n")}\n\n**Think of it as:** Sharing or distributing the outside number to everything inside the parentheses!`
    }

    if (
      helpMode !== "general" &&
      (message.includes("solve method") || message.includes("problem solving") || message.includes("how to solve"))
    ) {
      return `**The SOLVE Method** 🎯\n\n${ALGEBRA_MODULE_1_CONTENT.solve_method.definition}\n\n**The 5 Steps:**\n${ALGEBRA_MODULE_1_CONTENT.solve_method.steps.map((step) => `• ${step}`).join("\n")}\n\n**Why it works:** This method helps you approach any math problem systematically and avoid mistakes!`
    }

    if (
      helpMode !== "general" &&
      (message.includes("real number") || message.includes("number line") || message.includes("types of numbers"))
    ) {
      return `**Real Numbers** 🔢\n\n${ALGEBRA_MODULE_1_CONTENT.real_numbers.definition}\n\n**Types include:**\n${ALGEBRA_MODULE_1_CONTENT.real_numbers.types.map((type) => `• ${type}`).join("\n")}\n\n**Number Line:** Zero is in the center, positive numbers go right, negative numbers go left!`
    }

    if (
      helpMode !== "general" &&
      (message.includes("equation") || message.includes("equals") || message.includes("balance"))
    ) {
      return `**Equations** ⚖️\n\n${ALGEBRA_MODULE_1_CONTENT.equations.definition}\n\n**Example:** ${ALGEBRA_MODULE_1_CONTENT.equations.example}\n\n**Balance Concept:** ${ALGEBRA_MODULE_1_CONTENT.equations.balance_concept}\n\n**Key:** The equals sign means both sides have the same value!`
    }

    if (
      helpMode !== "general" &&
      (message.includes("negative") || message.includes("adding") || message.includes("subtracting"))
    ) {
      return `**Adding & Subtracting Real Numbers** ➕➖\n\n**Key Rules:**\n• Same signs: Add the numbers, keep the sign\n• Different signs: Subtract, take the sign of the larger number\n• Subtracting a negative = Adding a positive\n\n**Examples:**\n• -3 + (-5) = -8\n• 6 - (-4) = 6 + 4 = 10\n• -7 + 12 = 5\n\n**Use the SOLVE method for practice!**`
    }

    if (
      helpMode !== "general" &&
      (message.includes("multiply") || message.includes("divide") || message.includes("times"))
    ) {
      return `**Multiplying & Dividing Real Numbers** ✖️➗\n\n**Sign Rules:**\n• Same signs = Positive result\n• Different signs = Negative result\n\n**Examples:**\n• (-4) × (-3) = +12\n• 6 × (-5) = -30\n• 12 ÷ (-4) = -3\n• (-18) ÷ (-3) = +6\n\n**Memory trick:** "Same = Positive, Different = Negative"`
    }

    if (
      helpMode !== "general" &&
      (message.includes("module 1") || message.includes("curriculum") || message.includes("what topics"))
    ) {
      return `**Algebra Module 1: Foundations** 📚\n\n**Topics Covered:**\n• Variables and Expressions\n• Order of Operations (PEMDAS)\n• Real Numbers and Number Line\n• Properties of Real Numbers\n• Adding/Subtracting Real Numbers\n• Multiplying/Dividing Real Numbers\n• Distributive Property\n• Introduction to Equations\n\n**Learning Method:** All topics use our SOLVE method for systematic problem-solving!\n\nWhich specific topic would you like to explore?`
    }

    // EEG and Technology Questions
    if (helpMode !== "algebra" && (message.includes("eeg") || message.includes("brain") || message.includes("safe"))) {
      return `**EEG Technology** 🧠\n\nEEG (Electroencephalogram) is completely safe and non-invasive! It only *reads* your brain's electrical signals - never sends anything to your brain.\n\n**Key Facts:**\n• FDA-approved technology\n• Used in hospitals worldwide\n• Painless and comfortable\n• Real-time brain activity monitoring\n• Adapts lessons to your brain patterns\n\n**How it helps:** Our AI sees when you're confused, focused, or ready for harder problems and adjusts instantly!`
    }

    if (
      helpMode !== "algebra" &&
      (message.includes("how it works") || message.includes("adaptive") || message.includes("personalized"))
    ) {
      return `**How AlgebraAI Works** ⚡\n\n**3 Simple Steps:**\n1. **Put on the headset** - Comfortable, wireless EEG sensors\n2. **AI reads your brain** - Monitors focus, comprehension, and learning state\n3. **Lessons adapt instantly** - Difficulty, pace, and style adjust in real-time\n\n**The Result:** Perfect lessons for YOUR brain, every time! No more being stuck or bored.\n\n**Learning Strategies Detected:**\n• Apprentice (step-by-step)\n• Incidental (contextual)\n• Inductive (pattern-based)\n• Deductive (rule-based)\n• Discovery (exploratory)`
    }

    // Pricing Questions
    if (helpMode !== "algebra" && (message.includes("price") || message.includes("cost") || message.includes("plan"))) {
      return `**AlgebraAI Pricing** 💰\n\n**Standard Plan - $29/month**\n• AI-powered adaptive learning\n• Complete algebra curriculum\n• Parent dashboard\n• 24/7 support\n\n**Premium Plan - $79/month** ⭐ *Most Popular*\n• Everything in Standard\n• Real-time EEG brain monitoring\n• Personalized learning strategies\n• Advanced brain insights\n\n**School Plan - Custom pricing**\n• Bulk licenses\n• Teacher dashboard\n• Curriculum integration\n\n**All plans include:** 14-day free trial, no credit card required!`
    }

    if (helpMode !== "algebra" && (message.includes("trial") || message.includes("free") || message.includes("demo"))) {
      return `**Free Trial Information** 🎁\n\n**What you get:**\n• 14 days completely free\n• No credit card required\n• Full access to all features\n• Cancel anytime\n• Money-back guarantee\n\n**Perfect for:**\n• Testing if it works for your child\n• Seeing the brain-powered difference\n• Trying different learning strategies\n\n**Ready to start?** Click the "Start Free Trial" button on our homepage!`
    }

    // General Questions
    if (helpMode !== "algebra" && (message.includes("hello") || message.includes("hi") || message.includes("hey"))) {
      return `Hello! 👋 I'm here to help you learn about AlgebraAI and algebra concepts.\n\n**I can help with:**\n• Algebra Module 1 topics (variables, PEMDAS, equations, etc.)\n• How our brain-powered technology works\n• Pricing and trial information\n• EEG safety questions\n\n**Try asking:** "What are variables?" or "How does EEG work?" or "What's included in Module 1?"`
    }

    if (helpMode !== "algebra" && (message.includes("help") || message.includes("what can you do"))) {
      return `**I can help you with:** 🤖\n\n**📚 Algebra Learning:**\n• Variables and expressions\n• Order of operations (PEMDAS)\n• Real numbers and equations\n• Problem-solving with SOLVE method\n\n**🧠 Technology Questions:**\n• How EEG brain monitoring works\n• Safety and FDA approval\n• Adaptive learning features\n\n**💰 Pricing & Plans:**\n• Plan comparisons\n• Free trial details\n• School pricing\n\n**Just ask me anything!** For example: "Explain variables" or "Is EEG safe?" or "How much does it cost?"`
    }

    // Default response
    return `I'd be happy to help! I can assist with:\n\n**🧮 Algebra Topics:** Variables, expressions, PEMDAS, equations, real numbers, distributive property\n\n**🧠 Technology:** EEG brain monitoring, adaptive learning, safety questions\n\n**💰 Pricing:** Plans, free trial, school options\n\n**Try asking something like:**\n• "What are variables?"\n• "How does the brain monitoring work?"\n• "What's included in the free trial?"\n• "Explain the distributive property"\n\nWhat specific topic interests you most?`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    addMessage(userMessage, "user")
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage)
      addMessage(botResponse, "bot")
      setIsTyping(false)
      scrollToBottom()
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-96 bg-white shadow-2xl border-cyan-200 transition-all duration-300 ${
          isMinimized ? "h-16" : "h-[600px]"
        }`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">AlgebraAI Assistant</CardTitle>
              <p className="text-xs text-cyan-100">Ask me about algebra or our platform!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-1 h-8 w-8"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 p-0">
              <div className="h-[440px] overflow-y-auto p-4 space-y-4 scroll-smooth" style={{ maxHeight: "440px" }}>
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === "bot" && <Bot className="w-4 h-4 mt-1 text-cyan-600 flex-shrink-0" />}
                        {message.type === "user" && <User className="w-4 h-4 mt-1 text-white flex-shrink-0" />}
                        <div className="flex-1">
                          <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
                          <div
                            className={`text-xs mt-1 ${message.type === "user" ? "text-cyan-100" : "text-gray-500"}`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                      {message.showButtons && (
                        <div className="flex flex-col gap-2 mt-3">
                          <Button
                            onClick={handleGeneralHelp}
                            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-sm py-2"
                          >
                            🌟 General Help
                          </Button>
                          <Button
                            onClick={handleAlgebraHelp}
                            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-sm py-2"
                          >
                            📚 AlgebraAI Help
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-cyan-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about algebra, EEG technology, pricing..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Try: "What are variables?" or "How does EEG work?"
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
