import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './ui/Logo';
import { Mail, Lock, User, Briefcase, ArrowRight, ChevronLeft, AlertTriangle } from 'lucide-react';
import { authService, isSupabaseConfigured } from '../lib/supabaseClientService';

type AuthMode = 'login' | 'register';
type UserRole = 'client' | 'professional';

export const Auth: React.FC<{ onBack: () => void, onSuccess: (role: string) => void }> = ({ onBack, onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<UserRole>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const supabaseActive = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const result = await authService.signUp(email, password, name, role, role === 'professional' ? specialty : undefined);
        if (result.success && result.user) {
          onSuccess(result.user.role);
        } else {
          setErrorMsg(result.error || 'Erro desconhecido ao registrar.');
        }
      } else {
        const result = await authService.signIn(email, password);
        if (result.success && result.user) {
          onSuccess(result.user.role);
        } else {
          setErrorMsg(result.error || 'Autenticação recusada. Verifique suas credenciais.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro inesperado no sistema.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col md:flex-row overflow-hidden font-sans">
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
      <div className="flex-1 overflow-y-auto bg-white flex items-center justify-center p-8 md:p-16 animate-fade-in">
        <div className="w-full max-w-md">
          {/* Supabase connection status indicator */}
          <div className="mb-6">
            {supabaseActive ? (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl px-4 py-3 flex items-center gap-2 text-xs font-bold shadow-sm">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping shrink-0" />
                <span>Supabase Conectado (Nuvem em Tempo Real)</span>
              </div>
            ) : (
              <div className="bg-[#f0f4f8] text-brand-blue-depth border border-gray-100 rounded-2xl px-4 py-3 flex flex-col gap-1 text-xs font-semibold shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-brand-green-sprout rounded-full shrink-0" />
                  <span className="font-extrabold text-[#111111]">Modo Automação com Banco Local</span>
                </div>
                <p className="text-[10px] text-text-secondary leading-normal">
                  Suas ações persistem localmente. Configure <code className="font-mono bg-white px-1 py-0.5 rounded border">VITE_SUPABASE_URL</code> em Secrets para habilitar autenticação na nuvem.
                </p>
              </div>
            )}
          </div>

          <div className="text-center md:text-left mb-8">
            <h1 className="text-4xl font-bold text-brand-blue-depth mb-2">
              {mode === 'login' ? 'Bem-vindo de volta' : 'Comece agora'}
            </h1>
            <p className="text-text-secondary text-sm">
              {mode === 'login' 
                ? 'Acesse sua conta do Oportuniza para continuar.' 
                : 'Crie sua conta para encontrar ou oferecer serviços em Capela do Alto.'}
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-red-800 border border-red-200 rounded-2xl px-4 py-3 mb-6 flex items-start gap-2.5 text-xs font-semibold animate-shake">
              <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
            <button
              type="button"
              disabled={loading}
              onClick={() => { setRole('client'); setErrorMsg(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
                role === 'client' 
                ? 'bg-white text-brand-blue-depth shadow-md' 
                : 'text-text-secondary hover:text-brand-blue-depth disabled:opacity-50'
              }`}
            >
              <User size={18} />
              Contratante
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => { setRole('professional'); setErrorMsg(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
                role === 'professional' 
                ? 'bg-white text-brand-blue-depth shadow-md' 
                : 'text-text-secondary hover:text-brand-blue-depth disabled:opacity-50'
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
                      required
                      placeholder="Nome Completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-blue-depth transition-all outline-none text-sm text-text-title font-medium"
                    />
                  </div>
                  {role === 'professional' && (
                     <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select 
                          required
                          value={specialty || 'Efetiva'}
                          onChange={(e) => setSpecialty(e.target.value)}
                          disabled={loading}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-blue-depth transition-all outline-none text-sm text-text-title font-bold"
                        >
                          <option value="Efetiva">Efetiva (Geral & Governança)</option>
                          <option value="Faxineira">Faxineira</option>
                          <option value="Pedreiro">Pedreiro</option>
                          <option value="Encanador">Encanador</option>
                          <option value="Baba">Babá</option>
                        </select>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-blue-depth transition-all outline-none text-sm text-text-title font-medium"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="password" 
                placeholder="Senha de acesso"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-blue-depth transition-all outline-none text-sm text-text-title font-medium"
              />
            </div>

            {mode === 'login' && (
              <div className="text-right">
                <a href="#" className="text-xs font-bold text-brand-blue-depth hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-blue-depth to-brand-green-sprout text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-75"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'Entrar na Conta' : 'Criar Conta'}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-text-secondary text-xs font-semibold">
            {mode === 'login' ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}
            <button 
              type="button"
              disabled={loading}
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErrorMsg(''); }}
              className="ml-1.5 font-black text-brand-green-sprout hover:underline disabled:opacity-50"
            >
              {mode === 'login' ? 'Cadastre-se grátis' : 'Entrar agora'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
