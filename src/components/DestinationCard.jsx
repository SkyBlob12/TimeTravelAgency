import { motion } from 'framer-motion'
import { useState } from 'react'

export default function DestinationCard({ destination, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-dark-border hover:border-gold/40 transition-colors duration-500 bg-dark-card"
      style={{ minHeight: '480px' }}
    >
      {/* Background image */}
      {destination.image && (
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: hovered ? 0.55 : 0.45 }}
        />
      )}

      {/* Gradient fallback (always shown, stronger when no image) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${destination.gradient} transition-opacity duration-500`}
        style={{ opacity: destination.image ? (hovered ? 0.4 : 0.5) : (hovered ? 0.8 : 0.6) }}
      />

      {/* Content overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Era badge */}
      <div className="absolute top-4 right-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border"
          style={{
            color: destination.accentColor,
            borderColor: destination.accentColor + '60',
            backgroundColor: destination.accentColor + '20',
          }}
        >
          {destination.era}
        </span>
      </div>

      {/* Icon */}
      <div className="absolute top-4 left-4 text-4xl">{destination.icon}</div>

      {/* Main content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Period */}
        <p className="text-gray-400 text-xs font-medium tracking-wider uppercase mb-2">
          {destination.period}
        </p>

        {/* Title */}
        <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
          {destination.name}
        </h3>

        {/* Description (visible on hover) */}
        <motion.p
          className="text-gray-300 text-sm leading-relaxed mb-4 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {destination.description}
        </motion.p>

        {/* Highlights (visible on hover) */}
        <motion.ul
          className="space-y-1 mb-4 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {destination.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-center gap-2 text-gray-300 text-xs">
              <span className="text-gold">✦</span>
              {h}
            </li>
          ))}
        </motion.ul>

        {/* Footer: price + meta */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-white font-bold text-xl font-serif" style={{ color: destination.accentColor }}>
              {destination.price}
            </div>
            <div className="text-gray-500 text-xs">{destination.priceNote}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-gray-400 text-xs">{destination.duration}</div>
              <div className="text-gray-500 text-xs">{destination.difficulty}</div>
            </div>
            <a
              href="#contact"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-dark transition-all duration-300 text-sm"
              onClick={(e) => {
                e.stopPropagation()
                document.getElementById('chatbot-toggle')?.click()
              }}
            >
              →
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
