import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import axiosInstance from '../api/axiosInstance';

type AuthContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem('accessToken') || ''
  );

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
      localStorage.setItem('accessToken', token);
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
      localStorage.removeItem('accessToken');
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
