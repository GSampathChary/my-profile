# AI Engineer Lab

Interactive 3D portfolio for **Gannoju Sampath Chary**, built as a modern AI engineer workspace with a recruiter-friendly fallback mode.

The goal of this project is simple: let a visitor explore a premium 3D lab, but never hide the professional information behind the experience.

## Overview

This portfolio showcases:

- AI and full stack development experience
- Professional project: **RAISE - Rice AI Stress Evaluator**
- Personal AI project concepts
- Recruiter-friendly resume, experience, and contact routes
- A local portfolio assistant powered by structured data

## Resume Snapshot

- **Name:** Gannoju Sampath Chary
- **Location:** Hyderabad, Telangana, India
- **Headline:** AI & Full Stack Developer | Python | Flutter | Spring Boot | FastAPI | TensorFlow | Computer Vision
- **Experience:** 1.8+ years building AI-powered mobile, web, and backend applications
- **Current Role:** Young Professional - I, ICAR - Indian Institute of Rice Research (IIRR), Hyderabad
- **Current Work:** AI-powered agricultural research apps, dataset preparation, model integration, production deployments, and cross-functional validation
- **Education:** B.Tech in Computer Science Engineering, Gurunanak Institutions Technical Campus, Hyderabad
- **Core Stack:** Python, Dart, Java, JavaScript, SQL, Flutter, Next.js, React, Spring Boot, FastAPI, TensorFlow, PyTorch, PostgreSQL, Docker
- **Contact:** `gsampathchary454@gmail.com`
- **Resume PDF:** [`public/resume/resume.pdf`](public/resume/resume.pdf)

## Features

- Interactive 3D AI engineer lab
- Explore Mode and Recruiter Mode
- Door-based navigation for Projects, Experience, and Resume
- Light switch interaction for the lab ambience
- Computer interaction with a control panel overlay
- Bookshelf interaction for tech exploration
- RAISE tablet interaction for the professional project
- Dedicated routes:
  - `/`
  - `/projects`
  - `/experience`
  - `/resume`
  - `/professional`
- WebGL fallback with graceful recruiter mode
- Accessible keyboard-friendly UI
- Responsive layout for desktop and mobile
- SEO metadata, robots, and sitemap

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber
- @react-three/drei
- Framer Motion
- Lucide React

## 3D Architecture

The main lab scene is rendered from:

- `src/components/3d/Room.tsx`
- `src/components/3d/Floor.tsx`
- `src/components/3d/Walls.tsx`
- `src/components/3d/Ceiling.tsx`
- `src/components/3d/Lighting.tsx`
- `src/components/3d/Camera.tsx`
- `src/components/3d/Environment.tsx`

The scene uses simple primitives, so it works even without external `.glb` files.

## Folder Structure

- `src/app` - app router pages and metadata
- `src/components/3d` - scene primitives and camera setup
- `src/components/objects` - clickable room objects
- `src/components/sections` - recruiter-mode and route sections
- `src/components/ui` - overlays and reusable UI
- `src/data` - portfolio content and structured data
- `src/services` - local portfolio assistant logic
- `src/lib` - helpers and links
- `src/types` - shared TypeScript types

## Interactions

- Click the lamp/switch to power the lab
- Click the computer to open the AI Engineer OS panel
- Click the three doors to move into route pages
- Click bookshelf items to inspect technology topics
- Click the RAISE device to inspect the professional project

## Local Development

```bash
npm install
npm run dev
```

Open the local app at `http://localhost:3000`.

## Environment Variables

This version does not require external API keys.

Future AI integrations can be added later without changing the portfolio structure.

## Deployment

- Push to GitHub
- Deploy to Vercel
- Verify the static routes and 3D mode in production

## Performance

- Dynamic import for the 3D scene
- Small primitive-based geometry
- No heavy external assets
- Static routes for the professional sections
- Graceful fallback when WebGL is unavailable

## Mobile Support

- Responsive layout
- Recruiter Mode for non-3D exploration
- Touch-friendly overlays and navigation
- Reduced-motion support

## Screenshots

Add screenshots to the `screenshots/` folder as the final UI is polished.

## Future Improvements

- Add a polished resume PDF
- Replace selected primitives with curated GLB assets
- Add subtle ambient sound with mute/unmute controls
- Add richer assistant responses using an LLM provider later
