import React, { useEffect, useState } from 'react';
import { Dashboard } from '../components/Dashboard';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'client' | 'professional' | 'visitor' | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as 'client' | 'professional' | 'visitor';
    if (!savedRole || savedRole === 'visitor') {
      navigate('/auth');
    } else {
      setRole(savedRole);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  if (!role) return null;

  return (
    <>
      <Dashboard userRole={role} onLogout={handleLogout} />
      <Footer />
    </>
  );
};

export default DashboardPage;
