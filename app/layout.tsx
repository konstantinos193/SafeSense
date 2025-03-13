import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/flags.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from "@/components/language-provider"
import { LoadingOverlay } from "@/components/loading-overlay"
import { AuthProvider } from '@/contexts/AuthContext'
import { ChatSupport } from "@/components/ui/chat-support"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SafeSense',
  description: 'Revolutionizing insurance with blockchain technology. Safesense offers transparent, secure, and efficient coverage for the digital age.',
  icons: {
    icon: '/favicon.png',
  },
  metadataBase: new URL('https://safe-sense.vercel.app'),
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'safe-sense.vercel.ap', // Update with your actual domain
    title: 'SafeSense',
    description: 'Revolutionizing insurance with blockchain technology. Safesense offers transparent, secure, and efficient coverage for the digital age.',
    siteName: 'SafeSense',
    images: [
      {
        url: 'https://i.postimg.cc/QNwbwm44/Safe-Sense-1.png', // Update with your actual image URL
        width: 1500,
        height: 500,
        alt: 'SafeSense',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SafeSense - Secure Your Crypto Assets',
    description: 'Revolutionizing insurance with blockchain technology. Safesense offers transparent, secure, and efficient coverage for the digital age.',
    images: ['https://i.postimg.cc/QNwbwm44/Safe-Sense-1.png'], // Update with your actual image URL
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <AuthProvider>
              <LoadingOverlay />
              {children}
              <ChatSupport />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
