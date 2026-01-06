'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

// Default auth context value
const defaultAuthValue = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  requestOTP: async () => ({ success: false, message: 'Auth not initialized' }),
  verifyOTP: async () => ({ success: false, message: 'Auth not initialized' }),
  resendOTP: async () => ({ success: false, message: 'Auth not initialized' }),
  updateProfile: async () => ({ success: false, message: 'Auth not initialized' }),
  logout: async () => {},
  getUserInitials: () => '',
  refreshProfile: () => {},
};

// Auth Context
const AuthContext = createContext(defaultAuthValue);

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedToken = localStorage.getItem('auth_token');
        if (savedToken) {
          setToken(savedToken);
          await fetchUserProfile(savedToken);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  // Fetch user profile
  const fetchUserProfile = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      if (data.success && data.data) {
        setUser(data.data);
        setIsAuthenticated(true);
        return data.data;
      }
      throw new Error('Invalid response');
    } catch (error) {
      console.error('Fetch profile error:', error);
      logout();
      return null;
    }
  };

  // Request OTP (Register/Login)
  const requestOTP = async ({ phone, email, name, city, target_course }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          email,
          name,
          city,
          target_course,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to request OTP');
      }

      return {
        success: true,
        message: data.message || 'OTP sent successfully',
        data: data.data,
      };
    } catch (error) {
      console.error('Request OTP error:', error);
      return {
        success: false,
        message: error.message || 'Failed to send OTP',
      };
    }
  };

  // Verify OTP and Login
  const verifyOTP = async ({ phone, email, otp }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'OTP verification failed');
      }

      if (data.success && data.data) {
        const { access_token, user: userData } = data.data;

        // Save token
        localStorage.setItem('auth_token', access_token);
        setToken(access_token);
        setUser(userData);
        setIsAuthenticated(true);

        return {
          success: true,
          message: 'Login successful',
          user: userData,
        };
      }

      throw new Error('Invalid response');
    } catch (error) {
      console.error('Verify OTP error:', error);
      return {
        success: false,
        message: error.message || 'OTP verification failed',
      };
    }
  };

  // Resend OTP
  const resendOTP = async ({ phone, email }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to resend OTP');
      }

      return {
        success: true,
        message: data.message || 'OTP resent successfully',
      };
    } catch (error) {
      console.error('Resend OTP error:', error);
      return {
        success: false,
        message: error.message || 'Failed to resend OTP',
      };
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to update profile');
      }

      if (data.success && data.data) {
        setUser(data.data);
        return {
          success: true,
          message: 'Profile updated successfully',
          user: data.data,
        };
      }

      throw new Error('Invalid response');
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: error.message || 'Failed to update profile',
      };
    }
  };

  // Logout
  const logout = useCallback(async () => {
    try {
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [token]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return '';
    const name = user.profile?.first_name || user.name || user.email || '';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    requestOTP,
    verifyOTP,
    resendOTP,
    updateProfile,
    logout,
    getUserInitials,
    refreshProfile: () => token && fetchUserProfile(token),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
