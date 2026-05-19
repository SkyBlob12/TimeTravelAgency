import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { destinations } from '../data/destinations'
import Chatbot from './Chatbot'

export default function DestinationPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const destination = destinations.find((d) => d.id === id)

  if (!destination) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-gold text-6xl mb-4">404</p>
          <p className="text-gray-400 mb-6">Destination introuvable.</p>
          <button onClick={() => navigate('/')} className="btn-gold">
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  const others = destinations.filter((d) => d.id !== destination.id)

  return (
    <div className="min-h-screen bg-dark">
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-card/90 backdrop-blur-md border border-dark-border text-gray-300 hover:text-gold hover:border-gold/40 transition-all duration-300 text-sm"
        >
          ← Retour
        </button>
      </div>

      {/* Hero image */}
      <div className="relative h-[60vh] overflow-hidden">
        {destination.image && (
          <img
            src={destination.image}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${destination.gradient} opacity-60`} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

        {/* Hero content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-5xl mb-4 block">{destination.icon}</span>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm"
              style={{
                color: destination.accentColor,
                borderColor: destination.accentColor + '60',
                backgroundColor: destination.accentColor + '20',
              }}
            >
              {destination.era}
            </span>
            <span className="text-gray-400 text-xs tracking-widest uppercase">{destination.period}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white">{destination.name}</h1>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left: description + highlights */}
          <div className="md:col-span-2 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-serif text-2xl font-bold text-white mb-4">À propos de cette destination</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{destination.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Points forts du voyage</h2>
              <ul className="space-y-3">
                {destination.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-gold mt-0.5 text-lg">✦</span>
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA chatbot */}
            <motion.div
              className="p-6 rounded-2xl border border-gold/20 bg-gold/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-gray-300 text-sm mb-4">
                Des questions sur <strong className="text-white">{destination.name}</strong> ? Notre conseiller IA peut vous aider à préparer votre voyage.
              </p>
              <button
                onClick={() => document.getElementById('chatbot-toggle')?.click()}
                className="btn-gold text-sm"
              >
                💬 Parler à un conseiller
              </button>
            </motion.div>
          </div>

          {/* Right: booking card */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-dark p-6 sticky top-24">
              <div className="text-center mb-6">
                <div
                  className="font-serif text-3xl font-bold mb-1"
                  style={{ color: destination.accentColor }}
                >
                  {destination.price}
                </div>
                <div className="text-gray-500 text-xs">{destination.priceNote}</div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: 'Durée', value: destination.duration },
                  { label: 'Difficulté', value: destination.difficulty },
                  { label: 'Climat', value: destination.climate },
                  { label: 'Époque', value: destination.era },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm border-b border-dark-border pb-2">
                    <span className="text-gray-500">{label}</span>
                    <span className="text-gray-200 font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.getElementById('chatbot-toggle')?.click()}
                className="btn-gold w-full justify-center"
              >
                Réserver ce voyage
              </button>
              <p className="text-gray-600 text-xs text-center mt-3">
                Réservation via notre conseiller IA
              </p>
            </div>
          </motion.div>
        </div>

        {/* Other destinations */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="font-serif text-2xl font-bold text-white mb-8">Autres destinations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {others.map((dest) => (
              <button
                key={dest.id}
                onClick={() => navigate(`/destination/${dest.id}`)}
                className="group relative rounded-2xl overflow-hidden border border-dark-border hover:border-gold/40 transition-all duration-300 text-left"
                style={{ minHeight: '200px' }}
              >
                {dest.image && (
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500"
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${dest.gradient} opacity-50`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <span className="text-2xl">{dest.icon}</span>
                  <h3 className="font-serif text-xl font-bold text-white mt-1 group-hover:text-gold transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">{dest.era} · {dest.price}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <Chatbot />
    </div>
  )
}
