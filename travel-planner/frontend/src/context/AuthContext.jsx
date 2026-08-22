import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Boot check: Only run getMe if a token exists in localStorage
  useEffect(() => {
    const initialToken = localStorage.getItem('token');
    if (initialToken) {
      authService
        .getMe()
        .then((userData) => setUser(userData))
        .catch(() => {
          // Note: The global Axios interceptor also clears token on 401, but we ensure local state cleanup here too
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await authService.login({ email, password });
    localStorage.setItem('token', data.access_token);
    const userData = await authService.getMe();
    setUser(userData);
    return userData;
  };

  const signup = async (name, email, password) => {
    // Sequential execution: Signup returns UserOut, then immediately login to acquire token
    await authService.signup({ name, email, password });
    return await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
