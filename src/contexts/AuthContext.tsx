import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { mockUsers, mockPasswords } from '../data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const foundUser = mockUsers.find(u => u.email === email);
      const storedPassword = mockPasswords[email];
      
      if (foundUser && storedPassword === password) {
        const token = `mock-jwt-${foundUser.id}-${Date.now()}`;
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(foundUser));
        
        setUser(foundUser);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date().toISOString()
      };

      // In a real app, this would be sent to the backend
      mockUsers.push(newUser);
      mockPasswords[email] = password;

      const token = `mock-jwt-${newUser.id}-${Date.now()}`;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      setUser(newUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const updateProfile = async (name: string, email: string): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const updatedUser = { ...user, name, email };
      
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};