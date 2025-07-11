import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EduInnovate - Empower Your Future with Learning',
  description: 'Transform your career with our comprehensive online courses. Expert instructors, flexible learning, and personalized education paths.',
  keywords: 'online learning, courses, education, skills development, career advancement',
  openGraph: {
    title: 'EduInnovate - Empower Your Future with Learning',
    description: 'Transform your career with our comprehensive online courses.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}