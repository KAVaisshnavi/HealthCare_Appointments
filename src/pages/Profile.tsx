import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address')
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    
    try {
      const success = await updateProfile(data.name, data.email);
      
      if (success) {
        showToast('Profile updated successfully!', 'success');
      } else {
        showToast('Failed to update profile. Please try again.', 'error');
      }
    } catch (error) {
      showToast('An error occurred while updating profile.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-8 py-12">
            <div className="text-center">
              <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-teal-600">
                  {user && getInitials(user.name)}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
              <p className="text-teal-100 mt-1">{user?.email}</p>
              <p className="text-teal-200 text-sm mt-2">
                Member since {user && new Date(user.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isDirty || isLoading}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg font-medium hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>

              {!isDirty && (
                <p className="text-sm text-gray-500 text-center">
                  Make changes to your profile information to save updates.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Account Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-teal-100 p-2 rounded-lg">
                <User className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Account Status</p>
                <p className="text-lg font-semibold text-gray-900">Active</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email Status</p>
                <p className="text-lg font-semibold text-gray-900">Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;