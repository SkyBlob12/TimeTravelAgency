import { motion } from 'framer-motion'

const features = [
  {
    icon: '💎',
    title: 'Luxe & Confort',
    description:
      "Chaque voyage est orchestré dans les moindres détails. Hébergements d'époque reconstitués, guide personnel dédié et équipement dernier cri pour votre confort absolu.",
  },
  {
    icon: '🛡',
    title: 'Sécurité Absolue',
    description:
      "Notre technologie de protection temporelle certifiée garantit votre intégrité physique et temporelle à chaque instant. Aucun paradoxe, aucun risque.",
  },
  {
    icon: '🔬',
    title: 'Expertise Historique',
    description:
      "Nos guides sont des historiens et archéologues reconnus. Ils vous révèlent les secrets des époques visitées avec une authenticité et une précision sans égale.",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-dark-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

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
            Notre Agence
          </span>
          <h2 className="section-title">
            L'excellence du voyage temporel
          </h2>
          <p className="section-subtitle mx-auto">
            Pionnière dans le tourisme à travers les âges, TimeTravel Agency vous propose
            des expériences immersives au cœur des moments les plus marquants de l'humanité.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="card-dark p-8 group hover:border-gold/30 transition-colors duration-300"
            >
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="font-serif text-2xl md:text-3xl text-white/80 italic leading-relaxed max-w-3xl mx-auto">
            "Le passé n'est pas révolu. Il nous attend, patient et silencieux,
            prêt à livrer ses secrets à ceux qui osent le rejoindre."
          </p>
          <footer className="mt-4 text-gold text-sm font-medium">— Fondateur de TimeTravel Agency</footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
