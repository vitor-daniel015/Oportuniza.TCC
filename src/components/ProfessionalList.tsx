import React from 'react';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { Professional } from '../types';
import { motion } from 'motion/react';
import { calculateMatchingScore, verifyRating } from '../services/userService';

export const ProfessionalCard: React.FC<{ professional: Professional }> = ({ professional }) => {
  const matchScore = calculateMatchingScore('Capela do Alto', professional);
  const verification = verifyRating(professional.rating, 48); // Using 48 as simulated service count

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all border border-gray-100 flex items-start gap-5"
    >
      <div className="relative shrink-0">
        <img 
            src={professional.imageUrl} 
            alt={professional.name} 
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
        />
        {verification.isVerified && (
            <div className="absolute -bottom-2 right-0 bg-brand-blue-depth text-white p-1 rounded-full border-2 border-white shadow-sm" title={verification.label}>
                <CheckCircle size={16} fill="currentColor" className="text-white" />
            </div>
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
            <h3 className="text-xl font-bold text-text-title flex items-center gap-2">
                {professional.name}
            </h3>
            <div className="bg-brand-green-sprout/20 text-brand-green-sprout text-[10px] font-black px-2 py-1 rounded-md uppercase">
                {matchScore}% Match
            </div>
        </div>
        
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={18} 
              className={i < Math.floor(professional.rating) ? "fill-brand-blue-depth text-brand-blue-depth" : "text-gray-300"} 
            />
          ))}
        </div>

        <p className="text-sm text-text-secondary leading-relaxed mb-1">
          {professional.description}
        </p>
        <p className="text-xs text-text-secondary">
          localização e reputação
        </p>
      </div>
    </motion.div>
  );
};

export const ProfessionalList: React.FC<{ professionals: Professional[] }> = ({ professionals }) => {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-title mb-4">Profissionais em Destaque</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Encontre os profissionais mais bem avaliados da sua região para realizar seus projetos com segurança.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {professionals.map((prof) => (
            <ProfessionalCard key={prof.id} professional={prof} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-brand-blue-depth text-white px-12 py-4 rounded-full font-bold shadow-lg hover:bg-[#153a5c] transition-all">
            Mostrar mais
          </button>
        </div>
      </div>
    </section>
  );
};
