# NirogGyan - Healthcare Appointment Booking Platform

A modern, responsive healthcare appointment booking web application built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure sign-in/sign-up with email and password
- **Doctor Discovery**: Browse and search doctors by name or specialization
- **Advanced Filtering**: Filter doctors by specialization and availability status
- **Doctor Profiles**: Detailed doctor information with ratings, experience, and schedules
- **Appointment Booking**: Easy-to-use booking system with available time slots
- **Appointment Management**: View, reschedule, and cancel appointments with confirmation dialogs
- **Profile Management**: Update personal information and account details

### User Experience
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Modern UI**: Clean, professional healthcare-focused design
- **Real-time Search**: Instant filtering and search results
- **Toast Notifications**: User-friendly feedback for all actions
- **Protected Routes**: Secure access to authenticated features
- **Smooth Animations**: Hover effects and micro-interactions

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **State Management**: React Context API + Local State
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Data Persistence**: localStorage (mock backend)
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── BookingModal.tsx  # Appointment booking modal
│   ├── Layout.tsx        # Main app layout with navigation
│   ├── ProtectedRoute.tsx # Route protection wrapper
│   └── Toast.tsx         # Toast notification component
├── contexts/             # React Context providers
│   └── AuthContext.tsx   # Authentication state management
├── data/                 # Mock data and types
│   └── mockData.ts       # Sample doctors, users, and appointments
├── hooks/                # Custom React hooks
│   └── useToast.tsx      # Toast notification hook
├── pages/                # Page components
│   ├── DoctorProfile.tsx # Individual doctor details and booking
│   ├── Home.tsx          # Doctor listing and search
│   ├── Login.tsx         # User authentication
│   ├── MyAppointments.tsx # User's appointment history
│   ├── Profile.tsx       # User profile management
│   └── Register.tsx      # User registration
├── types/                # TypeScript type definitions
│   └── index.ts          # Application types and interfaces
└── App.tsx               # Main application component
```

## 🎨 Design System

### Color Palette
- **Primary**: Teal (#14B8A6) - Healthcare trust and reliability
- **Secondary**: Blue (#3B82F6) - Professional medical environment
- **Accent**: Orange (#F97316) - Call-to-action elements
- **Success**: Green - Positive confirmations
- **Warning**: Yellow - Important notifications
- **Error**: Red - Error states and alerts

### Typography & Spacing
- **Font System**: System fonts for optimal performance
- **Spacing**: 8px grid system for consistent layouts
- **Responsive Breakpoints**: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

## 🔐 Authentication System

### Demo Accounts
```
Email: john.doe@email.com | Password: password123
Email: jane.smith@email.com | Password: password123
Email: alex.johnson@email.com | Password: password123
```

### Features
- JWT-based session management (mock implementation)
- Password validation with minimum requirements
- Persistent login state with localStorage
- Secure route protection
- User profile management

## 💾 Data Management

### Mock Backend
- **Users**: Pre-populated demo accounts with profile information
- **Doctors**: 6 healthcare professionals across different specializations
- **Appointments**: Dynamic appointment storage in localStorage
- **Real-time Updates**: Immediate state synchronization across components

### Data Models
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profileImage: string;
  bio: string;
  availabilityStatus: 'Available Today' | 'Fully Booked' | 'On Leave';
  schedule: TimeSlot[];
  appointmentCount: number;
  rating: number;
  experience: string;
}

interface Appointment {
  id: string;
  userId: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  email: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  createdAt: string;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd niroglyan-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎯 Key Features Implementation

### Search & Filtering
- Real-time search across doctor names and specializations
- Multi-criteria filtering (specialization, availability)
- Responsive grid layout with loading states

### Appointment Booking
- Modal-based booking interface
- Form validation with Zod schema
- Available time slot selection
- Appointment confirmation and storage
- Reschedule functionality with new date/time selection
- Cancel appointments with confirmation dialog
- Status-based action buttons (Upcoming, Completed, Cancelled)

### User Dashboard
- Comprehensive appointment history
- Interactive status tracking with appropriate actions
- Doctor information with profile images
- Responsive card layouts
- Contextual action buttons based on appointment status

## 🔄 Future Enhancements

### With More Time, I Would Add:
1. **Backend Integration**
   - Node.js/Express API with PostgreSQL
   - Real authentication with JWT refresh tokens
   - Email notifications for appointments
   - File upload for profile pictures

2. **Advanced Features**
   - Calendar integration (Google Calendar, iCal)
   - Video consultation booking
   - Payment processing integration
   - Doctor reviews and ratings system
   - Appointment reminders via SMS/email

3. **Performance Optimizations**
   - React Query for server state management
   - Image optimization and lazy loading
   - Code splitting and lazy route loading
   - Progressive Web App (PWA) capabilities

4. **Enhanced UX/UI**
   - Dark mode support
   - Animation library integration (Framer Motion)
   - Advanced filtering with location-based search
   - Multi-language support (i18n)

5. **Admin Features**
   - Doctor dashboard for managing appointments
   - Analytics and reporting
   - User management system
   - Appointment scheduling tools

## 🧪 Testing Strategy

### Current Implementation
- TypeScript for compile-time error catching
- Zod schema validation for runtime type safety
- ESLint for code quality enforcement

### Future Testing Plan
- Unit tests with Jest and React Testing Library
- Integration tests for user flows
- E2E tests with Playwright or Cypress
- API endpoint testing with Supertest

## 🌟 Challenges Faced & Solutions

### Challenge 1: State Management Complexity
**Problem**: Managing user authentication, doctor data, and appointments across multiple components.
**Solution**: Implemented React Context API with TypeScript for type-safe state management and custom hooks for data access.

### Challenge 2: Responsive Design with Complex Layouts
**Problem**: Creating professional medical interface that works across all device sizes.
**Solution**: Mobile-first approach with Tailwind CSS grid system and careful attention to touch targets and readability.

### Challenge 3: Form Validation and User Experience
**Problem**: Ensuring data integrity while maintaining smooth user experience.
**Solution**: React Hook Form with Zod validation provides real-time feedback without performance overhead.

### Challenge 4: Mock Data Persistence
**Problem**: Simulating backend functionality with localStorage while maintaining data consistency.
**Solution**: Created a structured approach with TypeScript interfaces and localStorage utilities for data management.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is created for demonstration purposes and is not licensed for commercial use.

---

**NirogGyan** - Empowering healthcare access through technology 🏥✨