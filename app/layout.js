import './globals.css'

export const metadata = {
  title: 'Kiro Deck Builder',
  description: 'A coding-themed deck building card game',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
