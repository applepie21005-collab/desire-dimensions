# Architecture Documentation

## Project Overview

Desire Dimensions is a full-stack personality assessment web application built with modern technologies and clean architecture principles.

## Core Design Principles

### 1. Data-Driven Architecture

All content is stored in JSON configuration files:
- **questions.json**: 50 quiz questions with dimension scoring
- **dimensions.json**: The 4 personality dimensions
- **archetypes.json**: 16 personality archetypes
- **scoring.json**: Rules for mapping scores to archetypes

**Why?** This allows:
- Non-technical team members to edit content
- Easy A/B testing of different questionnaires
- Framework replacement without code rewrite
- Version control of content changes

### 2. Clean Architecture Layers

```
Presentation (UI Components)
    ↓
State Management (Zustand)
    ↓
API Layer (HTTP Requests)
    ↓
Routes (Express)
    ↓
Controllers (Request Handling)
    ↓
Services (Business Logic)
    ↓
Data Access (Prisma/Database)
```

Each layer has a single responsibility and clear interfaces.

### 3. Type Safety

Full TypeScript across the stack:
- Compile-time error detection
- IDE autocomplete and documentation
- Self-documenting code through types
- Frontend and backend share type definitions

## Frontend Architecture

### Technology Stack
- **React 18**: Component-based UI
- **TypeScript**: Type safety
- **Vite**: Ultra-fast dev server and build
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Zustand**: Lightweight state management
- **Shadcn/ui**: Accessible component library

### Folder Structure

```
frontend/src/
├── components/
│   ├── Quiz/
│   │   ├── QuestionCard.tsx
│   │   ├── ProgressBar.tsx
│   │   └── AnswerButton.tsx
│   ├── Results/
│   │   ├── ResultCard.tsx
│   │   ├── DimensionChart.tsx
│   │   └── ShareButton.tsx
│   ├── Layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── Common/
│       ├── Button.tsx
│       └── Modal.tsx
├── pages/
│   ├── Home.tsx
│   ├── Quiz.tsx
│   └── Results.tsx
├── store/
│   ├── quizStore.ts         # Zustand store for quiz state
│   └── themeStore.ts        # Dark mode, theme state
├── hooks/
│   ├── useQuiz.ts
│   └── useApi.ts
├── types/
│   ├── quiz.ts
│   ├── archetypes.ts
│   └── api.ts
├── utils/
│   ├── api.ts               # API client
│   ├── calculations.ts      # Scoring helpers
│   └── formatting.ts        # Display helpers
├── styles/
│   ├── globals.css
│   └── animations.css
└── App.tsx
```

### State Management (Zustand)

```typescript
// Store structure
const useQuizStore = create((set) => ({
  // State
  answers: {},
  currentQuestion: 0,
  isLoading: false,
  result: null,

  // Actions
  setAnswer: (questionId, answerId) => set(...),
  nextQuestion: () => set(...),
  submitQuiz: async () => set(...),
}));
```

**Why Zustand?**
- Lightweight (no Redux boilerplate)
- Simple API (feels like useState)
- Good DevTools support
- Perfect for quiz state management

### Component Hierarchy

```
App
├── Home
│   └── StartButton
├── Quiz
│   ├── ProgressBar
│   ├── QuestionCard
│   │   ├── QuestionText
│   │   └── AnswerButton (×4)
│   └── NavigationButtons
└── Results
    ├── ResultCard
    │   ├── ArchetypeName
    │   ├── ArchetypeDescription
    │   ├── DimensionChart
    │   ├── Strengths
    │   ├── Weaknesses
    │   └── ShareButton
    └── RestartButton
```

## Backend Architecture

### Technology Stack
- **Node.js + Express.js**: API server
- **TypeScript**: Type safety
- **Prisma**: ORM and database abstraction
- **PostgreSQL**: Relational database
- **Zod**: Runtime validation

### Folder Structure

```
backend/src/
├── controllers/
│   ├── quizController.ts    # GET /api/questions
│   ├── scoreController.ts   # POST /api/score
│   └── archetypeController.ts # GET /api/archetype/:id
├── services/
│   ├── quizService.ts       # Load questions
│   ├── scoringService.ts    # Scoring engine
│   └── archetypeService.ts  # Archetype logic
├── routes/
│   ├── quiz.ts
│   ├── score.ts
│   ├── archetype.ts
│   └── index.ts             # Route aggregation
├── middleware/
│   ├── errorHandler.ts
│   ├── cors.ts
│   └── logging.ts
├── types/
│   ├── quiz.ts
│   ├── scoring.ts
│   └── api.ts
├── utils/
│   ├── logger.ts
│   ├── validation.ts
│   └── calculations.ts
├── config/
│   ├── questions.json
│   ├── dimensions.json
│   ├── archetypes.json
│   └── scoring.json
├── db.ts                    # Prisma client
└── index.ts                 # Server entry point
```

### API Request Flow

