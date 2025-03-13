'use client'

import * as React from 'react'
import { Search, X, Check, ChevronDown, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage, languages, commonLanguages } from '@/components/language-provider'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

// Add this CSS to your global.css file:
// .flag {
//   width: 20px;
//   height: 15px;
//   display: inline-block;
//   background-size: contain;
//   background-position: center;
//   background-repeat: no-repeat;
//   margin-right: 8px;
// }
// .flag-us { background-image: url('https://flagcdn.com/w20/us.png'); }
// .flag-es { background-image: url('https://flagcdn.com/w20/es.png'); }
// .flag-fr { background-image: url('https://flagcdn.com/w20/fr.png'); }
// .flag-de { background-image: url('https://flagcdn.com/w20/de.png'); }
// .flag-cn { background-image: url('https://flagcdn.com/w20/cn.png'); }
// .flag-jp { background-image: url('https://flagcdn.com/w20/jp.png'); }
// .flag-ru { background-image: url('https://flagcdn.com/w20/ru.png'); }
// .flag-sa { background-image: url('https://flagcdn.com/w20/sa.png'); }
// .flag-in { background-image: url('https://flagcdn.com/w20/in.png'); }
// .flag-pt { background-image: url('https://flagcdn.com/w20/pt.png'); }
// .flag-gr { background-image: url('https://flagcdn.com/w20/gr.png'); }

export function LanguageSelector() {
  const { language, setLanguage, isLoading, isDetecting } = useLanguage()
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [showAll, setShowAll] = React.useState(false)
  const [availableLanguages, setAvailableLanguages] = React.useState<string[]>([])
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Load available languages from the JSON file
  React.useEffect(() => {
    const loadAvailableLanguages = async () => {
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

    loadAvailableLanguages()
  }, [])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (langCode: string) => {
    console.log(`Changing language to: ${langCode}`);
    setLanguage(langCode);
    setOpen(false);
    setSearchQuery('');
  }

  // Filter languages based on search query and availability
  const filteredLanguages = React.useMemo(() => {
    // Start with either all languages or common languages
    let langEntries = showAll ? Object.entries(languages) : Object.entries(commonLanguages)
    
    // Filter by search query if provided
    if (searchQuery) {
      langEntries = Object.entries(languages).filter(([code, lang]) => {
        const query = searchQuery.toLowerCase()
        return (
          lang.name.toLowerCase().includes(query) ||
          lang.nativeName.toLowerCase().includes(query) ||
          code.toLowerCase().includes(query)
        )
      })
    }
    
    // Highlight languages that have translations available
    return langEntries.map(([code, lang]) => ({
      code,
      lang,
      available: availableLanguages.includes(code) || code === 'en'
    }))
  }, [searchQuery, showAll, availableLanguages])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 px-2 font-medium flex items-center gap-1" 
        disabled={isDetecting}
        onClick={() => setOpen(!open)}
      >
        {isDetecting ? (
          <>
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            <span className="hidden sm:inline">Detecting...</span>
          </>
        ) : (
          <>
            {languages[language] ? (
              <span className={cn("flag", `flag-${languages[language]?.countryCode.toLowerCase()}`)} />
            ) : (
              <Globe className="h-4 w-4" />
            )}
            <span className="hidden sm:inline ml-1 max-w-[100px] truncate">
              {languages[language]?.nativeName || language}
            </span>
            {isLoading && <Loader2 className="h-3 w-3 ml-1 animate-spin" />}
            <ChevronDown className="h-4 w-4 opacity-50 ml-1" />
          </>
        )}
      </Button>
      
      {open && !isDetecting && (
        <div className="absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-background border z-10">
          <div className="flex items-center border-b px-3 py-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="flex h-8 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search language..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="max-h-[300px] overflow-y-auto py-1">
            {filteredLanguages.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">No languages found</div>
            ) : (
              filteredLanguages.map(({ code, lang, available }) => (
                <div
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={cn(
                    "flex items-center w-full px-3 py-2 text-sm text-left hover:bg-muted cursor-pointer",
                    language === code && "bg-muted",
                    !available && "opacity-60"
                  )}
                  role="button"
                  tabIndex={0}
                  aria-disabled={isLoading}
                >
                  {lang.countryCode ? (
                    <span className={cn("flag", `flag-${lang.countryCode.toLowerCase()}`)} />
                  ) : (
                    <Globe className="h-4 w-4" />
                  )}
                  <span className="ml-2 flex-1 truncate">{lang.name}</span>
                  <span className="ml-1 text-xs text-muted-foreground truncate">({lang.nativeName})</span>
                  {language === code && <Check className="ml-2 h-4 w-4 flex-shrink-0" />}
                </div>
              ))
            )}
            
            {!searchQuery && !showAll && (
              <div
                onClick={() => setShowAll(true)}
                className="flex items-center justify-center w-full px-3 py-2 text-sm text-primary hover:bg-muted border-t cursor-pointer"
                role="button"
                tabIndex={0}
              >
                Show all languages
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 