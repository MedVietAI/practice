import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kỷ Niệm 80 Năm Quốc Khánh Việt Nam',
  description: 'Trò chơi tương tác về lịch sử và văn hóa Việt Nam nhân dịp kỷ niệm 80 năm Quốc khánh 2/9/2025',
  keywords: 'Việt Nam, Quốc khánh, 2/9, lịch sử, văn hóa, trò chơi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-gradient-to-br from-red-50 to-yellow-50 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}