# Troefcall Rulebook

Visual PWA rulebook for Troefcall, a Dutch 4-player trick-taking card game. Built with Vite + React + TypeScript.

## Commands

Node is managed via nvm — run `nvm use 24` first (npm is not on PATH otherwise).

```bash
npm run dev              # dev server → http://localhost:5173
npm run build            # tsc -b && vite build → dist/
npm run preview          # serve dist/ → http://localhost:4173
npm test                 # vitest unit tests (jsdom)
npm run validate-content # replay content examples through the engine
npx playwright test      # e2e tests (requires a prior build)
npm run lint             # oxlint
```

WSL note: the dev/preview server only binds to localhost by default. Pass `-- --host` to expose it on the local network so Windows browsers can reach it.

## Architecture

**Routing** (`src/routes/router.tsx`): a single `createBrowserRouter` tree.
`/` (Home), `/over-ons`, `/regelboek` + 6 topic pages, `/demo/slag-oplossen`
(interactive trick demo), `/woordenboek` + `/woordenboek/:termSlug` (glossary),
`/sancties`, `/toernooistructuur`, `/dev-kitchen-sink` (outside the layout), `*` → `NotFound`.
All routes except `dev-kitchen-sink` render inside `RootLayout`.

**Content model** (`src/content/types.ts`): all rulebook content is pure data.
`RuleTopic` → `RuleExample[]` (simple / twist / full) → `ExampleStep[]`
Step types: `deal`, `declareTrump`, `play`, `resolveTrick`, `callout`, `score`.
Content lives in `src/content/rules/` (one file per topic): `gameOverview`, `setupDealing`,
`trickTaking`, `winningAHand`, `sanctions`, `tournamentStructure` — registered in `src/content/rules/index.ts`.

**Glossary model** (`src/content/glossary-types.ts`): separate from rulebook content.
`GlossaryTerm` (slug/term/category/definition/relatedTerms/relatedRules) and `SanctionRule`.
Data lives in `src/content/glossary/` (`terms.ts`, `sanctions.ts`, `tournamentStructure.ts`),
rendered by `src/routes/glossary/` (`GlossaryIndex`, `SanctionsTable`, `TournamentStructure`).
`GlossaryLink` (`src/components/GlossaryLink.tsx`) is the bidirectional link between glossary
terms and rulebook pages — navigates to `/woordenboek/<slug>`.

**Engine** (`src/engine/trickResolution.ts`): pure functions with no side effects.
Key exports: `rankValue`, `isLegalPlay`, `resolveTrick`, `createDeck`, `dealHand`.
Tested independently from the UI. Reused (not duplicated) by the interactive demo's own
state machine in `src/routes/demo/TrickResolutionDemo.tsx` (`nextSeat`, `createInitialState`,
`getPlayableCards`, `playCard`, `clearAndAdvance`).

**Route pattern**: each rulebook page is `<RuleTopicLayout topic={...} />`.
The layout owns tab switching (simple/twist/full) and step-by-step navigation.

**Seating convention**: N / E / S / W. Clockwise order: N → E → S → W.
The player to the dealer's left (next clockwise) is the caller.
Example: Zuid (S) is dealer → West (W) is caller.

**Component tree** (abbreviated):
```
RootLayout (FeltSurface + TopNav + Footer)
├── Home / OverOns / NotFound
├── RuleTopicLayout
│   ├── ExampleTabs          (simple / twist / full)
│   └── ExampleStepper       (accumulates steps into visual state)
│       ├── TableLayout      (N/E/S/W positions)
│       │   └── PlayerSeat   (Hand or CardBack, Dealer/Caller badges)
│       ├── TrickPile        (center)
│       └── ScoreBadge log
├── TrickResolutionDemo      (freeform interactive trick play)
└── GlossaryIndex / SanctionsTable / TournamentStructure
```

## Testing

**Unit tests** — Vitest, jsdom environment, globals enabled.
- `src/engine/trickResolution.test.ts` — 15 engine tests
- `src/content/rules/validateContent.test.ts` — 20 content/engine cross-checks
  (one per rule-topic example, plus 2 kap/capitulation scoring rules)
- `src/content/glossary/glossary.test.ts` — 8 glossary content-integrity checks
- `src/routes/demo/TrickResolutionDemo.test.ts` — 28 tests for the interactive demo's state machine

After authoring or editing examples, run `npm run validate-content` to confirm every `resolveTrick` step matches the actual engine output.

**E2E tests** — Playwright, Chromium only.
- `e2e/rulebook.spec.ts` — page load, tab switching, step navigation, trump badge, score badges, Dealer/Caller badges.
- `e2e/home-nav.spec.ts` — Home page navigation and top-nav routing.
- `e2e/footer.spec.ts` — footer links (Over ons, feedback mailto).
- `e2e/pwa.spec.ts` — PWA manifest/service worker behavior.
- `e2e/responsive.spec.ts` — responsive layout checks.
- Config: `playwright.config.ts` — baseURL `http://localhost:4173`, webServer auto-starts `npm run preview`.
- Requires a built `dist/` before running. The webServer is `vite preview`, not the dev server.

`e2e/**` is explicitly excluded from Vitest in `vite.config.ts`. Do not remove that exclusion — Vitest will fail importing `@playwright/test` outside the Playwright runner.

## CI/CD

### `ci.yml` — runs on every PR to `main`

| Job | What it does |
|---|---|
| `unit-test` | `npm test` with JUnit reporter → PR comment |
| `validate-content` | `npm run validate-content` with JUnit reporter → PR comment |
| `build` | `npm run build`, uploads `dist/` artifact |
| `e2e` | downloads `dist/`, caches `~/.cache/ms-playwright`, runs Playwright, uploads HTML report |

### `deploy.yml` — runs on merge to `main` (or manually via `workflow_dispatch`)

Builds the app, then FTPs `dist/` to `/public_html/troefcall_rulebook/` on Hetzner via FTPS. Normal push-triggered deploys use the FTP action's default diff-based sync (tracked via a remote state file) — only changed/new files are uploaded and only files removed from `dist/` since the last deploy are deleted remotely. A full destructive clean-slate wipe (`dangerous-clean-slate: true`) is available only via manual `workflow_dispatch` with the `clean_slate` input set to `true`, intended as a drift-recovery tool (e.g. if the remote state file is lost or the server directory was hand-edited outside the pipeline) — it does not run automatically.

Both pipelines use `paths-ignore: ['**/*.md', 'docs/**']` — neither fires on documentation-only changes.

Required repo secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FEEDBACK_EMAIL` (footer feedback `mailto:` address, injected at build time as `VITE_FEEDBACK_EMAIL`; see `.env.example` for local dev).

## Gotchas

- **nvm**: `npm` is not on PATH until you run `nvm use 24`.
- **Playwright needs a build**: the e2e webServer is `vite preview` (port 4173), not the dev server. Run `npm run build` first.
- **Vitest / Playwright separation**: `e2e/**` excluded in `vite.config.ts` — keep it there.
- **Deploy clean-slate is manual-only**: normal push deploys use non-destructive diff sync; a full remote wipe only happens if someone runs `workflow_dispatch` with `clean_slate: true` — treat that as a deliberate drift-recovery action, not routine.
- **PWA icons**: generated via `scripts/generate-icons.mjs` (uses `sharp`). Only woff2 fonts are precached; woff is excluded intentionally.
