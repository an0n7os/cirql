'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'ml'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    hero_title: 'Cirql — ningalkku chuttum',
    hero_desc: 'Book any home service in Kerala with the ease of a WhatsApp message.',
    join_waitlist: 'Join Waitlist',
    services_title: 'Services we offer',
  },
  ml: {
    hero_title: 'Cirql — നിങ്ങൾക്കു ചുറ്റും',
    hero_desc: 'കേരളത്തിലെ ഏത് ഹോം സർവീസും വാട്ട്‌സ്ആപ്പിലൂടെ എളുപ്പത്തിൽ ബുക്ക് ചെയ്യാം.',
    join_waitlist: 'വെയ്റ്റ്‌ലിസ്റ്റിൽ ചേരുക',
    services_title: 'ഞങ്ങൾ നൽകുന്ന സേവനങ്ങൾ',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string) => {
    return (translations[language] as any)[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
