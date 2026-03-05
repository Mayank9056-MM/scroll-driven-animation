# Scroll-Driven Hero Animation 🚗

This project recreates a scroll-driven hero section animation inspired by the reference demo.

```
  https://paraschaturvedi.github.io/car-scroll-animation/
```

## Live Demo

```
  https://scroll-driven-animation-theta.vercel.app/
```

## GitHub Repository

```
  http://github.com/Mayank9056-MM/scroll-driven-animation
```

## Features

- Scroll-driven animation for the hero section
- Smooth car movement based on scroll progress
- Animated statistic cards
- Responsive design
- Smooth UI transitions
- Modern layout using Tailwind CSS

## Tech Stack

- **Next.js (React)**
- **TypeScript**
- **Tailwind CSS**
- **GSAP**

## Project Structure

```
    ├── app
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components
    │   ├── CarScene.tsx
    │   ├── Hero.tsx
    │   └── Stats.tsx
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── next-env.d.ts
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.mjs
    ├── public
    │   └── car.png
    ├── README.md
    └── tsconfig.json

```

## Installation

Clone the repo

```
  https://github.com/Mayank9056-MM/scroll-driven-animation
```

run commands in terminal

```
 npm i && npm run dev
```

## Animation Logic

The animation is divided into steps triggered by scroll input.

- Car moves horizontally across the hero section
- Green band expands as progress increases
- Headline text fades and slides into view
- Statistic cards appear sequentially with GSAP animations

## Author

**Mayank Mahajan**

Full Stack Developer (MERN Stack)

