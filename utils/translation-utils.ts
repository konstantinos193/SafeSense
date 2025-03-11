export function registerTextsForTranslation(texts: string[]) {
  if (!texts || texts.length === 0) return;
  
  try {
    // Get existing texts from localStorage
    const existingTexts = JSON.parse(localStorage.getItem('textsToTranslate') || '[]');
    
    // Combine with new texts and remove duplicates
    const allTexts = [...new Set([...existingTexts, ...texts])];
    
    // Save back to localStorage
    localStorage.setItem('textsToTranslate', JSON.stringify(allTexts));
    
    console.log(`Registered ${texts.length} texts for translation`);
  } catch (error) {
    console.error('Error registering texts for translation:', error);
  }
} 