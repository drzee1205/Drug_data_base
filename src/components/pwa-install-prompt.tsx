'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  prompt(): Promise<void>
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                       (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    setIsIOS(isIOSDevice)

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      const promptEvent = e as BeforeInstallPromptEvent
      setDeferredPrompt(promptEvent)
      setIsInstallable(true)
    }

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
      toast.success('Paedia-Dose has been installed successfully!')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        toast.success('Installation accepted!')
      } else {
        toast.info('Installation dismissed')
      }
      
      setDeferredPrompt(null)
      setIsInstallable(false)
    } catch (error) {
      console.error('Error during installation:', error)
      toast.error('Installation failed')
    }
  }

  const handleIOSInstallInstructions = () => {
    toast.info(`To install Paedia-Dose on iOS:
1. Tap the Share button in Safari
2. Scroll down and tap "Add to Home Screen"
3. Tap "Add" to confirm`)
  }

  if (isInstalled) {
    return (
      <Card className="bg-green-50 border-green-200 mx-4 mt-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-medium">App Installed</span>
            </div>
            <Badge variant="outline" className="border-green-500 text-green-700">
              PWA Mode
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isIOS) {
    return (
      <Card className="bg-blue-50 border-blue-200 mx-4 mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-blue-700 text-sm flex items-center gap-2">
            📱 Install Paedia-Dose
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Button 
            onClick={handleIOSInstallInstructions}
            variant="outline" 
            className="w-full border-blue-500 text-blue-700 hover:bg-blue-100"
          >
            Show Install Instructions
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isInstallable && deferredPrompt) {
    return (
      <Card className="bg-blue-50 border-blue-200 mx-4 mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-blue-700 text-sm flex items-center gap-2">
            📲 Install Paedia-Dose
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Button 
            onClick={handleInstallClick}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Install App
          </Button>
        </CardContent>
      </Card>
    )
  }

  return null
}