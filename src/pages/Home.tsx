import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { SearchBar } from '../components/SearchBar';
import { ProfessionalList } from '../components/ProfessionalList';
import { Features, HowItWorks } from '../components/Features';
import { Footer } from '../components/Footer';
import { mockProfessionals } from '../mockData';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAuthClick={() => navigate('/auth')} />
      <main className="flex-grow">
        <Hero />
        <SearchBar />
        <Features />
        <HowItWorks />
        <ProfessionalList professionals={mockProfessionals.slice(0, 3)} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
