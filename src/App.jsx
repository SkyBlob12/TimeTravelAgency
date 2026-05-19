import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Destinations from './components/Destinations'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import DestinationPage from './components/DestinationPage'

function HomePage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Hero />
      <About />
      <Destinations />
      <Footer />
      <Chatbot />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:id" element={<DestinationPage />} />
      </Routes>
    </BrowserRouter>
  )
}
