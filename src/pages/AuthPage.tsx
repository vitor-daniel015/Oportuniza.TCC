import React from 'react';
import { Auth } from '../components/Auth';
import { useNavigate } from 'react-router-dom';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = (role: string) => {
    // In a real app we'd save the user session here
    localStorage.setItem('userRole', role);
    navigate('/dashboard');
  };

  return (
    <Auth 
      onBack={() => navigate('/')} 
      onSuccess={handleSuccess}
    />
  );
};

export default AuthPage;
