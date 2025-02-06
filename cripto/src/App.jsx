import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './pages/home'

export default function App() {
  return (
    <div>
      <Header />
      <div>
        |<Home />
      </div>
      <Footer />
    </div>
  )
}
