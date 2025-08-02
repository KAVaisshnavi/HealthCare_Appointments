import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Calendar, LogOut, Heart, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-2 rounded-xl group-hover:scale-105 transition-transform">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                NirogGyan
              </span>
            </Link>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <nav className="hidden md:flex items-center space-x-8">
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                    isActive('/') ? 'text-teal-600' : 'text-gray-700'
                  }`}
                >
                  Find Doctors
                </Link>
                <Link
                  to="/appointments"
                  className={`text-sm font-medium transition-colors hover:text-teal-600 flex items-center space-x-1 ${
                    isActive('/appointments') ? 'text-teal-600' : 'text-gray-700'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>My Appointments</span>
                </Link>
                <Link
                  to="/profile"
                  className={`text-sm font-medium transition-colors hover:text-teal-600 flex items-center space-x-1 ${
                    isActive('/profile') ? 'text-teal-600' : 'text-gray-700'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </nav>
            )}

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <>
                  {/* Desktop User Menu */}
                  <div className="hidden md:flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-8 h-8 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {getInitials(user.name)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {user.name}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isAuthenticated && isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex items-center space-x-3 px-4 py-2">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {user && getInitials(user.name)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <nav className="mt-4 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium transition-colors ${
                    isActive('/') ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  Find Doctors
                </Link>
                <Link
                  to="/appointments"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium transition-colors flex items-center space-x-2 ${
                    isActive('/appointments') ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>My Appointments</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium transition-colors flex items-center space-x-2 ${
                    isActive('/profile') ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-2 rounded-xl">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                NirogGyan
              </span>
            </div>
            <p className="text-sm text-gray-600">
              © 2024 NirogGyan. Your trusted healthcare appointment platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;