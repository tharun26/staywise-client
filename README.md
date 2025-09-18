# StayWise Client

[🌐 View the Live App](https://staywise-client-production.up.railway.app/)

StayWise is a modern Airbnb-like web application for booking and hosting stays. This repository contains the client-side code, built with React, Vite, and Tailwind CSS, providing a seamless experience for guests and hosts.

<p align="center">
   <img src="./documentation/staywise-demo.gif" alt="StayWise Demo" width="100%" />
</p>

## Features

- **User Authentication:** Sign up, log in, and manage sessions securely.
- **Property Listings:** Browse, search, and view detailed listings with images, amenities, and interactive maps.
- **Favorites:** Mark and manage your favorite properties.
- **Bookings:** Book stays, view your bookings, and leave reviews.
- **Host Dashboard:** Switch to host mode to manage your own listings and bookings.
- **Responsive UI:** Built with Tailwind CSS and shadcn/ui for a modern, mobile-friendly interface.
- **Interactive Map:** View property locations using Leaflet and React-Leaflet.
- **Review System:** Leave and manage reviews for your stays.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/karunya10/staywise-client.git
   cd staywise-client
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Copy the `.env` file if not present.
   - Set `VITE_API_URL` to your backend API endpoint (see `.env` for example).
4. **Run the development server:**
   ```sh
   npm run dev
   ```
5. **Open in your browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (default Vite port).

### Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run preview` – Preview the production build
- `npm run lint` – Run ESLint for code quality

## Tech Stack

- **React** – UI library
- **Vite** – Fast build tool
- **Tailwind CSS** – Utility-first CSS framework
- **shadcn/ui** – UI components
- **React Router** – Routing
- **React Query** – Data fetching and caching
- **Axios** – HTTP client
- **Leaflet & React-Leaflet** – Maps
- **Lucide Icons** – Icon library
- **Sonner** – Notifications

## Project Structure

```
/(root)
├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components (by route)
│   └── services/          # API service modules
├── .env                   # Environment variables
├── package.json           # Project metadata and scripts
└── vite.config.js         # Vite configuration
```

## Environment Variables

- `VITE_API_URL` – The base URL for the backend API (see `.env` file).

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.
