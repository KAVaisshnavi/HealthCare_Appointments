import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Calendar, Clock, User } from 'lucide-react';
import { Doctor, Appointment } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

const bookingSchema = z.object({
  patientName: z.string().min(2, 'Patient name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time slot')
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ doctor, isOpen, onClose }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      patientName: user?.name || '',
      email: user?.email || '',
      date: new Date().toISOString().split('T')[0],
      time: ''
    }
  });

  const availableSlots = doctor.schedule.filter(slot => slot.available);

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    
    try {
      // Create new appointment
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        userId: user?.id || '',
        doctorId: doctor.id,
        doctorName: doctor.name,
        patientName: data.patientName,
        email: data.email,
        date: data.date,
        time: data.time,
        status: 'Upcoming',
        createdAt: new Date().toISOString()
      };

      // Get existing appointments
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      
      // Add new appointment
      const updatedAppointments = [...existingAppointments, newAppointment];
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

      showToast('Appointment booked successfully!', 'success');
      reset();
      onClose();
    } catch (error) {
      showToast('Failed to book appointment. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Doctor Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src={doctor.profileImage}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-sm text-teal-600">{doctor.specialization}</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-2" />
              Patient Name
            </label>
            <input
              {...register('patientName')}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter patient name"
            />
            {errors.patientName && (
              <p className="mt-1 text-sm text-red-600">{errors.patientName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Preferred Date
            </label>
            <input
              {...register('date')}
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="h-4 w-4 inline mr-2" />
              Available Time Slots
            </label>
            <div className="grid grid-cols-2 gap-3">
              {availableSlots.map((slot, index) => (
                <label
                  key={index}
                  className="relative flex items-center justify-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 transition-colors"
                >
                  <input
                    {...register('time')}
                    type="radio"
                    value={slot.time}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-gray-700">{slot.time}</span>
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-teal-500 peer-checked:bg-teal-50"></div>
                </label>
              ))}
            </div>
            {errors.time && (
              <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
            )}
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg font-medium hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;