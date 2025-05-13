"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AnimatedHero() {
  const countUpRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Simple count-up animation
    const animateCountUp = (el: HTMLDivElement, target: number) => {
      const duration = 2000 // 2 seconds
      const frameDuration = 1000 / 60 // 60fps
      const totalFrames = Math.round(duration / frameDuration)

      let frame = 0
      const counter = setInterval(() => {
        frame++

        // Calculate current count
        const progress = frame / totalFrames
        const currentCount = Math.round(progress * target)

        // Set the count value
        if (target === 0) {
          el.textContent = "₹0"
        } else if (target >= 1000000) {
          el.textContent = `${(currentCount / 1000000).toFixed(1)}M+`
        } else if (target >= 1000) {
          el.textContent = `${(currentCount / 1000).toFixed(0)}k+`
        } else if (target.toString().includes("%")) {
          el.textContent = `${currentCount}%`
        } else {
          el.textContent = `${currentCount}+`
        }

        // Check if we've reached the target
        if (frame === totalFrames) {
          clearInterval(counter)
        }
      }, frameDuration)
    }

    // Get all elements with the count-up class
    const countUpElements = document.querySelectorAll(".count-up")

    // Store references and animate each element
    countUpElements.forEach((el, i) => {
      const element = el as HTMLDivElement
      countUpRefs.current[i] = element

      // Get target value from the element's text content
      let targetValue = 0

      if (i === 0) targetValue = 0 // Commission
      if (i === 1) targetValue = 500 // Mutual Funds
      if (i === 2) targetValue = 1000000 // Investors
      if (i === 3) targetValue = 15 // Avg. Returns

      animateCountUp(element, targetValue)
    })
  }, [])

  return (
    <div className="relative overflow-hidden mb-16 py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-blue-100 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-1/4 w-64 h-64 rounded-full bg-green-100 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full bg-amber-100 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Animated chart lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className="chart-line chart-line-1" d="M0,50 Q25,40 50,50 T100,50" stroke="currentColor" fill="none" />
          <path className="chart-line chart-line-2" d="M0,70 Q25,50 50,60 T100,40" stroke="currentColor" fill="none" />
          <path className="chart-line chart-line-3" d="M0,50 Q25,60 50,40 T100,30" stroke="currentColor" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-block mb-4 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-slate-200/20">
          <span className="text-sm font-medium">Zero commission direct mutual funds</span>
        </div>
        <h1 className="mb-6 text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 animate-gradient">
          Invest Smarter, <br className="hidden sm:block" />
          Grow Faster
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Start your investment journey with our simple and transparent platform. Track, manage, and optimize your
          mutual fund investments in one place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="bg-slate-800 hover:bg-slate-700 transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-300 hover:border-slate-400 transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link href="/explore">Explore Funds</Link>
          </Button>
        </div>

        {/* Animated stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-slate-100 transform transition-all duration-500 hover:scale-105">
            <div className="text-3xl font-bold text-slate-800 count-up">₹0</div>
            <div className="text-sm text-slate-600">Commission</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-slate-100 transform transition-all duration-500 hover:scale-105">
            <div className="text-3xl font-bold text-slate-800 count-up">500+</div>
            <div className="text-sm text-slate-600">Mutual Funds</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-slate-100 transform transition-all duration-500 hover:scale-105">
            <div className="text-3xl font-bold text-slate-800 count-up">1M+</div>
            <div className="text-sm text-slate-600">Investors</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-slate-100 transform transition-all duration-500 hover:scale-105">
            <div className="text-3xl font-bold text-slate-800 count-up">15%</div>
            <div className="text-sm text-slate-600">Avg. Returns</div>
          </div>
        </div>
      </div>
    </div>
  )
}
