'use client'

import * as React from 'react'
import { useLanguage } from './language-provider'

interface TranslatedTextProps {
  text: string
}

export const TranslatedText = React.memo(function TranslatedText({ text }: TranslatedTextProps) {
  const { translateText, language, isDetecting, translationCache } = useLanguage()
  const [translatedText, setTranslatedText] = React.useState(text)
  const isMounted = React.useRef(true)
  const hasRequestedTranslation = React.useRef(false)
  
  // Check if translation is already in cache
  React.useEffect(() => {
    if (language === 'en' || isDetecting || !text) {
      setTranslatedText(text)
      return
    }
    
    // If translation is in cache, use it immediately
    if (translationCache[language]?.[text]) {
      setTranslatedText(translationCache[language][text])
      return
    }
    
    // Otherwise, set to original text and request translation if not already requested
    setTranslatedText(text)
    
    if (!hasRequestedTranslation.current) {
      hasRequestedTranslation.current = true
      
      const fetchTranslation = async () => {
        try {
          const result = await translateText(text)
          if (isMounted.current && result !== text) {
            setTranslatedText(result)
          }
        } catch (error) {
          console.error('Translation error:', error)
        }
      }
      
      fetchTranslation()
    }
    
    return () => {
      isMounted.current = false
    }
  }, [text, language, translateText, isDetecting, translationCache])
  
  // Reset the request flag when text or language changes
  React.useEffect(() => {
    hasRequestedTranslation.current = false
  }, [text, language])
  
  return <>{translatedText}</>
}) 