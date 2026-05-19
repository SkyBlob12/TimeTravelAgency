# TimeTravel Agency — Webapp Interactive

Webapp pour une agence de voyage temporel fictive de luxe, créée avec IA générative.
Projet pédagogique M1/M2 Digital & IA — Ynov Campus.

## Stack Technique

- **React 18** + **Vite 5** — Frontend moderne et rapide
- **Tailwind CSS 3** — Styling utility-first, thème sombre personnalisé
- **Framer Motion** — Animations fluides et transitions
- **Mistral AI API** — Chatbot conversationnel (modèle `mistral-small-latest`)

## Features

- **Landing page** interactive avec hero section animée (étoiles, anneaux de portail)
- **Navigation** fixe responsive avec effet scroll
- **Section Agence** avec cards et citation
- **Galerie 3 destinations** temporelles avec cards interactives au hover :
  - 🗼 Paris 1889 — Belle Époque (12 500 €)
  - 🦕 Crétacé -65M — Mésozoïque (18 000 €)
  - 🎨 Florence 1504 — Renaissance (15 000 €)
- **Chatbot IA** conversationnel (widget flottant) :
  - Conseils personnalisés sur les destinations
  - FAQ agence et informations tarifaires
  - Questions suggérées pour démarrer
  - Powered by Mistral AI

## IA Utilisées

- **Code** : Claude Code (Anthropic)
- **Chatbot** : Mistral Small via API REST (`mistral-small-latest`)

## Installation

```bash
# Cloner le projet
git clone <repo>
cd TimeTravelAgency

# Installer les dépendances
npm install

# Configurer la clé API Mistral
# Éditez .env et remplacez ta_clé_ici par votre clé
# Obtenez une clé gratuite sur : https://console.mistral.ai
echo "VITE_MISTRAL_API_KEY=votre_clé" > .env

# Lancer en développement
npm run dev
```

## Déploiement

`npm run build` génère un dossier `dist/` contenant les fichiers statiques optimisés (HTML/CSS/JS minifiés). Ce dossier est ce qui doit être mis en ligne — le projet n'a pas de backend, tout tourne côté navigateur.

### Option recommandée : Netlify (drag & drop, gratuit)

1. Lancer le build : `npm run build`
2. Aller sur [netlify.com](https://netlify.com) et se connecter
3. Glisser-déposer le dossier `dist/` dans la zone de dépôt Netlify
4. Une URL publique (`https://xxx.netlify.app`) est générée instantanément

> La clé API Mistral est intégrée dans le JS lors du build — le chatbot fonctionne en production sans configuration supplémentaire.

### Option alternative : Vercel

1. Lancer le build : `npm run build`
2. Aller sur [vercel.com](https://vercel.com), importer le projet depuis GitHub
3. Vercel détecte automatiquement Vite et déploie

## Crédits

- Polices : Google Fonts (Cinzel, Inter)
- Animations : Framer Motion
- API IA : Mistral AI

## Licence

Projet pédagogique — M1/M2 Digital & IA · Ynov Campus 2024
