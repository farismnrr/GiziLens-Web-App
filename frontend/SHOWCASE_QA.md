# GiziLens showcase validation

Validated on 4 October 2026 against the running frontend at `http://localhost:3005` in Chrome.

## Browser flows

| Flow | Evidence | Result |
| --- | --- | --- |
| Landing and navigation | Landing, workspace CTA, desktop sidebar, mobile navigation, profile and settings routes are reachable. | Pass |
| Registration | Empty fields show validation; mismatched confirmation is rejected; valid registration opens the workspace with the entered first name. | Pass |
| Login | Invalid email and short password show errors; password visibility toggle works; Enter submits the form. | Pass |
| Session | Registered profile remains after reload; visiting login while signed in returns to the workspace; logout returns to login. | Pass |
| Meal creation | Add salmon dinner with 1.5 servings: daily energy changes from 1,040 to 1,730 kcal and protein from 65 to 117.5 g. | Pass |
| Meal editing | Change the same dinner to 1 serving: daily energy becomes 1,500 kcal; the edited entry survives reload. | Pass |
| Meal deletion | Confirmation removes the test dinner; totals return to 1,040 kcal and 65 g protein. | Pass |
| Journal filters | Dinner filtering isolates the meal; an unmatched search shows an empty state; clearing filters restores the list. | Pass |
| Date navigation | Previous day displays the correct meals and 1,330 kcal; next day returns to today; future navigation is disabled. | Pass |
| Hydration | Adding a glass persists after reload; decrement returns to the original five glasses. | Pass |
| Reports | 7/30-day switches update metrics, charts and row count; the 30-day view has 30 daily rows. | Pass |
| CSV export | Downloaded 30-day CSV contains a header plus 30 data rows; today's exported energy is 1,040 kcal, matching the UI. | Pass |
| Profile | Updated surname survives reload; saving updates the displayed profile; presentation profile restored to Nadia Putri. | Pass |
| Preferences | 2,200 kcal goal, kJ display and disabled reminder survive reload; overview shows 4,351 kJ intake and 9,205 kJ goal. Presentation settings restored to 2,000 kcal, kcal display, reminder enabled. | Pass |
| Dialog keyboard | Escape closes the native meal dialog and returns focus to the Add a meal button. | Pass |
| Unknown route | Styled 404 screen appears; the recovery button returns to the workspace. Expected Nuxt 404 diagnostics are produced for this deliberate invalid-route test. | Pass |

## Responsive and presentation checks

All eight routes were tested at CSS viewport widths of approximately 320, 769, and 1,440 px (content widths vary with the browser scrollbar):

- `/`
- `/login`
- `/register`
- `/dashboards`
- `/dashboards/journal`
- `/dashboards/reports`
- `/dashboards/profile`
- `/dashboards/settings`

All 24 checks passed: document scroll width equals client width, no broken image resources, and no rendered demo/dummy/sample-data/prototype labels. An additional phone check covered the meal editor, journal, insights, profile, and settings at a roughly 488 px viewport. Screenshots were visually inspected for landing, auth, overview, journal, insights, profile, settings, and meal entry dialogs. The reports table intentionally scrolls inside its own container on narrow screens.

## Code and build

- `npm run lint`: pass.
- `git diff --check`: pass.
- `vue-tsc --noEmit` with TypeScript 5.9.3 and vue-tsc 3.3.1: pass.
- `npm run generate`: pass in an isolated copy while the port-3005 dev server remained running; output includes static SPA entry points and the PWA service worker.
- Store verification: totals, fractional servings, create/edit/delete, water bounds, kcal/kJ conversion, profile/preferences persistence, and invalid-storage fallback all passed.
- Source and compiled-output scans contain no former auth/user API endpoints, backend URL credentials, or legacy backend/image domains.
- Application changes are confined to the frontend; cover artifacts are in the root `showcase/` folder. No backend service was started and no systemd service was created. Commit and push were subsequently authorized by the user.

## Operational state

The presentation opens with Nadia Putri, a 2,000 kcal goal, three meals totaling 1,040 kcal, and five glasses of water. The temporary dinner used for create/edit/delete testing has been removed. The frontend remains running through the existing normal `npm run dev -- --host 0.0.0.0 --port 3005` background process.

This report describes a browser-local prototype. Authentication and food nutrition values remain local simulation/fixtures; that implementation detail is documented here and in the README, rather than exposed in product copy.

## Brand update

The G/lens/leaf mark was verified in the desktop dashboard, mobile dashboard, landing header/footer, and reverse auth branding. Landing and registration were checked at a 320 px CSS viewport with no horizontal overflow. The favicon/PWA asset is now square; primary, reverse and monochrome SVG lockups use outlined text and contain no raster images or font dependencies. The desktop/mobile screenshots in the cover were recaptured after the update. The exported cover remains 1920 × 1080, with a native 1:1 HTML preview. ESLint and staged diff checks passed.
