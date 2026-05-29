import React, { useEffect, useState } from 'react';
import { Dashboard } from '../components/Dashboard';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/supabaseClientService';
import { User } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    
    // Fallback role check in case of legacy local state
    const savedRole = localStorage.getItem('userRole');
    
    if (!user && (!savedRole || savedRole === 'visitor')) {
      navigate('/auth');
    } else if (user) {
      setCurrentUser(user);
    } else if (savedRole) {
      // Re-construct a container user if login persisted the role but not the full object
      const reconstructedUser: User = {
        id: 'legacy_user',
        name: savedRole === 'professional' ? 'Darcy Carriel' : 'Cliente Oportuniza',
        email: savedRole === 'professional' ? 'darcy@oportuniza.org' : 'cliente@oportuniza.org',
        role: savedRole as 'client' | 'professional',
        location: 'Capela do Alto - SP'
      };
      setCurrentUser(reconstructedUser);
    }
  }, [navigate]);

  const handleLogout = async () => {
    await authService.signOut();
    navigate('/');
  };

  if (!currentUser) return null;

  return (
    <>
      <Dashboard userRole={currentUser.role} onLogout={handleLogout} />
      <Footer />
    </>
  );
};

export default DashboardPage;
