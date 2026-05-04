'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppFAB() {
  return (
    <a 
      href="https://wa.me/910000000000" // Placeholder
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[110px] right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
    </a>
  )
}
