# Game Gauntlet (Rebuild)

## Overview

Game Gauntlet is a platform designed to make game nights and tournaments more fun, cohesive, and competitive. It connects multiple games into a single unified experience by layering themes, achievements, powerups, and point systems over any type of game � whether video games, board games, or physical activities.

This repository is a clean rebuild of the original Game Gauntlet, designed for long-term scalability and future SaaS deployment using Supabase and React/Next.js.

## Planned Features

- Multi-game tournament management
- Player and admin roles
- Achievements and powerups system
- Interactive wheels for mini-games or bonuses
- Shop and point-based mechanics
- Event logging and scoring automation
- Customizable themes and templates
- Multi-tenancy support for future SaaS

## Project Structure

- docs/         ? Planning and documentation files
- frontend/     ? React/Next.js frontend code
- backend/      ? API routes or Supabase server functions
- supabase/     ? Database schema and migrations
- design/       ? Wireframes, UI designs, and theme assets
- README.md     ? This file
- .gitignore    ? Ignore node_modules, env files, etc.

## Getting Started

1. Clone the repository:
   git clone https://github.com/jturnip/game-gauntlet.git
   cd game-gauntlet 
2. Set up your Supabase project and connect it to the frontend. 
3. Install dependencies in the frontend/backend as needed. 
4. Start developing Gauntlet features locally.

_Note: The rebuild is in early planning stages. Many features will be implemented progressively, guided by the Phase 1 Vision and Functional Design documents in /docs._

## Documentation

- Phase 1 Vision: docs/Phase_1_Vision.txt
- Future planning documents: /docs/Phase_2_Functional_Design.md, /docs/Phase_3_Data_Architecture.md, etc.

## Long-Term Vision

The ultimate goal is to turn Game Gauntlet into a SaaS platform where admins can:

- Host their own Gauntlets for friends or communities
- Customize themes, games, achievements, powerups, and wheels independently
- Create and share templates for other admins
- Allow players to join events for free while managing data and licenses securely

## License

MIT License (or choose a license later when ready)
