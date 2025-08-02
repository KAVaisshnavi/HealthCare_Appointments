import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Star, Calendar, Clock, MapPin, Award, Users } from 'lucide-react';
import { mockDoctors } from '../data/mockData';
import { Doctor } from '../types';
import BookingModal from '../components/BookingModal';

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const doctor = mockDoctors.find(d => d.id === id);

  if (!doctor) {
    return <Navigate to="/" replace />;
  }

  const getAvailabilityColor = (status: Doctor['availabilityStatus']) => {
    switch (status) {
      case 'Available Today':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Fully Booked':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'On Leave':
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const availableSlots = doctor.schedule.filter(slot => slot.available);
  const bookedSlots = doctor.schedule.filter(slot => !slot.available);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Doctor Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
              <img
                src={doctor.profileImage}
                alt={doctor.name}
                className="w-32 h-32 rounded-2xl object-cover flex-shrink-0 mx-auto md:mx-0"
              />
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                <p className="text-xl text-teal-600 font-semibold mb-4">{doctor.specialization}</p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{doctor.rating}</span>
                    <span className="text-gray-600">rating</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Users className="h-5 w-5" />
                    <span>{doctor.appointmentCount.toLocaleString()} patients</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Award className="h-5 w-5" />
                    <span>{doctor.experience}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getAvailabilityColor(doctor.availabilityStatus)}`}>
                    {doctor.availabilityStatus}
                  </span>
                </div>

                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  disabled={doctor.availabilityStatus !== 'Available Today'}
                  className="w-full md:w-auto bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {doctor.availabilityStatus === 'Available Today' ? 'Book Appointment' : 'Not Available'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Dr. {doctor.name.split(' ').pop()}</h2>
              <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Experience</p>
                    <p className="text-sm text-gray-600">{doctor.experience}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Patients Treated</p>
                    <p className="text-sm text-gray-600">{doctor.appointmentCount.toLocaleString()}+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-teal-600" />
              Today's Schedule
            </h2>
            
            {availableSlots.length > 0 ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-2">Available Slots</p>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot, index) => (
                      <div
                        key={index}
                        className="bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded-lg text-center text-sm font-medium"
                      >
                        {slot.time}
                      </div>
                    ))}
                  </div>
                </div>
                
                {bookedSlots.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-red-700 mb-2">Booked Slots</p>
                    <div className="grid grid-cols-2 gap-2">
                      {bookedSlots.map((slot, index) => (
                        <div
                          key={index}
                          className="bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-lg text-center text-sm font-medium"
                        >
                          {slot.time}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">No available slots today</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal
          doctor={doctor}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DoctorProfile;