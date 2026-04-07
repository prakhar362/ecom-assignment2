import { Inter } from "next/font/google"
import "./globals.css"
import { Header, Footer } from "@/components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "NextStep - Modern Online Career Services",
  description: "Where Top Talent Meets Great Companies.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 w-full relative overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
