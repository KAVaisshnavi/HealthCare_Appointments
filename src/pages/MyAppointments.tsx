import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { Appointment } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { mockDoctors } from '../data/mockData';
import RescheduleModal from '../components/RescheduleModal';
import CancelModal from '../components/CancelModal';
import { useToast } from '../hooks/useToast';

const MyAppointments: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const userAppointments = storedAppointments.filter((apt: Appointment) => apt.userId === user.id);
      setAppointments(userAppointments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  }, [user]);

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'Upcoming':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
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

  const getDoctorImage = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor?.profileImage || 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  const getDoctorSpecialization = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    return doctor?.specialization || 'General Medicine';
  };

  const handleReschedule = (appointmentId: string, newDate: string, newTime: string) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, date: newDate, time: newTime }
        : apt
    );
    
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(
      JSON.parse(localStorage.getItem('appointments') || '[]').map((apt: Appointment) =>
        apt.id === appointmentId 
          ? { ...apt, date: newDate, time: newTime }
          : apt
      )
    ));
  };

  const handleCancel = (appointmentId: string) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'Cancelled' as const }
        : apt
    );
    
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(
      JSON.parse(localStorage.getItem('appointments') || '[]').map((apt: Appointment) =>
        apt.id === appointmentId 
          ? { ...apt, status: 'Cancelled' as const }
          : apt
      )
    ));
  };

  const openRescheduleModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsRescheduleModalOpen(true);
  };

  const openCancelModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsCancelModalOpen(true);
  };

  if (appointments.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
            <p className="text-gray-600 mt-2">View and manage your healthcare appointments</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments yet</h3>
            <p className="text-gray-600 mb-6">You haven't booked any appointments. Start by finding a doctor.</p>
            <a
              href="/"
              className="inline-flex items-center bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-700 hover:to-teal-800 transition-colors"
            >
              Find Doctors
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-2">View and manage your healthcare appointments ({appointments.length})</p>
        </div>

        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                    <img
                      src={getDoctorImage(appointment.doctorId)}
                      alt={appointment.doctorName}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {appointment.doctorName}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1">{appointment.status}</span>
                        </span>
                      </div>
                      <p className="text-sm text-teal-600 font-medium mb-1">
                        {getDoctorSpecialization(appointment.doctorId)}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{appointment.patientName}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{appointment.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:items-end space-y-2">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Calendar className="h-5 w-5 text-teal-600" />
                      <span className="font-medium">{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Clock className="h-5 w-5 text-teal-600" />
                      <span className="font-medium">{appointment.time}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Booked on {new Date(appointment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {appointment.status === 'Upcoming' && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => openRescheduleModal(appointment)}
                        className="flex-1 bg-teal-100 text-teal-700 py-2 px-4 rounded-lg font-medium hover:bg-teal-200 transition-colors text-sm flex items-center justify-center space-x-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Reschedule</span>
                      </button>
                      <button 
                        onClick={() => openCancelModal(appointment)}
                        className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg font-medium hover:bg-red-200 transition-colors text-sm flex items-center justify-center space-x-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                )}

                {appointment.status === 'Cancelled' && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-700 text-center">
                        This appointment has been cancelled
                      </p>
                    </div>
                  </div>
                )}

                {appointment.status === 'Completed' && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-200 transition-colors text-sm">
                        Download Report
                      </button>
                      <button className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors text-sm">
                        Reschedule
                      </button>
                      <button className="flex-1 bg-yellow-100 text-yellow-700 py-2 px-4 rounded-lg font-medium hover:bg-yellow-200 transition-colors text-sm">
                        Leave Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedAppointment && (
        <>
          <RescheduleModal
            appointment={selectedAppointment}
            isOpen={isRescheduleModalOpen}
            onClose={() => {
              setIsRescheduleModalOpen(false);
              setSelectedAppointment(null);
            }}
            onReschedule={handleReschedule}
          />
          <CancelModal
            appointment={selectedAppointment}
            isOpen={isCancelModalOpen}
            onClose={() => {
              setIsCancelModalOpen(false);
              setSelectedAppointment(null);
            }}
            onCancel={handleCancel}
          />
        </>
      )}
    </div>
  );
};

export default MyAppointments;