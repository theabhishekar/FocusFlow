# FocusFlow

A modern, feature-rich Pomodoro timer and productivity tracker built with React, TypeScript, and Tailwind CSS.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Core Components](#core-components)
- [Styling](#styling)
- [Configuration](#configuration)
- [License](#license)

---

## Overview
FocusFlow is a productivity application designed to help users manage their time and tasks using the Pomodoro technique. It offers advanced features such as task management, session history, statistics, and premium upgrades, all within a beautiful, responsive UI.

## Features
- **Pomodoro Timer**: Customizable focus, short break, and long break sessions.
- **Task Manager**: Organize, add, complete, and delete tasks. Free users can manage up to 10 tasks; premium users have no limit.
- **Statistics Dashboard**: Visualize productivity stats, streaks, and achievements.
- **Session History**: Review past focus sessions, including mood, productivity, and notes.
- **Authentication**: Sign in with email or Google OAuth.
- **Premium Features**: Unlock advanced analytics, unlimited tasks/sessions, data export, AI insights, and more.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.

## Project Structure
```
project/
├── src/
│   ├── App.tsx                # Main application logic and state
│   ├── main.tsx               # React entry point
│   ├── index.css              # Global styles (Tailwind CSS)
│   └── components/            # Reusable UI and logic components
│       ├── Timer.tsx          # Pomodoro timer logic and UI
│       ├── TaskManager.tsx    # Task management interface
│       ├── Statistics.tsx     # Productivity stats and achievements
│       ├── SessionHistory.tsx # Session history and review
│       ├── PremiumFeatures.tsx# Premium feature showcase and plans
│       ├── ...                # Other dialogs, navigation, auth, etc.
├── index.html                 # HTML entry point
├── package.json               # Project metadata and dependencies
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.ts             # Vite build configuration
└── ...
```

## Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd FocusFlow/project
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) to view the app.

## Available Scripts
- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Lint the codebase

## Core Components
### App.tsx
Main application container. Manages global state, user authentication, tab navigation, and orchestrates all major features.

### Timer.tsx
Implements the Pomodoro timer logic, session switching, progress visualization, and session completion callbacks.

### TaskManager.tsx
Task CRUD operations, Pomodoro count per task, and user-based task limits. Premium users have unlimited tasks.

### Statistics.tsx
Displays productivity metrics, streaks, weekly goals, and achievement badges. Teases premium analytics for free users.

### SessionHistory.tsx
Lists recent focus sessions with details on productivity, focus, mood, and notes. Free users see the last 5 sessions; premium users see all.

### PremiumFeatures.tsx
Showcases premium features and pricing plans. Handles upgrade logic and feature comparison.

### Other Components
- **AuthDialog.tsx**: Handles user sign-in/sign-up and Google OAuth.
- **UserMenu.tsx**: User profile, sign-out, and upgrade actions.
- **Navigation.tsx**: Tab navigation for timer, tasks, stats, sessions, and premium.
- **DisclaimerDialog.tsx**: Displays focus session disclaimers.
- **TimerSettings.tsx**: Allows users to customize Pomodoro durations.

## Styling
- **Tailwind CSS**: Utility-first CSS framework with custom color palettes (coral, amber, etc.) and responsive breakpoints.
- **index.css**: Global styles and Tailwind base imports.
- **Custom Animations**: Accordion, fade, slide, and pulse animations defined in `tailwind.config.js`.

## Configuration
- **Vite**: Fast build tool and dev server (`vite.config.ts`).
- **TypeScript**: Static typing for all source files.
- **ESLint**: Linting and code quality (`eslint.config.js`).
- **PostCSS**: Used with Tailwind for CSS processing.

## License
This project is for educational and demonstration purposes. Please contact the author for licensing details if you wish to use it commercially. 
