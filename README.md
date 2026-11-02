# StudioSpace

A peer-to-peer marketplace for creative spaces. Hosts list photo studios, sound stages, podcast rooms, music suites and art workshops; filmmakers, photographers, podcasters and musicians discover them, compare transparent hourly pricing and book time slots.

**Live site:** https://studio-space-client-delta.vercel.app

## Features

- **Explore and filter studios.** Search by title, equipment or city, filter by category and hourly rate, and sort by newest, rating or price. Filters live in the URL, so any filtered view can be shared or reloaded.
- **Studio details with booking.** A photo carousel, specs, amenities, host details and reviews, with a booking modal that totals the cost as you pick a date and hours.
- **Double-booking prevention.** The server rejects any booking that overlaps an existing Pending or Confirmed slot for the same studio and date, and the reason is shown in a toast.
- **Host tools.** Add a studio with image upload and a live preview of its listing card, update it from a pre-filled form, or delete it after a confirmation modal.
- **Wishlist.** Tap the heart on any studio to save it, and find saved studios on the My Wishlist page.
- **Booking requests.** Hosts confirm or cancel requests on their studios, and both sides can see who cancelled a booking.
- **My Bookings with PDF receipts.** Every booking with its status (Pending, Confirmed, Completed, Cancelled), filter tabs, cancellation for pending bookings, and a downloadable PDF receipt for confirmed ones.
- **Secure authentication.** Email and password sign-up with password rules, plus Google and GitHub sign-in. Private pages stay private on reload, and the API accepts changes only with a valid JWT.
- **Light and dark theme.** A toggle in the navbar, following the system setting by default.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| UI | Tailwind CSS 4, shadcn/ui, Lucide and React Icons, Swiper, Sonner, next-themes |
| Auth | Better Auth with the MongoDB adapter and JWT plugin |
| Backend | Express 5, MongoDB, jose (JWT verification) |
| Other | imgbb (image uploads), jsPDF (receipts) |
| Hosting | Vercel, MongoDB Atlas |
