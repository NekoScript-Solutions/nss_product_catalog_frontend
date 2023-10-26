import type { Metadata } from 'next'
import layout from './layout.module.scss';
import { Montserrat } from 'next/font/google'
import './variables.scss'
import './globals.scss'
import Footer from "@/components/Footer/Footer";


const mont = Montserrat({ subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mont.className}>
        <div className={'header'}></div> {/* add header component*/}
        <main className={layout.main}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
