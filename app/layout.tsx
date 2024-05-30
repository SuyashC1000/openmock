import './globals.css'
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import { fonts } from './fonts'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OpenMock',
  description: '',
}

import { Providers } from './providers'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en' className={fonts.worksans.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}