---
name: ai-native-dark-saas-ui
description: Design and implement premium dark-mode interfaces for AI SaaS, agent platforms, developer tools, open-source communities, skill marketplaces, and creator platforms. Use for AI-native product pages or dashboards that need a minimal, future-facing, developer-first visual system.
---

# AI Native Dark SaaS UI

Design interfaces that feel like software built for the AI era: premium, calm, credible, extensible, and developer-first. Avoid generic marketing-site patterns and ornamental visuals that do not communicate product capability.

## Working approach

Before implementation, identify the product's primary user, its most important action, and the page type. Preserve the existing stack, component conventions, and brand constraints when working in an existing codebase. Do not add packages, 3D scenes, or animation libraries unless the product already uses them or the request calls for them.

Route the request before choosing an output:

- **Design direction**: deliver page structure, components, tokens, motion, and responsive intent; do not create code unless requested.
- **Image prompt**: deliver a self-contained visual prompt with subject, composition, visual system, motion cues, exclusions, and aspect ratio. Read `references/midjourney-prompts.md` for Midjourney requests.
- **UI implementation**: deliver the requested React/UI code plus the design decisions that affect it. Read `references/motionsites.md` only when motion-led sections or animated backgrounds are in scope.

For any substantial page, provide these deliverables before or alongside the implementation:

1. **Page structure** — sections in reading order and each section's job.
2. **Component breakdown** — reusable components and their responsibilities.
3. **Design tokens** — colors, typography, spacing, surfaces, borders, and radii.
4. **Motion plan** — purposeful, restrained interactions and reduced-motion behavior.
5. **React component code** — production-ready components that fit the project's stack.
6. **Responsive plan** — breakpoints and intentional layout changes, not merely shrinkage.

If the user asks only for a design direction, provide the first four items and avoid writing an unnecessary application. Do not turn a visual prompt request into a website implementation.

## Visual direction

Default to dark mode. Use a near-black blue canvas (`#050816`) with deep navy supporting regions (`#0B1120`). Use translucent surfaces at roughly 8–15% opacity, `rgba(255,255,255,0.08)` borders, large whitespace, and quiet depth. Glass effects should preserve legibility; use them for grouped interfaces and floating objects, not every element.

Use electric indigo (`#6366F1`) as the primary signal, AI purple (`#A855F7`) for dimensionality, and cyan (`#22D3EE`) for emphasis. A blue → purple → cyan gradient is reserved for identity, primary moments, and selected highlights. Do not use it on every card or body copy.

Prefer Geist, Inter, SF Pro, or the project's existing modern sans-serif. Use strong hierarchy: hero headings at 72px or larger when space permits, section headings around 40px, and readable 16px body copy. Favor dense-but-breathable product UI over large blocks of promotional prose.

Use 20px-radius glass panels, soft glows, and a hover response around `translateY(-6px)` with a subtle scale increase only on directly interactive cards. Maintain accessible contrast, visible focus states, and targets suitable for touch.

## Page patterns

### Marketplace or product home page

Use this hierarchy unless the product context calls for a different order:

1. **Hero**: value proposition understood within three seconds, a primary and secondary action, and an AI-native visual object. For a skill marketplace, use an oversized headline such as “The Future of AI Skills,” a concise capability statement, and Explore / Create actions.
2. **Featured**: a horizontal rail or compact grid of popular skills, agents, workflows, or projects.
3. **Categories**: a bento grid for meaningful domains such as Agent, Coding, Creative, Business, Video, and Automation.
4. **Community**: creators, contributors, GitHub/open-source credibility, or collaboration evidence.
5. **Footer**: minimal identity and essential links.

The hero's visual object may use layered floating cards for Skill, Agent, Model, and Workflow. Give cards a real interface purpose: status, version, install command, author, workflow progress, or output preview. Use controlled tilt, glow, and slow movement; do not create game-like motion.

### Detail page

Use a GitHub README / Hugging Face model-card information architecture: header with name, author, version and stars; preview; installation; features; files; changelog; and fork or contribution action. Keep install and command interactions copyable and immediately useful.

### AI-native product primitives

Include these only where they serve the product:

- Agent state: Thinking, Running, Completed, and Failed when applicable. State must not rely on color alone.
- Workflow: visible Input → Process → Output progression with a clear current step.
- Commands: familiar copyable terminal-style snippets such as `npm install`, `skill add`, or `git clone`.
- Trust signals: author, provenance, versions, adoption, changelog, and open-source links.

## Component guidance

Favor a small component set with clear ownership. Typical components include `GlassCard`, `SkillCard`, `AgentCard`, `HeroSection`, `SearchBox`, `CategoryCard`, `CreatorCard`, `StatsPanel`, `Timeline`, `ChatPanel`, and `DashboardWidget`. Create only components used by the requested screen; do not scaffold an empty library.

Model data-heavy cards from a consistent anatomy: icon or type, title, concise description, author or provenance, useful stat, and a direct action. Use bento layout to establish hierarchy rather than adding decorative modules.

## Motion

Motion should make hierarchy, state, or spatial relationships clearer. Use slow aurora/gradient background drift, a restrained spotlight, gentle floating objects, card tilt on pointer-capable devices, and text reveal for a hero only when it does not delay comprehension.

Respect `prefers-reduced-motion`: remove continuous drift, parallax, and tilt; retain instantaneous focus and state feedback. Avoid motion that loops rapidly, blocks input, shifts layout, or competes with text.

For motion-led landing pages or individual sections, read [references/motionsites.md](references/motionsites.md). Use it as a source of interaction and section-pattern inspiration, not as a template to reproduce.

## Responsive behavior

Design desktop first where the product is developer-oriented, then make explicit mobile decisions:

- Collapse multi-column hero content into a text-first vertical flow; retain only the most valuable floating visual.
- Turn horizontal rails into touch-scrollable lists with visible affordance.
- Reflow bento grids to one or two columns without making every card the same height.
- Keep primary actions above the fold and terminal commands horizontally scrollable or copyable.
- Reduce display type, panel density, blur, and decorative effects before reducing body-text legibility.

## Quality bar

Before delivering, check that the result reads as an AI product rather than a generic landing page, has one memorable visual anchor, prioritizes the product's primary action, leaves room for future content, and works without hover or motion. For prompts, check that the subject, composition, palette, interaction cues, exclusions, and aspect ratio are explicit. For implementation, verify the project's available build, type-check, lint, or preview workflow and test at desktop and mobile widths.
