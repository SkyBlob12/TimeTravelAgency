import { motion } from 'framer-motion'
import { destinations } from '../data/destinations'
import DestinationCard from './DestinationCard'

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">
            Nos Voyages
          </span>
          <h2 className="section-title">
            Choisissez votre époque
          </h2>
          <p className="section-subtitle mx-auto">
            Trois destinations d'exception, trois aventures uniques. Survolez chaque carte
            pour découvrir les détails de votre prochain voyage.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 mb-6 text-sm">
            Des questions sur nos destinations ? Notre assistant IA est disponible 24h/24.
          </p>
          <button
            onClick={() => document.getElementById('chatbot-toggle')?.click()}
            className="btn-outline-gold"
          >
            💬 Parler à un conseiller IA
          </button>
        </motion.div>
      </div>
    </section>
  )
}
