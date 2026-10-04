# GiziLens frontend showcase

A responsive nutrition product prototype built with Nuxt and Pinia. All application data and interactions run locally in the browser; no backend service, API proxy, credentials, auth cookies, or access tokens are required.

## Run

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 3005
```

Open `http://localhost:3005` for the landing page or `/dashboards` for the workspace. The server remains a normal `npm run dev` process; no systemd service is used.

## Product flows

- Landing page, sign-in, account creation, and logout.
- Overview: daily energy, macros, date navigation, hydration, meals, and a 7-day chart.
- Food journal: search, meal/date filters, create/edit/delete entries, serving quantities, and nutrition totals.
- Insights: 7/30-day summaries, daily nutrition table, and downloadable CSV reports.
- Profile: editable name/email, save/cancel, and account details.
- Settings: nutrition goals, hydration target, kcal/kJ display, and an in-app daily check-in reminder.
- Native modal dialogs support focus containment, Escape, cancellation, and restoration of the opener's focus.
- Phone and tablet navigation uses a fixed bottom bar. Desktop uses a sidebar.

## Local data behavior

Product copy and visual design are intended for client presentations. Implementation details and prototype labels are kept out of the UI.

`data/nutrition.ts` provides the initial profile, a 10-food catalog, and 30 days of meal history. `stores/nutrition.ts` is the source of truth for totals, profile, meals, water, and preferences. Changes are saved in browser localStorage under `gizilens-showcase-v2`, with an in-memory fallback if storage is unavailable.

Sign-in is a local simulation: a valid email and a password of at least 6 characters succeeds. The form is prefilled for Nadia Putri. Account creation validates names/email/password confirmation, saves a local profile, signs in, and opens the workspace. Passwords are never persisted. This is not a production authentication system.

Each water glass represents 250 ml. Stored energy values are kcal; kJ display uses a factor of 4.184. Nutrition totals, summaries, charts, and CSV exports derive from the same meal entries. Daily reminders appear in the overview and do not send browser notifications.

## Validation

```bash
npm run lint
npm exec --yes --package=typescript@5.9.3 --package=vue-tsc@3.3.1 -- vue-tsc --noEmit
npm run generate
```

Use compatible TypeScript/vue-tsc versions as above. When the dev server is running, perform generation in a separate copy to avoid Nuxt's workspace lock. Generated static assets are under `.output/public` and can be served with SPA fallback.

See `SHOWCASE_QA.md` for the current browser, responsiveness, persistence, export, and build checks.
