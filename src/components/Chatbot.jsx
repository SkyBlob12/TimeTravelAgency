import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.

Ton rôle : conseiller les clients sur les meilleures destinations temporelles et répondre à toutes leurs questions.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement nos 3 destinations :

**Paris 1889 — Belle Époque**
- Prix : à partir de 12 500 € par voyageur
- Durée : 7 jours
- Points forts : inauguration de la Tour Eiffel, Exposition Universelle, Moulin Rouge, cafés parisiens, art impressionniste
- Idéal pour : les amoureux de culture, d'élégance et d'histoire moderne
- Difficulté : Facile, climat tempéré

**Crétacé -65M — Mésozoïque**
- Prix : à partir de 18 000 € par voyageur (équipement de protection inclus)
- Durée : 5 jours
- Points forts : observation de dinosaures (T-Rex, Triceratops), forêts préhistoriques vierges, faune disparue
- Idéal pour : les aventuriers, les passionnés de nature et de paléontologie
- Difficulté : Aventure, climat tropical

**Florence 1504 — Renaissance**
- Prix : à partir de 15 000 € par voyageur
- Durée : 6 jours
- Points forts : Michel-Ange, Léonard de Vinci, palais des Médicis, art de la Renaissance, banquets d'époque
- Idéal pour : les amateurs d'art, d'architecture et de raffinement
- Difficulté : Modéré, climat méditerranéen

FAQ courantes :
- Sécurité : Notre technologie de protection temporelle garantit votre intégrité physique et temporelle. Zéro incident depuis notre création.
- Paradoxes temporels : Nos capsules utilisent un système d'isolation quantique qui empêche tout paradoxe.
- Que porter : Des tenues d'époque sont fournies pour chaque destination.
- Réservation : Contactez-nous 3 mois à l'avance minimum.
- Paiement : Virement bancaire, carte premium ou crypto acceptés.
- Groupe : Voyages privés ou en groupe de 2 à 8 personnes.

Réponds en français, de manière concise et engaging. Si le client hésite, pose-lui une question pour mieux cerner ses préférences et lui recommander la destination idéale.`

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    'Bienvenue chez TimeTravel Agency ! ✨ Je suis votre conseiller en voyages temporels. Que vous rêviez de la Belle Époque parisienne, des dinosaures du Crétacé ou de la Renaissance florentine, je suis là pour vous guider. Quelle époque vous fait rêver ?',
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-dark-secondary rounded-2xl rounded-tl-none w-fit">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-gray-500"
          style={{
            animation: `bounce 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const apiKey = import.meta.env.VITE_MISTRAL_API_KEY

      if (!apiKey || apiKey === 'ta_clé_ici' || apiKey === '') {
        await new Promise((r) => setTimeout(r, 800))
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              '⚠️ Clé API Mistral non configurée. Ajoutez votre clé dans le fichier `.env` (`VITE_MISTRAL_API_KEY=votre_clé`) pour activer le chatbot IA. Pour obtenir une clé gratuite : console.mistral.ai',
          },
        ])
        return
      }

      const conversationMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        userMessage,
      ]

      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'mistral-small-latest',
          messages: conversationMessages,
          max_tokens: 400,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Je suis désolé, une erreur est survenue. Veuillez réessayer dans quelques instants.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const suggestedQuestions = [
    'Quelle destination me conseillez-vous ?',
    'Quel est le prix pour Paris 1889 ?',
    'Comment fonctionne la sécurité ?',
  ]

  return (
    <>
      {/* Toggle button */}
      <motion.button
        id="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold text-dark flex items-center justify-center shadow-lg shadow-gold/30 hover:bg-gold-light transition-colors animate-pulse-gold"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ouvrir le chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xl"
            >
              💬
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification badge */}
      {!isOpen && (
        <div className="fixed bottom-[72px] right-6 z-50">
          <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-dark block animate-pulse" />
        </div>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[360px] sm:w-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-dark-border"
          >
            {/* Header */}
            <div className="bg-dark-card border-b border-dark-border px-4 py-3 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center text-lg">
                  ⏱
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-dark-card" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Conseiller TimeTravel</div>
                <div className="text-green-400 text-xs">En ligne · Répond en quelques secondes</div>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-dark h-80 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gold text-dark font-medium rounded-tr-none'
                        : 'bg-dark-secondary text-gray-200 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions (only if 1 message) */}
            {messages.length === 1 && !isLoading && (
              <div className="bg-dark px-4 pb-2 flex flex-col gap-1.5">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInput(q)
                      setTimeout(() => sendMessage(), 50)
                      setInput(q)
                    }}
                    className="text-left text-xs text-gold border border-gold/30 rounded-full px-3 py-1.5 hover:bg-gold/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="bg-dark-secondary border-t border-dark-border p-3 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez vos questions sur les voyages temporels..."
                disabled={isLoading}
                className="flex-1 bg-dark rounded-full px-4 py-2 text-sm text-white placeholder-gray-600 border border-dark-border focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-gold text-dark flex items-center justify-center hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  )
}
