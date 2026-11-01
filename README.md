# StudioSpace

A peer-to-peer marketplace for creative spaces. Hosts list photo studios, sound stages, podcast rooms, music suites and art workshops; filmmakers, photographers, podcasters and musicians discover them, compare transparent hourly pricing and book time slots.

**Live site:** https://studio-space-client-delta.vercel.app

| | |
|---|---|
| Client repository | https://github.com/bappycode/StudioSpace-Client |
| Server repository | https://github.com/bappycode/studio-space-server |
| API | https://studio-space-server-kappa.vercel.app |

## Features

- **Explore and filter studios.** Search by title, equipment or city, filter by category and hourly rate, and sort by newest, rating or price. Filters live in the URL, so any filtered view can be shared or reloaded.
- **Studio details with booking.** A photo carousel, specs, amenities, host details and reviews, with a booking modal that totals the rental cost and deposit as you pick a date and hours.
- **Double-booking prevention.** The server rejects any booking that overlaps an existing Pending or Confirmed slot for the same studio and date, and the reason is shown in a toast.
- **Host tools.** Add a studio with a live preview of its listing card, update it from a pre-filled form, or delete it after a confirmation modal. My Studio Listings shows rate, rating and review totals.
- **My Bookings.** Every request with its status (Pending, Confirmed, Completed, Cancelled), filter tabs, and cancellation for pending bookings.
- **Dashboard.** Upcoming sessions, hours booked, listed studios, average rating and quick actions in one place.
- **Authentication.** Email and password sign-up with password rules, plus Google and GitHub sign-in. Private routes send logged-out visitors to login and return them to the page they wanted; reloading a private route keeps a logged-in user in place.
- **Light and dark theme.** A toggle in the navbar, following the system setting by default.
- **Polished states.** Loading skeletons while studios, bookings and listings load, empty states with next steps, a custom 404 page and an error page with retry.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router, Server Components, Turbopack), React 19, TypeScript |
| UI | Tailwind CSS 4, shadcn/ui on Base UI, Lucide and React Icons, Swiper, Sonner toasts, next-themes |
| Auth | Better Auth with the MongoDB adapter (email/password, Google, GitHub) |
| Backend | Express 5, MongoDB ([server repository](https://github.com/bappycode/studio-space-server)) |
| Hosting | Vercel (client and server), MongoDB Atlas |

## Running locally

Requirements: Node.js 20 or newer, a MongoDB database, and the [StudioSpace server](https://github.com/bappycode/studio-space-server) running locally.

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/bappycode/StudioSpace-Client.git
   cd StudioSpace-Client
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   # Better Auth
   BETTER_AUTH_SECRET=any-long-random-string
   BETTER_AUTH_URL=http://localhost:3000
   MONGO_DB_URI=mongodb+srv://<user>:<password>@<cluster>/

   # OAuth apps (callback: http://localhost:3000/api/auth/callback/google and /github)
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=

   # StudioSpace API, without a trailing slash
   NEXT_PUBLIC_SERVER_URL=http://localhost:5000
   ```

3. Start the development server and open http://localhost:3000:

   ```bash
   npm run dev
   ```

Other scripts: `npm run build` creates a production build, `npm run start` serves it, and `npm run lint` runs ESLint.

## Project structure

```
src/
├── app/                 Routes: home, studios, studio details and edit, add-studio,
│                        my-listings, my-bookings, dashboard, auth, 404 and error pages
├── components/
│   ├── home/            Hero slider and home page sections
│   ├── studios/         Studio card, filters, gallery, booking modal, studio form
│   ├── bookings/        Booking card, status badge, cancel button
│   └── ui/              shadcn/ui components
├── lib/                 API helpers (studios, bookings), auth setup, session guard
└── proxy.ts             Redirects logged-out visitors away from private routes
```
