import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Calendar, Clock } from 'lucide-react';
import { Appointment, Doctor } from '../types';
import { mockDoctors } from '../data/mockData';
import { useToast } from '../hooks/useToast';

const rescheduleSchema = z.object({
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time slot')
});

type RescheduleFormData = z.infer<typeof rescheduleSchema>;

interface RescheduleModalProps {
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
  onReschedule: (appointmentId: string, newDate: string, newTime: string) => void;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onReschedule
}) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
  const availableSlots = doctor?.schedule.filter(slot => slot.available) || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RescheduleFormData>({
    resolver: zodResolver(rescheduleSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      time: ''
    }
  });

  const onSubmit = async (data: RescheduleFormData) => {
    setIsLoading(true);
    
    try {
      onReschedule(appointment.id, data.date, data.time);
      showToast('Appointment rescheduled successfully!', 'success');
      reset();
      onClose();
    } catch (error) {
      showToast('Failed to reschedule appointment. Please try again.', 'error');
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
          <h2 className="text-xl font-bold text-gray-900">Reschedule Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Current Appointment Info */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <img
              src={doctor?.profileImage || 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400'}
              alt={appointment.doctorName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
              <p className="text-sm text-teal-600">{doctor?.specialization}</p>
              <p className="text-sm text-gray-600">
                Current: {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
              </p>
            </div>
          </div>
        </div>

        {/* Reschedule Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              New Date
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
            {availableSlots.length > 0 ? (
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
                      className="sr-only peer"
                    />
                    <span className="text-sm font-medium text-gray-700">{slot.time}</span>
                    <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-teal-500 peer-checked:bg-teal-50"></div>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No available slots for this doctor</p>
              </div>
            )}
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
              disabled={isLoading || availableSlots.length === 0}
              className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg font-medium hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? 'Rescheduling...' : 'Reschedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RescheduleModal;