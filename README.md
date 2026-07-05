# Luxury Hotel Guest Portal

A premium guest services portal designed for luxury hotels, providing an elegant and intuitive interface for guests to access hotel services, manage requests, and communicate with hotel staff.

## Features

- **Room Service**: Order food and beverages directly to your suite
- **Laundry Services**: Request laundry and pressing services with real-time tracking
- **Housekeeping**: Schedule room cleaning and maintenance requests
- **Restaurant Reservations**: Book tables at hotel restaurants
- **Spa & Wellness**: Reserve spa treatments and wellness sessions
- **Transportation**: Request taxi and transportation services
- **Maintenance**: Report room issues and request repairs
- **Concierge Services**: Access reception and concierge assistance
- **Billing**: View and manage room charges and billing details
- **Activity Booking**: Reserve hotel activities and events
- **Special Offers**: Access exclusive hotel promotions and packages
- **Emergency Services**: Quick access to emergency contacts and support

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite 6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Express.js (for API integration)

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd guest-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
guest-portal/
├── src/
│   ├── components/       # Reusable React components
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── types.ts         # TypeScript type definitions
│   ├── data.ts          # Sample data and constants
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## Customization

### Branding

- Replace the logo in `public/logo.jpg` with your hotel logo
- Update hotel name and branding in `src/App.tsx`
- Modify color schemes in `src/index.css` and Tailwind configuration

### Services

Add or modify hotel services by editing component files in `src/components/` and updating the service configuration in `src/data.ts`.

### API Integration

Connect to your hotel management system by modifying the API endpoints in the respective service components.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the Apache 2.0 License.

## Support

For support and inquiries, please contact the development team or open an issue in the repository.
