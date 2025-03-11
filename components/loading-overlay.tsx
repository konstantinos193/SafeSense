'use client'

import * as React from 'react'
import { useLanguage, languages } from '@/components/language-provider'
import { Loader2 } from 'lucide-react'

export function LoadingOverlay() {
  const { isLoading, language } = useLanguage()
  const [showLoader, setShowLoader] = React.useState(false)
  
  // Only show loader after a short delay to prevent flashing for quick operations
  React.useEffect(() => {
    let timeout: NodeJS.Timeout
    
    if (isLoading) {
      timeout = setTimeout(() => {
        setShowLoader(true)
      }, 300) // Show loader after 300ms of loading
    } else {
      setShowLoader(false)
    }
    
    return () => {
      clearTimeout(timeout)
    }
  }, [isLoading])
  
  if (!showLoader) return null
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card rounded-lg shadow-lg p-6 max-w-md w-full mx-4 flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-center font-medium">
          Translating to {languages[language]?.nativeName || language}...
        </p>
      </div>
    </div>
  )
} 