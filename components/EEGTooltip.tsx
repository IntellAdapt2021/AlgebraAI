"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { Brain, Info } from "lucide-react"

interface EEGTooltipProps {
  children: React.ReactNode
  showLearnMore?: boolean
}

export default function EEGTooltip({ children, showLearnMore = true }: EEGTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToNeuroscience = () => {
    const element = document.getElementById("neuroscience-101")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsOpen(false)
  }

  const handleInfoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    scrollToNeuroscience()
  }

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <span className="relative inline-flex items-center cursor-help">
          <span className="underline decoration-dotted decoration-blue-400 hover:decoration-blue-600 transition-colors">
            {children}
          </span>
          <button
            onClick={handleInfoClick}
            className="ml-1 p-0 border-none bg-transparent cursor-pointer hover:scale-110 transition-transform"
            aria-label="Learn more about EEG technology"
          >
            <Info className="w-3 h-3 text-blue-500 hover:text-blue-700 transition-colors" />
          </button>
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4" side="top">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Electroencephalogram (EEG)</div>
              <Badge variant="secondary" className="text-xs">
                Neuroscience Technology
              </Badge>
            </div>
          </div>

          <div className="text-sm text-gray-600 leading-relaxed">
            EEG measures electrical activity in the brain through sensors placed on the scalp. It's completely safe,
            non-invasive, and helps our AI understand when students are most ready to learn new concepts.
          </div>

          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-xs text-blue-800 font-medium mb-1">Key Benefits:</div>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Real-time learning optimization</li>
              <li>• Personalized content delivery</li>
              <li>• Reduced frustration and anxiety</li>
            </ul>
          </div>

          {showLearnMore && (
            <Button
              onClick={scrollToNeuroscience}
              size="sm"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              Learn More About EEG
            </Button>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
