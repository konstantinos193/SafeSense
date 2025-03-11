'use client'

import * as React from 'react'
import { useLanguage } from '@/components/language-provider'

export function TranslationLoader() {
  const { language } = useLanguage()
  
  // Log language changes for debugging
  React.useEffect(() => {
    console.log(`Language changed to: ${language}`)
  }, [language])
  
  // Don't render anything visible
  return null
} 