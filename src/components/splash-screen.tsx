'use client'

import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onFinish: () => void
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onFinish, 500) // Allow fade out animation
    }, 2500) // Show splash for 2.5 seconds

    return () => clearTimeout(timer)
  }, [onFinish])

  if (!isVisible) return null

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Phone Mockup with Gradient Background */}
      <div className="relative mb-8">
        <div className="w-64 h-[500px] rounded-[3rem] border-8 border-gray-800 bg-gray-800 p-2">
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
            {/* Wavy Gradient Background */}
            <div className="absolute inset-0">
              {/* Pink layer */}
              <div 
                className="absolute inset-0 bg-pink-300"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 80%)'
                }}
              />
              {/* Orange layer */}
              <div 
                className="absolute inset-0 bg-orange-300"
                style={{
                  clipPath: 'polygon(0 40%, 100% 20%, 100% 75%, 0 95%)'
                }}
              />
              {/* Cream layer */}
              <div 
                className="absolute inset-0 bg-yellow-100"
                style={{
                  clipPath: 'polygon(0 60%, 100% 40%, 100% 90%, 0 100%)'
                }}
              />
              {/* Mint layer */}
              <div 
                className="absolute inset-0 bg-emerald-200"
                style={{
                  clipPath: 'polygon(0 80%, 100% 60%, 100% 100%, 0 100%)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* App Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paedia-Dose</h1>
        <p className="text-gray-600 text-sm">Powered by AI</p>
      </div>
    </div>
  )
}