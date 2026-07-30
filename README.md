# Desire Dimensions 🔥

A modern, production-ready personality assessment web application for adults. Entertainment-first, data-driven, and fully customizable.

## Overview

**Desire Dimensions** is a Spotify Wrapped-style personality quiz that explores adult preferences, fantasies, and attraction patterns through a humorous, shareable lens. The assessment generates original personality archetypes based on four psychological dimensions.

**This is entertainment.** Not diagnostic, not scientific, not judgmental. Just fun.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/applepie21005-collab/desire-dimensions.git
cd desire-dimensions

# Install dependencies
pnpm install

# Start development servers (runs both frontend and backend)
pnpm dev
```

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite (fast dev server & build)
- Tailwind CSS (responsive styling)
- Framer Motion (smooth animations)
- Shadcn/ui (accessible components)
- Zustand (state management)

### Backend
- Node.js + Express.js with TypeScript
- PostgreSQL (database)
- Prisma (ORM & migrations)
- RESTful API

### DevOps
- Docker & Docker Compose (local development)
- pnpm (package manager)

## Project Structure

```
desire-dimensions/
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── store/           # Zustand stores (quiz state)
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # Helper functions
│   │   ├── types/           # TypeScript types
│   │   └── styles/          # Global styles
│   ├── public/              # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic (scoring engine)
│   │   ├── routes/           # API endpoints
│   │   ├── middleware/       # Express middleware
│   │   ├── types/            # TypeScript interfaces
│   │   ├── utils/            # Helpers
│   │   ├── index.ts          # Server entry point
│   │   └── db.ts             # Prisma client
│   ├── config/
│   │   ├── questions.json    # 50-question quiz
│   │   ├── dimensions.json   # 4 personality dimensions
│   │   ├── archetypes.json   # 16 result archetypes
│   │   └── scoring.json      # Scoring rules
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── migrations/       # Database migrations
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── docker-compose.yml        # Local PostgreSQL
├── .gitignore
├── package.json              # Root workspace config
├── pnpm-workspace.yaml       # pnpm monorepo setup
└── ARCHITECTURE.md           # Detailed design docs
```

## Development Workflow

```bash
# Install all dependencies
pnpm install

# Start both servers with hot reload
pnpm dev

# Frontend: http://localhost:5173
# Backend: http://localhost:3000

# Database: PostgreSQL on localhost:5432
```

## Database Setup

```bash
# Start the database
docker-compose up -d

# Migrate the schema
cd backend && pnpm prisma migrate dev
```

## License

MIT

---

**Built with ❤️ for consenting adults who appreciate humor, design, and a little mystery.**
