# Scope decision: online shareable "rooms" (issue #64)

## Assumption

**Assumption:** this decision is being made without a maintainer's live sign-off. Issue #64
explicitly asked for a maintainer decision before any breakdown into sub-issues. This document
makes that call anyway, in order to unblock the request, and should be treated as a
recommendation for a human maintainer to confirm, amend, or overrule — not as a final,
already-approved plan. If the maintainer disagrees, close this PR/doc without merging and reopen
#64 for further discussion.

## Decision

**Pursue it, as a distinct "Play online" section/route inside this repo — not as a separate
service.** Build it incrementally, following the path the issue itself already sketches:
1. extend the existing pure trick-resolution engine into a full single-hand game-state reducer,
2. add a minimal realtime layer purely for state sync,
3. add room creation/join UI reusing the existing PWA/routing setup.

### Why in-repo, and why this order

- **Game logic in one place.** `src/engine/trickResolution.ts` already contains the core rules
  (dealing, legal-play checks, trick resolution) as small pure functions with no framework or
  transport coupling. A separate multiplayer service would either reimplement these rules
  server-side (duplication, drift risk between rulebook examples and the "real" game) or import
  this repo as a dependency (extra release/versioning overhead) — worse than just extending the
  engine in place.
- **No backend needed to de-risk the game logic first.** Step 1 (engine → reducer) is pure
  TypeScript, testable exactly like `trickResolution.test.ts` already is today, and delivers value
  (a real single-hand game loop) even if the realtime work never lands.
- **Hosting stays cheap and static-adjacent.** The current deploy is a static FTPS build with zero
  backend. A PartyKit-style realtime layer (or an equivalently small managed WebSocket relay) adds
  a thin sync layer without requiring a database, auth system, or long-lived server process to
  maintain — keeping the operational footprint close to what this repo has today, rather than
  standing up general backend infrastructure.
- **UI reuse.** Routing (`src/routes/router.tsx`), the existing `TableLayout`/`PlayerSeat`/`Hand`
  table components, and the PWA shell are already built for a 4-seat card table and can be reused
  directly for a live room view instead of the current single-browser free-play demo.

### Why not a separate service / not "no" outright

A separate service was considered and rejected for now: it would duplicate the rules engine (or
force a dependency relationship this small static-site repo isn't set up for), add a second
deploy/release pipeline, and doesn't buy anything the in-repo incremental path doesn't already get
— PartyKit-class realtime backends can be added to a Vite/React static app without turning it into
a traditional server-hosted app. Revisit this if the game-state reducer or realtime layer grows
complex enough to need its own release cadence, independent of the rulebook content.

## Proposed sub-issues

These are scoped to be fileable as-is. Each should reference and be linked bidirectionally with
#64 ("Part of #64" / back-link from #64).

### 1. Extend trick-resolution engine into a full single-hand game-state reducer

Turn `src/engine/trickResolution.ts` from a set of standalone pure functions into a single
game-state reducer (`applyAction(state, action) -> state`) that models one full hand: dealing via
the existing `dealHand`, turn order enforcement, legal-play checks via `isLegalPlay`, trick
resolution via `resolveTrick`, and running score. No UI or networking changes — this is a pure
logic/test-only change, verifiable the same way `trickResolution.test.ts` already verifies the
current functions. De-risks the hardest part (correct game rules) before any realtime work starts.

### 2. Introduce a minimal realtime sync layer (spike + integration)

Evaluate and integrate a small realtime transport (PartyKit is the leading candidate given its
Cloudflare-Workers-adjacent, low-ops hosting model that pairs well with a static frontend;
alternatives — Supabase Realtime, Firebase, or a bare WebSocket relay — should be compared on
hosting cost and ops burden) whose only job is to broadcast reducer actions from #1 between
connected clients and keep them in sync. Game rules stay authoritative in the shared client-side
reducer; the realtime layer does not reimplement rules. Deliverable: a working proof-of-concept
where two browser tabs stay in sync for one full hand, plus a documented hosting/cost decision.

### 3. Room lifecycle: code generation, join, disconnect/reconnect, spectators

Design and implement the room session model on top of the realtime layer from #2: room-code
generation, joining by code/link, seat assignment for up to 4 players, spectator mode for extra
joiners, and disconnect/reconnect handling (a dropped player should be able to rejoin the same
room/seat without losing hand state). This is the piece with the most product/UX decisions
(how long rooms live, what happens if a player never reconnects, etc.) and should get its own
lightweight design note before implementation.

### 4. "Play online" UI and routes

Add room creation/join UI and new routes (e.g. `/spelen`, `/spelen/:roomCode`) under
`src/routes/router.tsx`, reusing existing table components (`TableLayout`, `PlayerSeat`, `Hand`,
`TrickPile`) and the PWA shell. Treat this as a new top-level section distinct from the rulebook
content and demo (`/regelboek/*`, `/demo/*`), with its own nav entry. Depends on #1–#3 being far
enough along to have a real reducer and connected room to render against.

## Non-goals for this pass

- No account system / persistent user identity beyond a session-scoped room membership.
- No spectator chat, replays, or tournament features layered onto online rooms in the first pass.
- No decision here on whether online rooms eventually need their own subdomain/route namespace
  beyond what's proposed in sub-issue #4 — revisit once the feature has real usage data.
