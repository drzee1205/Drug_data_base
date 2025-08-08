'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineWarning, setShowOfflineWarning] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineWarning(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineWarning(true)
    }

    // Set initial state
    setIsOnline(navigator.onLine)

    // Add event listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline || !showOfflineWarning) {
    return null
  }

  return (
    <Card className="fixed top-20 left-4 right-4 z-50 bg-orange-900/90 border-orange-600 backdrop-blur-sm shadow-lg">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-orange-200 text-sm font-medium">
              You're offline
            </span>
          </div>
          <Badge variant="outline" className="border-orange-500 text-orange-200 text-xs">
            Limited Functionality
          </Badge>
        </div>
        <p className="text-orange-300 text-xs mt-1">
          Some features may be unavailable. Calculations will use cached data.
        </p>
      </CardContent>
    </Card>
  )
}