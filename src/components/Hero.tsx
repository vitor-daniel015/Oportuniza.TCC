import React from 'react';
import { motion } from 'motion/react';
import { Logo } from './ui/Logo';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-10 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-title leading-[1.1] mb-6">
              Transforme Sua <br />
              Carreira com <br />
              <span className="text-brand-blue-depth">Oportunidades Reais</span>
            </h1>
            <p className="text-base text-text-secondary max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
              Conectando profissionais autônomos operacionais e domésticos a clientes de forma rápida, segura e confiável. Reduza a informalidade e alcance novos patamares profissionais.
            </p>
            <button className="bg-brand-green-herbal hover:bg-brand-green-sprout text-white px-10 py-3 rounded-lg font-bold text-lg transition-all shadow-md mb-12">
              Saiba Mais
            </button>

            {/* Highlight Cards integrated in Hero area as per mobile/desktop screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-brand-green-sprout/10 p-3 rounded-xl text-brand-green-sprout">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-title leading-tight">Encontre<br/>Oportunidades</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Acesse demandas essenciais e use nosso matching inteligente para recomendações com base na localização e reputação.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-brand-green-sprout/10 p-3 rounded-xl text-brand-green-sprout">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-title leading-tight">Cresça<br/>Profissionalmente</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Aumente sua visibilidade, construa uma reputação verificada e impulsione seu sucesso financeiro.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative hidden lg:block"
          >
            <img
              src="/Logo.png"
              alt="Oportuniza logo"
              className="w-full max-w-lg mx-auto drop-shadow-2xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.svg-fallback')?.classList.remove('hidden');
              }}
            />
            <div className="svg-fallback hidden">
               <svg viewBox="0 0 100 100" className="w-full h-full text-brand-blue-depth opacity-80">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M 50 20 L 50 80 M 35 35 L 50 20 L 65 35" stroke="#4DA25A" strokeWidth="4" fill="none" />
               </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
