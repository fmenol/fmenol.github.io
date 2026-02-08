# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal academic website for Filippo Menolascina, built with Next.js 16 (App Router) and deployed as a static site to GitHub Pages. The site focuses on cybergenetics research content with interactive 3D visualizations.

## Development Commands

```bash
# Start development server
npm run dev

# Build static site for production (outputs to ./out)
npm run build

# Preview production build
npm start

# Lint codebase
npm run lint
```

## Architecture

### Static Site Generation
- **Output mode**: Static export (`output: 'export'` in next.config.ts)
- **Build artifacts**: Generated in `./out` directory
- **Images**: Unoptimized (required for static export)
- **Deployment**: GitHub Actions workflow deploys to GitHub Pages on push to main

### Content System
- **Blog posts**: MDX files in `src/content/posts/`
- **Post metadata**: Frontmatter with `title`, `date`, `abstract`, `tags`
- **Date format**: Posts are sorted by date (most recent first)
- **Dynamic routes**: `/posts/[slug]` generates static pages for each MDX file

The `src/lib/posts.ts` module handles:
- `getAllPosts()`: Returns sorted post metadata for listing
- `getPostBySlug(slug)`: Fetches individual post with content
- `getAllPostSlugs()`: Used for static path generation
- Date formatting: Custom `formatDateToYYMMDD()` converts to YYMMDD format

### MDX Rendering
- **Library**: next-mdx-remote with RSC (React Server Components)
- **Plugins**:
  - `remark-gfm` for GitHub Flavored Markdown
  - `rehype-pretty-code` with "github-light" theme for syntax highlighting
- **Custom components**: Defined in `src/components/mdx/index.tsx` with custom styling
- **Rendering location**: `src/app/posts/[slug]/page.tsx`

### Visual Components
- **3D rendering**: React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Robotic arm**: 3D STL model at `public/models/robotic-arm.stl` rendered in `RoboticArm3D.tsx`
- **Social links**: SVG icons rendered in `ProfileLinks.tsx` (no external icon libraries)

### Styling
- **Framework**: Tailwind CSS v4
- **Typography**: Fira Code monospace font (loaded via next/font)
- **Theme**: Terminal/paper-like aesthetic with custom colors defined in globals.css
- **Color variables**: Uses CSS custom properties like `--paper`, `--foreground`, `--muted`, `--border`, `--link`

### Site Configuration
Central configuration in `src/lib/constants.ts`:
- `SITE_CONFIG`: Name, title, tagline, description, URL, GitHub handle
- `SOCIAL_LINKS`: Email, Google Scholar, GitHub, X (Twitter), LinkedIn
- `NAV_LINKS`: Navigation menu items (home, about)

## TypeScript Setup
- **Path alias**: `@/*` maps to `./src/*`
- **Target**: ES2017
- **JSX**: react-jsx runtime
- **Strict mode**: Enabled

## Deployment
- **Platform**: GitHub Pages
- **Workflow**: `.github/workflows/deploy.yml`
- **Trigger**: Automatic on push to main or manual workflow dispatch
- **Build process**: Installs dependencies, runs build, uploads `./out` artifact
- **Important file**: `public/.nojekyll` prevents GitHub from processing with Jekyll

## Adding New Content

### Creating a blog post
1. Create new MDX file in `src/content/posts/` (e.g., `my-post.mdx`)
2. Add frontmatter:
   ```yaml
   ---
   title: Post Title
   date: YYYY-MM-DD
   abstract: Brief description for listings and metadata
   tags:
     - tag1
     - tag2
   ---
   ```
3. Write content using MDX (supports custom React components)
4. Post automatically appears in listing, sorted by date

### Modifying site metadata
- Update `SITE_CONFIG` in `src/lib/constants.ts`
- Update `SOCIAL_LINKS` for profile link changes
- Metadata propagates to layout.tsx for SEO tags

## Key Files
- `src/lib/posts.ts`: Content management system
- `src/lib/constants.ts`: Site-wide configuration
- `src/components/mdx/index.tsx`: Custom MDX component styling
- `src/app/posts/[slug]/page.tsx`: Post rendering with static generation
- `next.config.ts`: Static export configuration
