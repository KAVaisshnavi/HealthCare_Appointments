import { Doctor, User, Appointment } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@email.com',
    name: 'John Doe',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    email: 'jane.smith@email.com',
    name: 'Jane Smith',
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    email: 'alex.johnson@email.com',
    name: 'Alex Johnson',
    createdAt: '2024-02-01T09:15:00Z'
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    profileImage: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Board-certified cardiologist with over 15 years of experience in treating heart conditions and preventive cardiology.',
    availabilityStatus: 'Available Today',
    appointmentCount: 1247,
    rating: 4.9,
    experience: '15+ years',
    schedule: [
      { time: '09:00 AM', available: true },
      { time: '10:00 AM', available: true },
      { time: '11:00 AM', available: false },
      { time: '02:00 PM', available: true },
      { time: '03:00 PM', available: true },
      { time: '04:00 PM', available: false }
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    profileImage: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Specialized dermatologist focusing on skin health, cosmetic procedures, and dermatological surgery.',
    availabilityStatus: 'Available Today',
    appointmentCount: 892,
    rating: 4.8,
    experience: '12+ years',
    schedule: [
      { time: '08:00 AM', available: true },
      { time: '09:00 AM', available: false },
      { time: '10:00 AM', available: true },
      { time: '01:00 PM', available: true },
      { time: '02:00 PM', available: true },
      { time: '05:00 PM', available: true }
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    profileImage: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Compassionate pediatrician dedicated to providing comprehensive healthcare for children from birth to adolescence.',
    availabilityStatus: 'Fully Booked',
    appointmentCount: 2156,
    rating: 4.9,
    experience: '18+ years',
    schedule: [
      { time: '09:00 AM', available: false },
      { time: '10:00 AM', available: false },
      { time: '11:00 AM', available: false },
      { time: '02:00 PM', available: false },
      { time: '03:00 PM', available: false },
      { time: '04:00 PM', available: false }
    ]
  },
  {
    id: '4',
    name: 'Dr. David Kumar',
    specialization: 'Orthopedic Surgeon',
    profileImage: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Expert orthopedic surgeon specializing in joint replacement, sports medicine, and trauma surgery.',
    availabilityStatus: 'Available Today',
    appointmentCount: 1678,
    rating: 4.7,
    experience: '20+ years',
    schedule: [
      { time: '08:00 AM', available: true },
      { time: '09:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: false },
      { time: '03:00 PM', available: true },
      { time: '04:00 PM', available: true }
    ]
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    specialization: 'Neurologist',
    profileImage: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Experienced neurologist specializing in brain and nervous system disorders, including epilepsy and migraines.',
    availabilityStatus: 'On Leave',
    appointmentCount: 934,
    rating: 4.8,
    experience: '14+ years',
    schedule: [
      { time: '09:00 AM', available: false },
      { time: '10:00 AM', available: false },
      { time: '11:00 AM', available: false },
      { time: '02:00 PM', available: false },
      { time: '03:00 PM', available: false },
      { time: '04:00 PM', available: false }
    ]
  },
  {
    id: '6',
    name: 'Dr. Robert Wilson',
    specialization: 'General Physician',
    profileImage: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Primary care physician providing comprehensive healthcare services for adults and families.',
    availabilityStatus: 'Available Today',
    appointmentCount: 2341,
    rating: 4.6,
    experience: '22+ years',
    schedule: [
      { time: '08:00 AM', available: true },
      { time: '09:00 AM', available: true },
      { time: '10:00 AM', available: false },
      { time: '01:00 PM', available: true },
      { time: '02:00 PM', available: true },
      { time: '05:00 PM', available: true }
    ]
  }
];

export const mockPasswords: Record<string, string> = {
  'john.doe@email.com': 'password123',
  'jane.smith@email.com': 'password123',
  'alex.johnson@email.com': 'password123'
};