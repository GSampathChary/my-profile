# Architecture

## Application Shape

This portfolio is built as a Next.js App Router application with a split experience:

- Explore Mode: a 3D lab rendered with React Three Fiber
- Recruiter Mode: a conventional portfolio layout with readable sections

## Data Flow

All major portfolio content lives in structured data modules:

- `src/data/professional.ts`
- `src/data/experience.ts`
- `src/data/projects.ts`
- `src/data/skills.ts`
- `src/data/education.ts`
- `src/data/portfolio.ts`

UI components read from those files instead of duplicating copy.

## 3D Layer

The 3D scene is kept intentionally lightweight:

- `Room.tsx` composes the scene
- Scene objects are built from primitives
- No external `.glb` assets are required
- Lighting is toggled by the user

## Routing

The app exposes the important recruiter pages directly:

- `/`
- `/projects`
- `/experience`
- `/resume`
- `/professional`

These pages stay available even if the 3D scene is skipped.

## Assistant Design

`src/services/portfolioAssistant.ts` provides a local knowledge-base assistant.

It is deliberately API-free in version 1, so the portfolio is fully functional without external dependencies.

