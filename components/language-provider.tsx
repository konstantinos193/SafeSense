'use client'

import * as React from 'react'
import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react'
import allLanguages from '@/lib/all-languages'

// Define commonly used languages that will be shown by default
export const commonLanguages = {
  en: { name: 'English', nativeName: 'English', countryCode: 'US' },
  zh: { name: 'Mandarin Chinese', nativeName: '普通话', countryCode: 'CN' },
  es: { name: 'Spanish', nativeName: 'Español', countryCode: 'ES' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', countryCode: 'IN' },
  pt: { name: 'Portuguese', nativeName: 'Português', countryCode: 'PT' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', countryCode: 'BD' },
  ru: { name: 'Russian', nativeName: 'Русский', countryCode: 'RU' },
  ja: { name: 'Japanese', nativeName: '日本語', countryCode: 'JP' },
  ar: { name: 'Arabic', nativeName: 'العربية', countryCode: 'SA' },
  fr: { name: 'French', nativeName: 'Français', countryCode: 'FR' },
  de: { name: 'German', nativeName: 'Deutsch', countryCode: 'DE' },
  el: { name: 'Greek', nativeName: 'Ελληνικά', countryCode: 'GR' },
}

// Export all languages for use in the language selector
export const languages = allLanguages

// Fallback translations for when JSON files are not available
const fallbackTranslations = {
  es: {
    'Features': 'Características',
    'Insurance': 'Seguros',
    'Pricing': 'Precios',
    'FAQ': 'Preguntas Frecuentes',
    'Contact': 'Contacto',
    'Get Started': 'Comenzar',
    'Blockchain-Powered Insurance for Everything': 'Seguros basados en blockchain para todo',
    // Add more translations as needed
  },
  el: {
    'Features': 'Χαρακτηριστικά',
    'Insurance': 'Ασφάλιση',
    'Pricing': 'Τιμολόγηση',
    'FAQ': 'Συχνές Ερωτήσεις',
    'Contact': 'Επικοινωνία',
    'Get Started': 'Ξεκινήστε',
    // Add more translations as needed
  },
  // Add more languages
}

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
  translateText: (text: string) => Promise<string>
  isLoading: boolean
  isDetecting: boolean
  translationCache: Record<string, Record<string, string>>
  updateTranslationCache: (lang: string, translations: Record<string, string>) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en')
  const [isLoading, setIsLoading] = useState(false)
  const [isDetecting, setIsDetecting] = useState(true)
  const [translationCache, setTranslationCache] = useState<Record<string, Record<string, string>>>({})
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])
  const translationsLoaded = useRef<Record<string, boolean>>({})
  const [translations, setTranslations] = useState<Record<string, string>>({})

  // Initialize language from localStorage or browser settings
  useEffect(() => {
    const detectLanguage = async () => {
      try {
        setIsDetecting(true)
        
        // First check localStorage for saved preference
        const savedLanguage = localStorage.getItem('preferredLanguage')
        if (savedLanguage && savedLanguage in languages) {
          setLanguage(savedLanguage)
          setIsDetecting(false)
          return
        }
        
        // Then try to detect from browser settings
        const browserLang = navigator.language.split('-')[0]
        
        // Check if browser language is supported
        if (browserLang in languages) {
          setLanguage(browserLang)
          localStorage.setItem('preferredLanguage', browserLang)
          setIsDetecting(false)
          return
        }
        
        // Default to English if detection fails
        setLanguage('en')
      } catch (error) {
        console.error('Language detection failed:', error)
        setLanguage('en')
      } finally {
        setIsDetecting(false)
      }
    }

    // Check which language JSON files are available
    const checkAvailableLanguages = async () => {
      try {
        const response = await fetch('/translations/languages.json')
        if (response.ok) {
          const data = await response.json()
          setAvailableLanguages(Object.keys(data))
        }
      } catch (error) {
        console.error('Failed to load available languages:', error)
      }
    }

    detectLanguage()
    checkAvailableLanguages()
  }, [])

  // Save language preference
  useEffect(() => {
    if (language && !isDetecting) {
      localStorage.setItem('preferredLanguage', language)
    }
  }, [language, isDetecting])

  // Define the updateTranslationCache function
  const updateTranslationCache = useCallback((lang: string, translations: Record<string, string>) => {
    setTranslationCache(prevCache => ({
      ...prevCache,
      [lang]: translations
    }))
  }, [])

  // Define loadTranslations, which references updateTranslationCache
  const loadTranslations = useCallback(async (lang: string) => {
    setIsLoading(true)
    try {
      // Check if we already have this language in cache
      if (translationCache[lang]) {
        setTranslations(translationCache[lang])
        setIsLoading(false)
        return
      }
      
      console.log(`Loading translations for ${lang}...`)
      
      // Load translations from the JSON file in public directory
      const response = await fetch(`/translations/${lang}.json`)
      
      if (!response.ok) {
        console.error(`Failed to load translations for ${lang}: ${response.status} ${response.statusText}`)
        throw new Error(`Failed to load translations for ${lang}`)
      }
      
      const data = await response.json()
      console.log(`Loaded ${Object.keys(data).length} translations for ${lang}`)
      
      // Update cache and current translations
      updateTranslationCache(lang, data)
      setTranslations(data)
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error)
      // Fallback to empty translations
      setTranslations({})
    } finally {
      setIsLoading(false)
    }
  }, [translationCache, updateTranslationCache])

  // Make sure language change is properly handled
  useEffect(() => {
    if (language) {
      console.log(`Language changed to ${language}, loading translations...`)
      loadTranslations(language)
      
      // Save the selected language to localStorage
      localStorage.setItem('selectedLanguage', language)
      
      // Update the document language for accessibility
      document.documentElement.lang = language
    }
  }, [language, loadTranslations])

  // Simple key-based translation function
  const t = useCallback((key: string): string => {
    if (language === 'en' || !key || key.trim() === '' || isDetecting) {
      return key
    }
    
    // Check if translation is in cache
    if (translationCache[language]?.[key]) {
      return translationCache[language][key]
    }
    
    // Return original key if no translation found
    return key
  }, [language, translationCache, isDetecting])

  // Translate text function (now just uses the cache)
  const translateText = useCallback(async (text: string): Promise<string> => {
    // If current language is English, no need to translate
    if (language === 'en' || !text || text.trim() === '' || isDetecting) {
      return text
    }
    
    // Check if translation is in cache
    if (translationCache[language]?.[text]) {
      return translationCache[language][text]
    }
    
    // Return original text if no translation found
    return text
  }, [language, translationCache, isDetecting])

  const contextValue = React.useMemo(() => ({
    language,
    setLanguage,
    t,
    translateText,
    isLoading,
    isDetecting,
    translationCache,
    updateTranslationCache
  }), [language, t, translateText, isLoading, isDetecting, translationCache, updateTranslationCache])

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 