# AI Coding Agent Instructions

## Project Overview

This is a **Docusaurus 3.9** static site generator for a personal blog/portfolio site hosted on Vercel. The site is built with React 18, showcasing technical documentation (LeetCode solutions), blog posts, experience/education history, and project portfolio.

**Key Tech Stack:**
- Docusaurus 3.9.2 (site generation & docs)
- React 18 + JSX components
- Node.js 18+ required
- Framer Motion (animations)
- React Vertical Timeline (experience section)

## Project Structure

```
/docs/leetcode/          # 80+ LeetCode problem solutions (markdown)
/docs/uvapractice/       # UVA Online Judge solutions
/blog/                   # Blog posts with frontmatter metadata
/src/components/         # React components: HomepageFeatures, Projects, Experience
/src/pages/             # Homepage (index.js) - custom React landing page
/src/helper/            # JSON data files: experience.json, Projects.json, SideProjects.json
/src/css/               # Custom CSS (Infima color overrides only)
docusaurus.config.js    # Main Docusaurus configuration
sidebars.js             # Auto-generated sidebars from /docs directory
```

## Key Patterns & Conventions

### Content Management
- **Docs**: Markdown files in `/docs/` auto-generate sidebar navigation via `sidebars.js`
- **Naming**: Problem solutions use format `leetcode_[problem_number].md` (e.g., `leetcode_1.md`)
- **Frontmatter**: Blog posts use YAML metadata (date, authors, etc.) in `/blog/`
- **Categories**: `_category_.json` files define folder ordering/display names (see `docs/leetcode/_category_.json`)

### React Components
- Custom components in `/src/components/` are imported directly into pages
- Experience & Projects use JSON data files (`/src/helper/*.json`) to populate React components
- Component pattern: data JSON → component renders with mapping (e.g., `Experience` component maps `Experiences` array)
- CSS Modules for component styles (`.module.css` files)

### Styling
- **Global CSS**: Only `/src/css/custom.css` - contains Infima CSS variable overrides (colors only)
- Color scheme: Primary green `#2e8555` (light mode), `#25c2a0` (dark mode)
- **Theme**: Docusaurus classic template with dark mode support via `[data-theme='dark']`
- Use Infima utility classes for layout; custom CSS is minimal

### Build & Development
```bash
npm start         # Start dev server (localhost:3000)
npm run build     # Production build to /build directory
npm run serve     # Serve built site locally
npm run clear     # Clear build cache
npm run write-heading-ids  # Generate heading anchors for docs
```

## Critical Developer Workflows

### Adding Documentation
1. Create `.md` file in `/docs/[category]/` with naming convention
2. For LeetCode solutions: follow `leetcode_1.md` structure (題目說明 → 解題思路 → 參考解法)
3. Run `npm run write-heading-ids` to auto-generate anchor links
4. Sidebar auto-generates; no manual configuration needed unless using `_category_.json`

### Adding Blog Posts
1. Create `.md` or `.mdx` file in `/blog/` with ISO date prefix: `YYYY-MM-DD-title.md`
2. Include YAML frontmatter (see existing posts for format)
3. Set `showReadingTime: true` in docusaurus.config.js shows reading time

### Adding Experience/Projects
1. Update JSON data in `/src/helper/experience.json` or `/src/helper/Projects.json`
2. Components automatically re-render with new data (no code changes needed)
3. Structure: Each object needs `title`, `name`, `icon`, `date` (experience) or `projectTitle`, `projectDescribe`, `tech` (projects)

### Homepage Customization
- Edit `/src/pages/index.js` directly - this is the custom React landing page
- Imports components from `/src/components/` and data from `/src/helper/`
- Uses Docusaurus Layout wrapper for consistent theming

## Important Constraints & Gotchas

- **Node version**: Requires Node 18+ (enforced in package.json `engines` field)
- **I18n**: Default locale is `zh-Hant` (Traditional Chinese); single-language setup
- **Broken links**: `onBrokenLinks: 'throw'` in config means broken doc links cause build failure
- **Markdown links**: Broken markdown links only warn (`onBrokenMarkdownLinks: 'warn'`)
- **Analytics**: Vercel Analytics integrated in homepage via `<Analytics />` component
- **MDX Support**: Blog can use `.mdx` files for embedded React components

## Integration Points

- **Deployment**: Vercel (configured in docusaurus.config.js URL)
- **GitHub**: Link to repo in announcement bar (`docusaurus.config.js` theme config)
- **Code Highlighting**: Prism React Renderer with custom line highlighting CSS
- **External Dependencies**: Framer Motion (animations), React Lazy Load Image, React Tilt (homepage effects)

## Common Tasks for AI Agents

### When modifying documentation structure:
- Always check if changes affect sidebar auto-generation logic
- Run `npm run write-heading-ids` after adding new docs
- Test `npm start` locally to verify sidebar updates

### When updating styling:
- Modify **only** `/src/css/custom.css` for global changes
- Use CSS Modules (`.module.css`) for component-scoped styles
- Reference Infima docs for available utility classes before adding custom CSS

### When adding new pages:
- Create `.js`/`.jsx`/`.mdx` files in `/src/pages/` - auto-converts to routes
- Import Docusaurus Layout, useDocusaurusContext for consistency
- Check `docusaurus.config.js` baseUrl if adding custom routing

### When debugging build failures:
- Check `onBrokenLinks: 'throw'` - most failures are broken internal links
- Verify file naming conventions (especially for leetcode problems)
- Run `npm run clear` to clear build cache before rebuilding