```
HTTP Request
    ↓
Route Handler
    ↓
Middleware (validation, CORS, logging)
    ↓
Controller (parse request)
    ↓
Service (business logic)
    ↓
Prisma (database query)
    ↓
HTTP Response (JSON)
```

### Scoring Engine

The scoring service is the heart of the application:

```typescript
interface ScoringResult {
  dimensionScores: Record<string, number>;      // Final scores per dimension
  archetypeId: string;                           // Matched archetype
  confidence: number;                            // 0-100% match confidence
}

function scoreAnswers(answers: UserAnswers): ScoringResult {
  // 1. Load all answers with their dimension scores
  // 2. Sum dimensions across all answered questions
  // 3. Normalize to -3 to +3 range
  // 4. Match to archetype using 2D grid
  // 5. Return result with archetype details
}
```

## Data Flow

### Quiz Taking

```
1. User loads frontend
   ↓
2. Frontend requests GET /api/questions
   ↓
3. Backend loads questions.json, returns to frontend
   ↓
4. Frontend displays questions, stores answers in Zustand
   ↓
5. User submits quiz
   ↓
6. Frontend sends POST /api/score with answers
   ↓
7. Backend scoring engine calculates result
   ↓
8. Backend returns archetype + dimension scores
   ↓
9. Frontend displays beautiful results card
   ↓
10. User shares result (optionally saves to database)
```

## Configuration Files

### questions.json

```json
{
  "questions": [
    {
      "id": 1,
      "category": "spontaneity",
      "text": "Question text here?",
      "options": [
        {
          "id": "a",
          "text": "Option A",
          "dimension_scores": {
            "spontaneity": -3,
            "intensity": 0,
            "cerebral": 1,
            "exhibitionist": 0
          }
        }
      ]
    }
  ]
}
```

### dimensions.json

```json
{
  "dimensions": [
    {
      "id": "spontaneity",
      "name": "Spontaneity ↔ Ritual",
      "description": "...",
      "low_label": "Ritual",
      "high_label": "Spontaneity",
      "min": -3,
      "max": 3
    }
  ]
}
```

### archetypes.json

```json
{
  "archetypes": [
    {
      "id": "wildfire",
      "name": "The Wildfire",
      "emoji": "🔥",
      "summary": "You're chaos with a heartbeat...",
      "description": "Full description...",
      "dimensions": {
        "spontaneity": 3,
        "intensity": 3,
        "cerebral": 0,
        "exhibitionist": 1
      },
      "strengths": [...],
      "weaknesses": [...],
      "observations": [...],
      "compatible_with": [...],
      "challenged_by": [...],
      "shareCard": {...}
    }
  ]
}
```

### scoring.json

```json
{
  "rules": {
    "method": "grid_2d",
    "x_axis": "spontaneity",
    "y_axis": "intensity",
    "ranges": {
      "high": { "min": 1, "max": 3 },
      "medium": { "min": -1, "max": 1 },
      "low": { "min": -3, "max": -1 }
    }
  }
}
```

## Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
  results   Result[]
}

model Result {
  id             String   @id @default(cuid())
  userId         String
  user           User     @relation(fields: [userId], references: [id])
  archetypeId    String
  dimensionScores Json
  answers        Json
  sharedToken    String?  @unique
  isPublic       Boolean  @default(false)
  createdAt      DateTime @default(now())
}
```

## Error Handling

### Frontend
- User-friendly error messages
- Graceful fallbacks
- Loading states
- Retry logic for failed requests

### Backend
- Structured error responses
- Validation at entry points
- Logging with context
- HTTP status codes

## Performance Considerations

### Frontend
- Code splitting with React.lazy()
- Image optimization
- CSS-in-JS for minimal bundle size
- Zustand for efficient state updates
- Framer Motion GPU-accelerated animations

### Backend
- Config files cached in memory on startup
- Scoring calculations in-memory (no DB query needed)
- Connection pooling with Prisma
- Response compression (gzip)

## Security

- CORS configuration (whitelist origins)
- Input validation with Zod
- SQL injection prevention (Prisma parameterized queries)
- XSS prevention (React's built-in escaping)
- HTTPS in production
- Rate limiting (optional)

## Testing Strategy

### Frontend
- Component tests (Vitest + React Testing Library)
- Integration tests (user workflows)
- E2E tests (Playwright)

### Backend
- Unit tests (Vitest)
- Integration tests (API endpoints)
- Scoring engine tests (accuracy verification)

## Deployment

### Development
```bash
docker-compose up -d  # Start PostgreSQL
pnpm dev              # Run frontend + backend
```

### Production
- Dockerfile for both services
- GitHub Actions for CI/CD
- Deploy to Railway, Vercel, AWS, or similar
- Environment variables per environment

## Future Scalability

This architecture supports:
- User accounts and authentication
- Result history and trending
- Leaderboards and competitions
- Social sharing integrations
- Analytics and metrics
- A/B testing multiple questionnaires
- Mobile app (React Native)
- Internationalization (i18n)
