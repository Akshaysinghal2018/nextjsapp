import './globals.css'

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Header from '@/components/header'
import Footer from '@/components/footer'

import StoreProvider from './StoreProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  )
}
