'use client'

import * as React from 'react'
import { useLanguage } from '@/components/language-provider'
import { Progress } from '@/components/ui/progress'

export function TranslationProgress() {
  const { isLoading, translationProgress } = useLanguage()
  const [visible, setVisible] = React.useState(false)
  
  React.useEffect(() => {
    if (isLoading) {
      setVisible(true)
    } else {
      // Keep progress visible briefly after loading completes
      const timeout = setTimeout(() => {
        setVisible(false)
      }, 1000)
      
      return () => clearTimeout(timeout)
    }
  }, [isLoading])
  
  if (!visible) return null
  
  return (
    <div className="fixed bottom-4 right-4 bg-card rounded-lg shadow-lg p-4 max-w-xs w-full z-50">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Translating content</span>
        <span className="text-sm text-muted-foreground">{Math.round(translationProgress * 100)}%</span>
      </div>
      <Progress value={translationProgress * 100} className="h-2" />
    </div>
  )
} 