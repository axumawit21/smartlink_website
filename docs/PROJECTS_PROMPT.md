# Prompt used to build the Projects section

Build ONLY the Projects section (`<section id="projects">`) of the SmartLink website (Vite + React + TS + Tailwind + GSAP). Do not touch the hero, header or Services.
Goal: make visitors (banks, government, hospitals, universities, NGOs) feel the scale and quality of delivered work within 10 seconds.
Use ONLY facts and photos from the company profile PDF. Do not invent clients, numbers or dates. Label design renders as renders.
1. Header (eyebrow, H2, one-line intro). 2. Stats strip with 4 count-up numbers (180+ branches, 113 weredas, 270 access points, 150+ cameras), each with its source client.
3. Sector filter pills (All, Healthcare, Education, Public sector, Banking, Industry & NGO) with counts; cards re-animate on change.
4. Card grid: photo cards (hover zoom, sector badge, system chips colored by pillar: security blue, safety orange, communication mint), a wide featured card, and text cards with a big metric on a blueprint header for projects without photos.
5. Clicking a card opens an accessible modal (native dialog: Esc, focus trap, backdrop click) with the large photo, summary, status note and systems delivered, plus a Get a Quote button.
6. Mobile: single column, horizontal scrolling filters, first 6 cards then "Show all N projects" (aria-expanded). Images lazy-loaded with width/height to avoid layout shift. Respect prefers-reduced-motion. Cards carry data-gaze so the hero camera can "watch" them.
Data lives in `src/config/projects.ts`; photos in `public/projects/`.
