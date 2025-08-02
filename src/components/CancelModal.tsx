import React, { useState } from 'react';
import { X, AlertTriangle, Calendar, Clock, User } from 'lucide-react';
import { Appointment, Doctor } from '../types';
import { mockDoctors } from '../data/mockData';
import { useToast } from '../hooks/useToast';

interface CancelModalProps {
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
  onCancel: (appointmentId: string) => void;
}

const CancelModal: React.FC<CancelModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onCancel
}) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const doctor = mockDoctors.find(d => d.id === appointment.doctorId);

  const handleCancel = async () => {
    setIsLoading(true);
    
    try {
      onCancel(appointment.id);
      showToast('Appointment cancelled successfully.', 'success');
      onClose();
    } catch (error) {
      showToast('Failed to cancel appointment. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Cancel Appointment</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Appointment Details */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={doctor?.profileImage || 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400'}
                alt={appointment.doctorName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                <p className="text-sm text-teal-600">{doctor?.specialization}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Patient: {appointment.patientName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{appointment.time}</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800 mb-1">
                  Are you sure you want to cancel this appointment?
                </h4>
                <p className="text-sm text-red-700">
                  This action cannot be undone. You'll need to book a new appointment if you change your mind.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Keep Appointment
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Cancelling...' : 'Cancel Appointment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;