# Lavish Grooming

Act as a Principal Full-Stack Engineer and Lead UI/UX Designer. Build a high-end, production-ready, ultra-smooth luxury barbershop and grooming web application titled "Lavish Men's Saloon".

### 1. Visual Aesthetics & Design System
- Theme & Palette: Dark luxury aesthetic featuring deep charcoal/black backdrops (#0d0d0d, #141414), rich warm metallic gold accents (#d4af37, #f3e5ab), and crisp high-contrast text.
- Glassmorphic Styling: Use modern Apple/iOS-style frosted glass cards for containers, floating navigation bars, and modal overlays (`backdrop-filter: blur(12px)`, subtle semi-transparent dark panels `rgba(15, 15, 15, 0.6)`, and fine 1px light borders `rgba(255, 255, 255, 0.1)`).
- Typography & Brand: Modern sans-serif headers paired with clean, readable body text. Incorporate a stylized black/gold tiger icon logo alongside the brand name "LAVISH MEN'S SALOON".
- Light/Dark Mode Toggle: Include a seamless theme toggle in the header. Persist the user's theme choice in `localStorage` so the setting remains unchanged upon page refreshes.

2. Splash Screen / Animated Preloader
- Display a full-screen dark loading overlay on initial page load.
- Feature the central "Lavish Men's Saloon" tiger logo with a subtle ambient pulsing gold glow.
- Include a sleek gold progress bar beneath the logo that fills smoothly over 2.5 seconds.
- After loading, apply a smooth 0.8s opacity fade-out to reveal the main website interface.

3. Mobile-First Responsiveness & Interaction Design
- Micro-Interactions: Smooth dynamic hover effects on desktop using `@media (hover: hover)`. Add tactile press feedback for touchscreens (`transform: scale(0.97)` on click/tap).
- Dynamic Scaling: Ensure layout padding, headers, buttons, grid cards, and images scale dynamically across devices (from 320px mobile screens up to 4K displays).
- Smooth Motion: Enable site-wide smooth scrolling (`scroll-behavior: smooth`) and smooth entrance fade/slide animations for content sections as they scroll into view.

4. Core Features & Layout Structure
- Floating Header: Sticky glassmorphic navbar with brand logo, quick navigation links (Services, About, Booking, Admin), and the Theme Toggle switch.
- Hero Section: High-impact banner with brand tagline ("Refine Your Look. Rejuvenate Your Skin."), CTA buttons ("Book Appointment", "Explore Services"), and luxury ambient imagery.
- Services & Pricing Grid: Categorized interactive cards for haircuts, beard styling, facial treatments, and premium spa packages.
- Appointment Booking Modal: Interactive appointment booking form allowing users to select a service, date, time slot, and enter customer details.
- Mock Admin Portal & Dashboard:
  * Modal/Route accessible via an "Admin" link in the navigation/footer.
  * Login form requiring Username and Password.
  * Authentication state stored in `sessionStorage` (with fallback mock credentials support).
  * Admin Dashboard view displaying mock incoming appointments, service price manager, and a "Change Password" tool that updates local credentials in `localStorage`.

5. Output Expectations
- Provide a complete, fully functional, responsive single-page application structure with clear state management, smooth transition effects, and zero missing placeholders.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fb0e4b65-6676-42f0-93c2-ac27ab6efc7d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
