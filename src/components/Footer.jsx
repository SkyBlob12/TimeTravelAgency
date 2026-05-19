import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer id="contact" className="bg-dark-secondary border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center text-lg">
                ⏱
              </div>
              <span className="font-serif text-lg font-bold text-white">
                TimeTravel<span className="text-gold">Agency</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              L'agence pionnière du voyage temporel de luxe. Nous vous emmenons là où nul
              autre n'a jamais osé aller : dans le passé.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Chatbot disponible 24h/24
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-serif text-white font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#destinations" className="hover:text-gold transition-colors">🗼 Paris 1889</a></li>
              <li><a href="#destinations" className="hover:text-gold transition-colors">🦕 Crétacé -65M</a></li>
              <li><a href="#destinations" className="hover:text-gold transition-colors">🎨 Florence 1504</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>contact@timetravel.agency</li>
              <li>+33 1 23 45 67 89</li>
              <li>Paris, France (2024)</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2024 TimeTravel Agency — Projet pédagogique M1/M2 Digital & IA · Ynov Campus
          </p>
          <p className="text-gray-700 text-xs">
            Propulsé par React · Vite · Tailwind CSS · Mistral AI
          </p>
        </div>
      </div>
    </footer>
  )
}
