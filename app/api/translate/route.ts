import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    // Log that the API route is being called
    console.log('Translation API route called (fallback)')
    
    const body = await request.json()
    const { texts, targetLanguage } = body
    
    // Validate inputs
    if (!Array.isArray(texts) || !texts.length || !targetLanguage) {
      return NextResponse.json(
        { error: 'Invalid request. Expected texts array and targetLanguage.' },
        { status: 400 }
      )
    }
    
    // Try to load translations from the JSON file
    let translatedTexts: Record<string, string> = {}
    
    try {
      // Check if the translation file exists in the public directory
      const translationFilePath = path.join(process.cwd(), 'public', 'translations', `${targetLanguage}.json`)
      
      if (fs.existsSync(translationFilePath)) {
        const fileContent = fs.readFileSync(translationFilePath, 'utf8')
        const translations = JSON.parse(fileContent)
        
        // Find translations for the requested texts
        for (const text of texts) {
          if (translations[text]) {
            translatedTexts[text] = translations[text]
          }
        }
        
        console.log(`Found ${Object.keys(translatedTexts).length} translations in JSON file`)
      } else {
        console.log(`Translation file for ${targetLanguage} not found`)
      }
    } catch (error) {
      console.error('Error reading translation file:', error)
    }
    
    // If we have translations for all texts, return them
    if (Object.keys(translatedTexts).length === texts.length) {
      return NextResponse.json({ translatedTexts })
    }
    
    // For any missing translations, use the Gemini API as fallback
    const missingTexts = texts.filter(text => !translatedTexts[text])
    
    if (missingTexts.length > 0 && process.env.GEMINI_API_KEY) {
      console.log(`Using API for ${missingTexts.length} missing translations`)
      
      // Combine all texts into a single string with markers
      const combinedText = missingTexts.map((text, index) => `[${index}]${text}`).join('\n')
      
      // Prepare the API request
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
      const apiBody = {
        contents: [
          {
            parts: [
              {
                text: `Translate the following text from English to ${targetLanguage}. 
                Each text is marked with [index]. Return the translations in the same format with [index] markers.
                Do not translate the markers themselves.
                
                ${combinedText}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }
      
      // Send request to Gemini API
      const response = await fetch(`${apiUrl}?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiBody),
      })
      
      if (response.ok) {
        const data = await response.json()
        const translatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
        
        // Parse the translated content back into individual texts
        const translationRegex = /\[(\d+)\](.*?)(?=\[\d+\]|$)/gs
        
        let match
        while ((match = translationRegex.exec(translatedContent + '[999]'))) {
          const index = parseInt(match[1])
          const translatedText = match[2].trim()
          
          if (!isNaN(index) && index < missingTexts.length) {
            translatedTexts[missingTexts[index]] = translatedText
          }
        }
      } else {
        console.error('Gemini API error:', response.status)
      }
    }
    
    return NextResponse.json({ translatedTexts })
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    )
  }
}