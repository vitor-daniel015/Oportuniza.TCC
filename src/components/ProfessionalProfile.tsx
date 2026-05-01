import React from 'react';
import { Mail, Phone, MapPin, Star, MessageSquare } from 'lucide-react';
import { Professional } from '../types';
import { motion } from 'motion/react';

export const ProfessionalProfile: React.FC<{ professional: Professional, onContact: (p: Professional) => void }> = ({ professional, onContact }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="h-64 bg-gradient-to-r from-brand-blue-depth to-brand-green-sprout relative">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0">
          <div className="relative">
            <img 
              src={professional.imageUrl} 
              alt={professional.name} 
              className="w-40 h-40 rounded-3xl object-cover border-8 border-white shadow-xl"
            />
            <div className="absolute bottom-2 right-2 bg-brand-blue-depth text-white p-2 rounded-xl border-4 border-white shadow-lg">
                <Star size={24} fill="white" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-12 px-6 md:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-text-title mb-2">{professional.name}</h1>
            <p className="text-xl text-brand-green-sprout font-bold mb-4">{professional.specialty}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < Math.floor(professional.rating) ? "fill-brand-blue-depth text-brand-blue-depth" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-lg font-bold text-text-title">({professional.rating.toFixed(1)}) • 48 serviços</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-text-secondary">
                <MapPin size={18} />
                <span>{professional.location}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-text-secondary">
                <MessageSquare size={18} />
                <span>Responde em 2h</span>
              </div>
            </div>

            <div className="prose prose-blue max-w-none">
              <h3 className="text-xl font-bold mb-2">Sobre Mim</h3>
              <p className="text-text-secondary leading-relaxed">
                {professional.description}
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold mb-6">Portfólio</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'https://images.unsplash.com/photo-1581578731548-c64695cc6954',
                  'https://images.unsplash.com/photo-1541625602330-2277a1cd43a7',
                  'https://images.unsplash.com/photo-1517033284163-f30a944062cb',
                  'https://images.unsplash.com/photo-1504148455328-c376907d081c'
                ].map((img, i) => (
                  <motion.img 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    src={`${img}?q=80&w=300&auto=format&fit=crop`} 
                    alt="Portfolio" 
                    className="w-full h-32 md:h-48 object-cover rounded-xl shadow-md cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 bg-[#F4F7F9] rounded-[2.5rem] p-10 sticky top-32 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black mb-8 text-center tracking-tight text-text-title uppercase">Conectar Agora</h3>
            <div className="space-y-4">
              <button 
                onClick={() => onContact(professional)}
                className="w-full bg-brand-green-sprout text-white py-5 rounded-2xl font-black shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
              >
                <Phone size={20} />
                WhatsApp
              </button>
              <button 
                onClick={() => onContact(professional)}
                className="w-full bg-brand-blue-depth text-white py-5 rounded-2xl font-black shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
              >
                <MessageSquare size={20} />
                Enviar Mensagem
              </button>
              
              <div className="pt-6 border-t border-gray-200 mt-6">
                <div className="flex items-center gap-3 text-text-secondary mb-4">
                    <Mail size={18} />
                    <span className="text-xs font-bold text-gray-500">verificar@email.com</span>
                </div>
                <div className="bg-white p-4 rounded-xl text-[10px] text-gray-400 font-medium leading-relaxed italic border border-gray-50">
                    "Oportuniza garante a verificação deste profissional em Capela do Alto."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
