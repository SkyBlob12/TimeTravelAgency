import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Destinations from './components/Destinations'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

export default function App() {
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
