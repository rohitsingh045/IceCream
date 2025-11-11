import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login Response:', data); // Debug log

      if (!response.ok) {
        console.error('Login failed:', data); // Debug log
        throw new Error(data.message || 'Invalid email or password');
      }

      // Store user data from backend (handle nested data structure)
      const backendUser = data.data?.user || data.user;
      const backendToken = data.data?.token || data.token;

      if (!backendUser || !backendToken) {
        console.error('Invalid response structure:', data); // Debug log
        throw new Error('Invalid response from server');
      }

      const userData = {
        id: backendUser._id || backendUser.id,
        name: backendUser.name,
        email: backendUser.email,
        phone: backendUser.phone,
      };

      console.log('Setting user data:', userData); // Debug log
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', backendToken);
    } catch (error) {
      console.error('Login error:', error); // Debug log
      // Clear any existing user data on failed login
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unable to connect to server. Please check your connection.');
    }
  };

  const signup = async (name: string, email: string, phone: string, password: string) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    // Validate name
    if (!name || name.trim().length < 2) {
      throw new Error('Please enter a valid name (minimum 2 characters)');
    }

    // Validate password
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    try {
      const response = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();
      console.log('Signup Response:', data); // Debug log

      if (!response.ok) {
        console.error('Signup failed:', data); // Debug log
        throw new Error(data.message || 'Registration failed. Email may already be registered.');
      }

      // Store user data from backend (handle nested data structure)
      const backendUser = data.data?.user || data.user;
      const backendToken = data.data?.token || data.token;

      if (!backendUser || !backendToken) {
        console.error('Invalid response structure:', data); // Debug log
        throw new Error('Invalid response from server');
      }

      const userData = {
        id: backendUser._id || backendUser.id,
        name: backendUser.name,
        email: backendUser.email,
        phone: backendUser.phone,
      };

      console.log('Setting user data:', userData); // Debug log
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', backendToken);
    } catch (error) {
      console.error('Signup error:', error); // Debug log
      // Clear any existing user data on failed signup
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unable to connect to server. Please check your connection.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
