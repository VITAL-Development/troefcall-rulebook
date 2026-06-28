# Troefcall Regelboek

An interactive visual rulebook and PWA for **Troefcall**, a Dutch 4-player / 2-team trick-taking card game. Step through illustrated examples, see the table layout, and learn the rules at your own pace.

## Live site

Deployed to Hetzner on every merge to `main`. Accessible at `/public_html/troefcall_rulebook/` on the configured server.

## About

Troefcall is played by two teams of two (Noord/Zuid vs Oost/West). One player calls trump before the full deal, tricks are played clockwise, and points accumulate across hands. This rulebook covers setup & dealing, trick-taking, and hand-winning rules — each with three progressively complex worked examples.

## Getting started

Requires **Node.js 22**. If you use nvm:

```bash
nvm use 22
npm install
npm run dev        # → http://localhost:5173
```

WSL users: add `-- --host` to expose the server on your local network so Windows browsers can reach it.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server with HMR on port 5173 |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Serve `dist/` locally on port 4173 |
| `npm test` | Vitest unit tests (jsdom) |
| `npm run validate-content` | Cross-check rule examples against the engine |
| `npx playwright test` | End-to-end tests (requires a prior build) |
| `npm run lint` | Oxlint static analysis |

## Project structure

```
src/
├── content/
│   ├── types.ts            # RuleTopic, RuleExample, ExampleStep types
│   └── rules/              # Rule content (setupDealing, trickTaking, winningAHand)
├── engine/
│   └── trickResolution.ts  # Pure game logic: rankValue, isLegalPlay, resolveTrick
├── routes/
│   ├── rulebook/           # SetupDealing, TrickTaking, WinningAHand pages
│   ├── glossary/
│   └── demo/
└── components/
    ├── cards/              # PlayingCard, Hand, TrickPile, SuitIcon
    ├── table/              # TableLayout, PlayerSeat, FeltSurface
    ├── examples/           # ExampleTabs, ExampleStepper
    └── ui/                 # WoodPanel, ScoreBadge, Tag

e2e/                        # Playwright end-to-end tests
```

## Testing

```bash
# Unit tests (engine logic)
npm test

# Content validation — replays every example through the engine
# Run this after editing anything in src/content/rules/
npm run validate-content

# End-to-end tests — needs a build first
npm run build
npx playwright test
```

Vitest and Playwright are kept separate: `e2e/` is excluded from Vitest's glob. Playwright's webServer runs `vite preview` (port 4173), not the dev server.

## CI/CD

Pull requests against `main` run four jobs: **unit-test**, **validate-content**, **build**, and **e2e** (Playwright, with cached Chromium). Each posts a JUnit test-result comment on the PR.

Merging to `main` triggers a deploy to Hetzner via FTPS. Both pipelines skip automatically when only documentation files change.

Required repository secrets for deploy: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.

## Contributing

1. Branch off `main`, make your changes, open a PR.
2. All four CI jobs must pass before merging.
3. After editing rule content, run `npm run validate-content` locally before pushing.
