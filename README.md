# Luma Showroom

Luma Showroom is a polished React storefront for a luxury lighting catalog. It presents table lamps, pendants, chandeliers, wall lights, bulbs, outdoor fixtures, smart lights, and LED strips inside a responsive showroom experience with animated theme lighting, product browsing, cart management, checkout, demo authentication, and an admin product dashboard.

## Highlights

- Interactive light/dark showroom switch with smooth visual transitions
- Product catalog with search, category filters, price filtering, and sorting
- Product detail pages with image crossfade states, quantity controls, specifications, and customer reviews
- Persistent cart powered by browser localStorage
- Demo checkout flow with calculated shipping, tax, and order confirmation
- Demo authentication and registration stored locally in the browser
- Admin dashboard for creating, editing, and deleting catalog products
- Responsive glassmorphism UI built with Tailwind CSS utilities
- Framer Motion and custom cursor/scroll reveal interactions
- Oxlint configuration for fast JavaScript/React linting

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Tailwind CSS 4
- Framer Motion
- Lucide React icons
- Oxlint

## Project Structure

```text
.
├── public/
│   └── products/          # Catalog image assets
├── scripts/
│   └── generate_lighting_products.py
├── src/
│   ├── components/        # Navbar, product cards, image rendering, animation helpers
│   ├── context/           # Theme, cart, auth, and product state providers
│   ├── data/              # Seed product catalog
│   ├── hooks/             # Audio interaction helpers
│   ├── pages/             # Home, catalog, detail, cart, checkout, auth, admin
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Demo Accounts

The app uses browser localStorage for demo authentication.

Admin access:

```text
Email: admin@luma.com
Password: admin123
```

Regular users can register from the auth page. Registered users are stored locally in the same browser.

## Core Routes

- `/` - Home page and featured collections
- `/showroom` - Full catalog with filters and sorting
- `/product/:id` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Demo checkout flow
- `/auth` - Login and registration
- `/admin` - Admin product management

## Data And Persistence

Seed catalog data lives in `src/data/products.json`. Runtime edits from the admin dashboard are persisted to localStorage under the `luma-products-v2` key. Cart state, user sessions, and registered demo users are also stored in localStorage.

To reset the app to seed data during development, clear the browser's localStorage for the local dev origin.

## Notes

- This is a front-end demo application. It does not include a real backend, payment processor, or production authentication.
- Product, cart, checkout, review, and admin actions are simulated locally for showcase and prototyping purposes.
- `node_modules`, build output, logs, and local environment files are intentionally ignored by Git.

## License

This project is available for portfolio, learning, and demonstration use.
