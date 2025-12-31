# DataAware - Frontend

> A privacy education platform helping users understand mobile app data collection, tracking mechanisms, and the economic value of personal data.
> [Live](https://data-aware.netlify.app/)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Overview

DataAware is a Master's research project designed to bridge the gap between academic privacy research and public understanding of mobile app data collection practices. The platform provides interactive educational content covering:

- **App Categories**: How different types of apps (Social Media, Navigation, E-commerce, etc.) collect data
- **Privacy Guide**: Comprehensive reference for Android permissions, tracking SDKs, and device sensors
- **Privacy Economics**: Economic valuation of personal data types
- **Interactive Scenarios**: Step-by-step walkthroughs demonstrating data collection chains
- **Guided Learning**: Structured learning journey with pre/post assessments

## Features

### Core Features
- **10+ App Categories** with detailed permission, tracker, and sensor breakdowns
- **Searchable Privacy Reference** covering permissions, trackers, and sensors
- **Economic Valuations** showing the monetary worth of different data types
- **Interactive Scenarios** including privacy simulator and timeline visualizations
- **Guided Learning Journey** with 6 structured modules and knowledge assessments
- **Risk Scoring** with visual indicators (High/Medium/Low)

### User Experience
- Fully responsive design (mobile, tablet, desktop)
- Clean, minimalist interface optimized for readability
- WCAG 2.1 AA accessibility compliance
- Progressive web app capabilities
- Privacy-first: no tracking, no cookies, no analytics

## Tech Stack

### Core Technologies
- **React 19.1** - UI library with hooks and functional components
- **TypeScript 5.9** - Type-safe development
- **Vite 5.0** - Fast build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework

### Key Libraries
- **React Router 6** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Icon library
- **Axios** - HTTP client for API requests

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript ESLint** - TypeScript-specific linting

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or yarn 1.22.x
- Backend API running (see backend repository)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/dataaware-frontend.git
cd dataaware-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```
Edit `.env` with your configuration (see [Environment Variables](#environment-variables))

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Quick Start with Backend

Ensure the backend API is running at `http://localhost:3000` or update the `VITE_API_URL` in your `.env` file.

## Project Structure

```
dataaware-frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, icons
│   ├── components/     # React components
│   ├── pages/
│   │   ├── About.tsx
│   │   ├── Categories.tsx
│   │   ├── Footer.tsx
│   │   ├── GuidedLearning.tsx
│   │   ├── Header.tsx
│   │   ├── Home.tsx
│   │   ├── PrivacyEconomics.tsx
│   │   ├── PrivacyGuide.tsx
│   │   ├── Scenarios.tsx
│   │   └── ...
│   ├── context/        # React context providers
│   │   └── SessionTrackingContext.tsx
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md
```

## Key Components

### Pages
- **Home** - Landing page with overview and navigation
- **Categories** - Searchable list of app categories with risk indicators
- **PrivacyGuide** - Tabbed interface for permissions, trackers, and sensors
- **PrivacyEconomics** - Data valuation calculator and market insights
- **Scenarios** - Interactive walkthroughs, simulator, and timeline
- **GuidedLearning** - Structured learning with assessments
- **About** - Project overview and methodology

### Shared Components
- **Header** - Navigation with dropdown menus
- **Footer** - Links and copyright information
- **SessionTrackingContext** - Centralized state management for user session

## Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Optional: Analytics (if enabled)
# VITE_ANALYTICS_ID=your_analytics_id

# Optional: Feature Flags
# VITE_ENABLE_RESEARCH_MODE=false
```

### Variable Descriptions
- `VITE_API_URL` - Backend API base URL (required)
- Note: All Vite environment variables must be prefixed with `VITE_`

## Available Scripts

```bash
# Development
npm run dev          # Start development server on http://localhost:5173
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler checks

# Testing (if configured)
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
```

## Build Configuration

### Vite Configuration Highlights
- TypeScript support with hot module replacement
- Path aliases for cleaner imports
- Optimized bundle splitting
- Asset optimization and compression

### Browser Support
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Modern mobile browsers

## Styling

### Tailwind CSS
The project uses Tailwind CSS for styling with a custom configuration:

- **Color Palette**: Blue primary (#2563EB), semantic colors for risk levels
- **Typography**: Sans-serif system font stack for universal compatibility
- **Responsive Breakpoints**: Mobile-first approach (sm: 640px, md: 768px, lg: 1024px)

### Custom Styles
Global styles and CSS variables are defined in `src/index.css`

## Data Flow

```
User Interface (React)
    ↓
API Calls (Axios)
    ↓
Backend API (Express)
    ↓
PostgreSQL Database
```

Data is fetched from the backend API and cached in React state. Session tracking uses React Context for centralized state management.

## Privacy & Security

- **No Analytics**: The platform does not use tracking analytics
- **No Cookies**: No cookies are set by the application
- **Local Storage**: Only used for session persistence (no PII stored)
- **HTTPS Only**: Production deployment enforces HTTPS
- **No External Dependencies**: Minimal third-party scripts

## Known Issues & Limitations

- Assessment data collection is handled externally via surveys for ethical compliance
- Some features require JavaScript enabled
- Optimal experience on modern browsers (last 2 versions)

## Contributing

This is a Master's research project. If you'd like to contribute or have suggestions:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Manoj Shrestha**  

## Acknowledgments

- Academic research on mobile privacy and data collection
- Open-source community for excellent tools and libraries
- Research participants for valuable feedback

## Contact & Support

For questions, issues, or feedback:
- Open an issue in the repository
- Contact via the platform's About page

---

**Note**: This is a research project for academic purposes. Data collection follows institutional ethical guidelines with proper consent procedures.
