import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() > 0.8 ? '2px' : '1px',
            height: Math.random() > 0.8 ? '2px' : '1px',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.2,
            animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
      {/* Gold particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`gold-${i}`}
          className="absolute rounded-full bg-gold/60"
          style={{
            width: '2px',
            height: '2px',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${3 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}

function PortalRing({ delay, size, opacity }) {
  return (
    <motion.div
      className="absolute rounded-full border border-gold/20"
      style={{ width: size, height: size, opacity }}
      animate={{ scale: [1, 1.08, 1], rotate: [0, 180, 360] }}
      transition={{ duration: 20 + delay * 5, repeat: Infinity, ease: 'linear' }}
    />
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1a1020 0%, #0a0a0f 70%)',
      }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 stars-bg opacity-60" />
      <StarField />

      {/* Portal rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PortalRing delay={0} size="600px" opacity={0.15} />
        <PortalRing delay={1} size="800px" opacity={0.08} />
        <PortalRing delay={2} size="1000px" opacity={0.05} />
        <motion.div
          className="absolute rounded-full border-2 border-gold/30"
          style={{ width: '300px', height: '300px' }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Gradient overlay bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 text-gold text-sm font-medium backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Agence de voyage temporel de luxe • Depuis 2024
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          Voyagez à travers{' '}
          <span className="gold-gradient-text">le temps</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          TimeTravel Agency vous offre des expériences uniques à travers les époques les plus
          fascinantes de l'histoire. Vivez ce que vous pensiez impossible.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#destinations" className="btn-gold text-base px-8 py-4 animate-pulse-gold">
            ✦ Explorer les destinations
          </a>
          <a href="#about" className="btn-outline-gold text-base px-8 py-4">
            En savoir plus
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '3', label: 'Destinations' },
            { value: '1200+', label: 'Voyageurs' },
            { value: '100%', label: 'Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl font-bold text-gold">{stat.value}</div>
              <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs tracking-widest uppercase">Découvrir</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>
    </section>
  )
}
