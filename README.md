# AI Engineer Lab

Interactive 3D portfolio for Gannoju Sampath Chary, built to present an AI engineer profile clearly while still giving visitors a polished, recruiter-friendly experience.

## Profile Summary

- Name: Gannoju Sampath Chary
- Location: Hyderabad, Telangana, India
- Title: AI Engineer | Applied ML | Python Backend | Flutter | FastAPI | Spring Boot
- Experience: 1.10+ years building AI-powered mobile, web, and backend applications
- Current Role: Young Professional - I, ICAR - Indian Institute of Rice Research (IIRR), Hyderabad
- Focus Areas: AI / ML, computer vision, backend engineering, mobile AI applications, production deployment
- Contact: gsampathchary454@gmail.com
- Resume PDF: `public/resume/resume.pdf`

## What This Portfolio Shows

- An AI engineer identity with a strong applied machine learning story
- Professional work on RAISE, the rice crop stress evaluation application
- Professional work on VistaraAI, the PVC interior AI assistant and full-stack platform
- Personal portfolio projects such as InsightBI AI, BharatEye, RiceGPT AI, ResumeAI Pro, Interview Copilot, DataInsight AI, and AutoML Studio
- A recruiter-friendly way to view experience, projects, and contact details
- Structured content that can also power a GitHub profile README

## Featured Work

### RAISE - Rice AI Stress Evaluator

AI-powered agricultural application developed at ICAR - Indian Institute of Rice Research for rice crop stress evaluation.

Technologies: Flutter, Python, FastAPI, Spring Boot, TensorFlow, TensorFlow Lite, PostgreSQL

### VistaraAI - PVC Interior Design Assistant

AI-powered full-stack platform for PVC kitchen cupboards, wardrobes, TV units, and custom interiors.

Technologies: Next.js, TypeScript, React, FastAPI, Python, LangChain, LangGraph, PostgreSQL, Docker

Frontend: https://vistara-ai-pvc-interior-studio-xi.vercel.app/

Backend: https://vistaraai-pvc-interior-studio.onrender.com

### BharatEye

India-focused GeoAI and Earth Observation platform built for satellite intelligence, disaster monitoring, AOI analysis, maritime surveillance, crop stress, and infrastructure risk visualization.

Technologies: React, Vite, FastAPI, Deck.gl, Mapbox GL JS, Zustand, ECharts, WebSocket

Frontend: https://bharat-eye.vercel.app/

Backend: https://bharateye.onrender.com

### InsightBI AI

India-focused business intelligence platform that transforms sales data into Power BI-ready analytics, executive dashboards, customer insights, forecasting, anomaly detection, and AI-assisted analysis.

Technologies: Power BI, DAX, Power Query, PostgreSQL, Python, FastAPI, Pandas, Scikit-learn, Next.js, React, TypeScript, Tailwind CSS, Recharts, Docker

Live demo: https://insight-bi-ai-beta.vercel.app/

### RiceGPT AI

AI-powered conversational assistant focused on rice agriculture and crop-related queries.

Technologies: Python, FastAPI, AI / LLM integration

### ResumeAI Pro

AI-powered resume analysis platform for resume evaluation and improvement recommendations.

Technologies: Python, FastAPI, generative AI

### Interview Copilot AI

AI-powered interview preparation platform designed to help candidates with technical interview practice and response generation.

Technologies: Python, FastAPI, generative AI

### DataInsight AI

AI-assisted data analysis platform for exploring datasets, generating visualizations, and extracting useful insights.

Technologies: Python, FastAPI, data analysis, generative AI

### AutoML Studio

Automated machine learning platform supporting dataset processing, model training, model comparison, and evaluation.

Technologies: Python, FastAPI, scikit-learn, machine learning

## Experience Snapshot

- Developing AI-powered mobile and web applications for agricultural research
- Building production mobile apps in Flutter and web apps in React
- Designing backend services with Spring Boot and FastAPI
- Working with TensorFlow, PyTorch, TFLite, and ONNX Runtime for model integration
- Preparing agricultural datasets through collection, cleaning, annotation, preprocessing, and augmentation
- Designing PostgreSQL schemas and role-based workflows for Farmer, Scientist, and Admin users
- Collaborating with domain experts to validate predictions and improve model quality

## Tech Stack

- Languages: Python, TypeScript, JavaScript, Dart, Java, SQL
- Frontend: Next.js, React, Flutter, Tailwind CSS, HTML5, CSS3
- Backend: FastAPI, Spring Boot, REST APIs, Microservices
- AI / ML: TensorFlow, TensorFlow Lite, Keras, PyTorch, Scikit-learn, OpenCV, LangChain, LangGraph, Gemini, OpenAI, ONNX Runtime, Computer Vision
- Data & BI: PostgreSQL, SQLite, MySQL, Firebase, Power BI, DAX, Power Query
- Tools: Docker, Git, GitHub, Postman, Google Colab, Google Play Console, Docker Compose

## Technology Browser

- The in-app Technologies button now opens an official stack browser with brand logos where available and direct links to the official technology pages.
- VistaraAI is surfaced as the featured top project in the portfolio and includes both live demo and backend links.

## Project Structure

- `src/app` - app router pages and metadata
- `src/components/3d` - scene primitives and camera setup
- `src/components/objects` - clickable room objects
- `src/components/sections` - recruiter-mode and route sections
- `src/components/ui` - overlays and reusable UI
- `src/data` - portfolio content and structured data
- `src/services` - local portfolio assistant logic
- `src/lib` - helpers and links
- `src/types` - shared TypeScript types

## Local Development

```bash
npm install
npm run dev
```

Open the app at `http://localhost:3000`.

## Notes

- This repo does not require external API keys for the current experience.
- The 3D lab has a graceful fallback path for recruiter-friendly browsing.
- If you publish employer-owned work separately, make sure you have permission before uploading source code.

## Future Improvements

- Add richer assistant responses using an LLM provider later
- Replace selected primitives with curated 3D assets
- Add more screenshots and documentation for each project
