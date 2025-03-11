import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/flags.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from "@/components/language-provider"
import { LoadingOverlay } from "@/components/loading-overlay"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SafeSense - Secure Your Crypto Assets',
  description: 'Protect your digital investments with comprehensive crypto insurance solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <LoadingOverlay />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
