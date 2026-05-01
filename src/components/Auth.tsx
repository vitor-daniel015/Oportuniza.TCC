import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './ui/Logo';
import { Mail, Lock, User, Briefcase, ArrowRight, ChevronLeft } from 'lucide-react';

type AuthMode = 'login' | 'register';
type UserRole = 'client' | 'professional';

export const Auth: React.FC<{ onBack: () => void, onSuccess: (role: string) => void }> = ({ onBack, onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<UserRole>('client');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(role);
  };

  return (
    <div className="fixed inset-0 z-60 bg-white flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left Side: Branding and Illustration */}
      <div className="md:w-[45%] bg-brand-blue-depth relative p-8 md:p-12 flex flex-col">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-12 self-start"
        >
          <ChevronLeft size={20} />
          Voltar para Home
        </button>

        <div className="mb-12">
          <div className="bg-white p-3 rounded-xl inline-block mb-4">
            <Logo showText={false} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Oportuniza</h2>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10"
            >
              <svg viewBox="0 0 400 300" className="w-full h-auto drop-shadow-2xl">
                 <rect x="50" y="150" width="300" height="10" fill="#4DA25A" rx="5" />
                 <path d="M 100 150 L 80 250 M 300 150 L 320 250" stroke="white" strokeWidth="4" />
                 <circle cx="200" cy="80" r="30" fill="white" opacity="0.9" />
                 <path d="M 170 150 Q 200 110 230 150" stroke="white" strokeWidth="20" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        <p className="text-white/60 text-xs text-center mt-8">
          © 2026 Oportuniza. Conectando talentos a oportunidades.
        </p>

        <div className="absolute top-0 right-0 h-full w-24 bg-white -skew-x-6 origin-top-right translate-x-12 hidden md:block"></div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 overflow-y-auto bg-white flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="text-center md:text-left mb-10">
            <h1 className="text-4xl font-bold text-brand-blue-depth mb-2">
              {mode === 'login' ? 'Bem-vindo de volta' : 'Comece agora'}
            </h1>
            <p className="text-text-secondary">
              {mode === 'login' 
                ? 'Acesse sua conta para continuar.' 
                : 'Crie sua conta para encontrar ou oferecer serviços.'}
            </p>
          </div>

          <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
            <button
              onClick={() => setRole('client')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
                role === 'client' 
                ? 'bg-white text-brand-blue-depth shadow-md' 
                : 'text-text-secondary hover:text-brand-blue-depth'
              }`}
            >
              <User size={18} />
              Contratante
            </button>
            <button
              onClick={() => setRole('professional')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
                role === 'professional' 
                ? 'bg-white text-brand-blue-depth shadow-md' 
                : 'text-text-secondary hover:text-brand-blue-depth'
              }`}
            >
              <Briefcase size={18} />
              Prestador
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="Nome Completo"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-blue-depth transition-all outline-none"
                    />
                  </div>
                  {role === 'professional' && (
                     <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                          type="text" 
                          placeholder="Especialidade (ex: Pintor, Faxineira)"
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-blue-depth transition-all outline-none"
                        />
                      </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-blue-depth transition-all outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="password" 
                placeholder="Senha"
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-blue-depth transition-all outline-none"
              />
            </div>

            {mode === 'login' && (
              <div className="text-right">
                <a href="#" className="text-sm font-semibold text-brand-blue-depth hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
            )}

            <button type="submit" className="w-full bg-linear-to-r from-brand-blue-depth to-brand-green-sprout text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
              {mode === 'login' ? 'Entrar na Conta' : 'Criar Conta'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-text-secondary">
            {mode === 'login' ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="ml-2 font-bold text-brand-green-sprout hover:underline"
            >
              {mode === 'login' ? 'Cadastre-se' : 'Entrar agora'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
