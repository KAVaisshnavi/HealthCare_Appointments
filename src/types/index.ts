export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Doctor {
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

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
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

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, email: string) => Promise<boolean>;
  isAuthenticated: boolean;
}