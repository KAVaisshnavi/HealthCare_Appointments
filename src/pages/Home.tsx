import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Calendar, MapPin, Filter } from 'lucide-react';
import { mockDoctors } from '../data/mockData';
import { Doctor } from '../types';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');

  const specializations = Array.from(new Set(mockDoctors.map(doctor => doctor.specialization)));

  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization = !selectedSpecialization || doctor.specialization === selectedSpecialization;
      const matchesAvailability = !selectedAvailability || doctor.availabilityStatus === selectedAvailability;
      
      return matchesSearch && matchesSpecialization && matchesAvailability;
    });
  }, [searchTerm, selectedSpecialization, selectedAvailability]);

  const getAvailabilityColor = (status: Doctor['availabilityStatus']) => {
    switch (status) {
      case 'Available Today':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Fully Booked':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'On Leave':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find & Book Appointments with
              <span className="block text-teal-200">Top Doctors</span>
            </h1>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Connect with experienced healthcare professionals and book appointments that fit your schedule
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Specialization Filter */}
            <div>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">All Availability</option>
                <option value="Available Today">Available Today</option>
                <option value="Fully Booked">Fully Booked</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Available Doctors ({filteredDoctors.length})
          </h2>
          <p className="text-gray-600">Book appointments with our experienced healthcare professionals</p>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Link
                key={doctor.id}
                to={`/doctors/${doctor.id}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100 group"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={doctor.profileImage}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-teal-600 font-medium mb-1">
                        {doctor.specialization}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        {doctor.experience} experience
                      </p>
                      <div className="flex items-center space-x-1 mb-3">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">
                          {doctor.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({doctor.appointmentCount} appointments)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(doctor.availabilityStatus)}`}>
                      {doctor.availabilityStatus}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Next available</span>
                      </div>
                      <div className="text-sm font-medium text-teal-600 group-hover:text-teal-700">
                        {doctor.availabilityStatus === 'Available Today' ? 'Today' : 'View schedule'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;