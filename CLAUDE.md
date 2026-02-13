# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start development server (uses Turbopack)
- `npm run build` — Production build
- `npm run lint` — Run ESLint

## Stack

- Next.js 16 with App Router
- React 19
- Tailwind CSS 4
- TypeScript 5

## Architecture

This is a simple single-page Valentine's Day invitation app using Next.js App Router.

- `app/layout.tsx` — Root layout with Geist font configuration and metadata
- `app/page.tsx` — Main page component
- `app/globals.css` — Tailwind imports and CSS variables for light/dark theming

Path alias `@/*` maps to the project root.
