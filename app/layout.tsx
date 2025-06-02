import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script, Playfair_Display, Roboto, Lobster, Pacifico } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "700"],
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
})
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "700"],
})
const lobster = Lobster({
  subsets: ["latin"],
  variable: "--font-lobster",
  weight: "400",
})
const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Một Chút Ngọt Ngào - Một Trời Hạnh Phúc",
  description:
    "Tạo ra những món quà tinh thần dễ thương, những lời chúc ngọt ngào, những điều bé nhỏ nhưng đầy ý nghĩa để khiến ai đó mỉm cười.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dancingScript.variable} ${playfair.variable} ${roboto.variable} ${lobster.variable} ${pacifico.variable} ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
