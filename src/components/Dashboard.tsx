import React, { useEffect, useState } from 'react';
import { Search, ChevronRight, User, History, Briefcase, Star, Send, X, MapPin, CheckCircle, Plus, LayoutDashboard, Settings, LogOut, Phone } from 'lucide-react';
import { ProfessionalCard } from './ProfessionalList';
import { ProfessionalProfile } from './ProfessionalProfile';
import { dbService, authService, isSupabaseConfigured } from '../lib/supabaseClientService';
import { Opportunity, Professional, User as UserType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './ui/Logo';
import { getGeolocation, calculateMatchingScore, verifyRating } from '../services/userService';

export const OpportunityCard: React.FC<{ opportunity: Opportunity, onApply?: () => void }> = ({ opportunity, onApply }) => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá, vi seu anúncio "${opportunity.title}" no Oportuniza e gostaria de saber mais!`);
    window.open(`https://wa.me/5515999999999?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col md:flex-row mb-8 group hover:shadow-xl transition-all">
      <div className="flex-1 p-8">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-text-title">{opportunity.title}</h3>
            <span className="bg-brand-green-sprout/10 text-brand-green-sprout text-xs font-bold px-3 py-1 rounded-full uppercase">
                {opportunity.category}
            </span>
        </div>
        <p className="text-text-secondary mb-4 leading-relaxed">
          {opportunity.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <MapPin size={16} />
          {opportunity.location}
        </div>
        <button 
          onClick={onApply || handleWhatsApp}
          className="bg-brand-blue-depth text-white px-8 py-3 rounded-xl font-bold hover:bg-[#153a5c] transition-all flex items-center gap-2"
        >
          <Phone size={18} />
          {onApply ? 'Candidatar-se' : 'Falar no WhatsApp'}
        </button>
      </div>
      <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
        <img 
          src={opportunity.imageUrl} 
          alt={opportunity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
};

export const PostServiceModal: React.FC<{ onClose: () => void, onPost: (service: any) => void }> = ({ onClose, onPost }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Pedreiro');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPost({
            id: Date.now().toString(),
            title,
            category,
            description,
            price,
            location: 'Capela do Alto, SP',
            imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?q=80&w=400&auto=format&fit=crop',
            clientId: 'me',
            status: 'open',
            createdAt: new Date().toISOString()
        });
    };

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-brand-blue-depth/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden">
                <div className="bg-brand-blue-depth p-8 text-white flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Postar Novo Serviço</h2>
                    <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors"><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-text-title mb-2 uppercase tracking-wide">Título do Serviço</label>
                            <input 
                                required
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Ex: Reforma de Banheiro"
                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-brand-blue-depth/20 transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text-title mb-2 uppercase tracking-wide">Categoria</label>
                            <select 
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-blue-depth/20 transition-all font-medium"
                            >
                                <option>Pedreiro</option>
                                <option>Faxineira</option>
                                <option>Encanador</option>
                                <option>Baba</option>
                                <option>Pintor</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text-title mb-2 uppercase tracking-wide">Descrição Detalhada</label>
                        <textarea 
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Descreva o que precisa ser feito..."
                            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 min-h-[120px] focus:ring-2 focus:ring-brand-blue-depth/20 transition-all font-medium resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text-title mb-2 uppercase tracking-wide">Orçamento Estimado (Opcional)</label>
                        <input 
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder="R$ 500,00 ou 'A combinar'"
                            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-blue-depth/20 transition-all font-medium"
                        />
                    </div>
                    <button type="submit" className="w-full bg-brand-green-sprout text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
                        Publicar Serviço
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export const ProfileSideCard: React.FC<{ user: any, onClose: () => void, onLogout: () => void, onViewMyProfile?: () => void }> = ({ user, onClose, onLogout, onViewMyProfile }) => {
    return (
        <div className="fixed inset-0 z-[150] pointer-events-none">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-brand-blue-depth/20 backdrop-blur-md pointer-events-auto" 
            />
            <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl pointer-events-auto flex flex-col"
            >
                <div className="relative h-48 bg-gradient-to-br from-brand-blue-depth to-brand-green-sprout shrink-0">
                    <button onClick={onClose} className="absolute top-6 left-6 p-2 bg-white/20 hover:bg-white/40 rounded-xl text-white transition-all"><X /></button>
                </div>
                
                <div className="px-10 pb-10 flex-grow overflow-y-auto">
                    <div className="relative -mt-16 mb-8 inline-block">
                        <img 
                            src={user.role === 'professional' ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"} 
                            className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
                            alt="Profile" 
                        />
                        <div className="absolute -bottom-2 right-0 bg-brand-green-sprout p-2 rounded-xl text-white shadow-lg">
                            <Star size={16} fill="white" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-text-title tracking-tight mb-1">{user.name}</h2>
                    <p className="text-brand-green-sprout font-bold uppercase tracking-widest text-xs mb-8">
                        {user.role === 'professional' ? 'Prestador Verificado' : 'Contratante Verificado'}
                    </p>

                    <div className="space-y-6">
                        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-sm font-bold text-text-title uppercase tracking-wider">Atividade Recente</h4>
                                <History size={16} className="text-gray-400" />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs">
                                    <span className="text-text-secondary">Serviços {user.role === 'professional' ? 'Concluídos' : 'Contratados'}</span>
                                    <span className="font-bold text-brand-blue-depth">{user.role === 'professional' ? '124' : '15'}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-text-secondary">Avaliação Média</span>
                                    <span className="font-bold text-brand-blue-depth">4.9/5.0</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                             <button 
                                onClick={() => {
                                    onClose();
                                    if (onViewMyProfile) onViewMyProfile();
                                }}
                                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all font-bold text-text-body group text-left animate-none"
                             >
                                <div className="flex items-center gap-3">
                                    <User size={20} className="text-brand-blue-depth" />
                                    <span>{user.role === 'professional' ? 'Visualizar Meu Perfil Público' : 'Editar Perfil'}</span>
                                </div>
                                <ChevronRight size={18} className="text-gray-300 group-hover:text-brand-blue-depth" />
                             </button>
                             <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all font-bold text-text-body group">
                                <div className="flex items-center gap-3">
                                    <Settings size={20} className="text-brand-blue-depth" />
                                    Configurações
                                </div>
                                <ChevronRight size={18} className="text-gray-300 group-hover:text-brand-blue-depth" />
                             </button>
                             <button onClick={onLogout} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 transition-all font-bold text-red-500 group">
                                <div className="flex items-center gap-3">
                                    <LogOut size={20} />
                                    Sair da Conta
                                </div>
                             </button>
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">Oportuniza v1.2.0 • 2026</p>
                </div>
            </motion.div>
        </div>
    );
};

export const Dashboard: React.FC<{ userRole: 'client' | 'professional' | 'visitor', onLogout: () => void }> = ({ userRole, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'main' | 'jobs' | 'history'>('main');
  const [subTab, setSubTab] = useState<'professionals' | 'opportunities'>(
    userRole === 'professional' ? 'opportunities' : 'professionals'
  );
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [category, setCategory] = useState('Pedreiro');
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState('Carregando localização...');

  useEffect(() => {
    // Get location
    getGeolocation().then(data => {
        setLocation(data.address);
    });

    // Get current logged-in user profile
    const loggedUser = authService.getCurrentUser();
    setCurrentUser(loggedUser);

    // Load dynamic professionals list from DB
    dbService.getProfessionals().then(data => {
      setProfessionals(data);
    });

    // Load dynamic opportunities list from DB
    dbService.getOpportunities().then(data => {
      setOpportunities(data);
    });
  }, []);

  const handlePostService = async (newService: any) => {
    const opp = {
      title: newService.title,
      description: newService.description,
      price: newService.price,
      location: newService.location,
      imageUrl: newService.imageUrl,
      category: newService.category,
      clientId: currentUser?.id || 'client_1',
      status: 'open' as const
    };
    const saved = await dbService.addOpportunity(opp);
    setOpportunities(prev => [saved, ...prev]);
    setShowPostModal(false);
    setActiveTab('jobs');
  };

  const handleWhatsAppProf = (prof: Professional) => {
    const message = encodeURIComponent(`Olá ${prof.name}, vi seu perfil no Oportuniza e gostaria de conversar sobre um serviço de ${prof.specialty}!`);
    window.open(`https://wa.me/5515999999999?text=${message}`, '_blank');
  };

  const categories = ['Pedreiro', 'Faxineira', 'Encanador', 'Efetiva', 'Baba'];

  const renderContent = () => {
    if (selectedProfessional) {
        return (
            <div className="relative">
                <button 
                    onClick={() => setSelectedProfessional(null)}
                    className="absolute top-4 left-6 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl font-bold text-brand-blue-depth shadow-sm hover:bg-white"
                >
                    <ChevronRight className="rotate-180" size={20} />
                    Voltar
                </button>
                <ProfessionalProfile 
                    professional={selectedProfessional} 
                    onContact={handleWhatsAppProf}
                    userRole={userRole}
                />
            </div>
        );
    }

    switch (activeTab) {
      case 'jobs':
        return (
            <div className="max-w-5xl mx-auto py-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-black text-text-title tracking-tight flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-green-sprout rounded-2xl flex items-center justify-center text-white">
                            <Briefcase size={24} />
                        </div>
                        {userRole === 'professional' ? 'Demanda da Região' : 'Seus Pedidos de Serviço'}
                    </h2>
                    {(userRole === 'professional' || userRole === 'client') && (
                        <button 
                            onClick={() => setShowPostModal(true)}
                            className="bg-brand-blue-depth text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            <Plus size={20} />
                            {userRole === 'professional' ? 'Postar Meu Serviço' : 'Novo Pedido'}
                        </button>
                    )}
                </div>
                {opportunities.map(opp => (
                    <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
            </div>
        );

      case 'history':
        return (
            <div className="max-w-5xl mx-auto py-8">
                <h2 className="text-3xl font-black text-text-title mb-12 flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-blue-depth rounded-2xl flex items-center justify-center text-white">
                        <History size={24} />
                    </div>
                    Atividade Recente
                </h2>
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 p-2">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-6 font-bold text-text-secondary text-xs uppercase tracking-widest">Serviço</th>
                                <th className="px-8 py-6 font-bold text-text-secondary text-xs uppercase tracking-widest">Data</th>
                                <th className="px-8 py-6 font-bold text-text-secondary text-xs uppercase tracking-widest">Status</th>
                                <th className="px-8 py-6 font-bold text-text-secondary text-xs uppercase tracking-widest text-right">Match</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[1, 2, 3, 4].map(i => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-8 font-bold text-text-title leading-tight">
                                        <p>Reforma Geral Residencial</p>
                                        <p className="text-[10px] text-text-secondary mt-1 font-normal uppercase tracking-wide">ID: #4823-{i}</p>
                                    </td>
                                    <td className="px-8 py-8 text-sm text-text-secondary font-medium">15 Mai, 2026</td>
                                    <td className="px-8 py-8">
                                        <span className="bg-brand-green-sprout/10 text-brand-green-sprout px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider">Concluído</span>
                                    </td>
                                    <td className="px-8 py-8 text-right">
                                        <div className="flex justify-end gap-1">
                                            {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-brand-blue-depth text-brand-blue-depth" />)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );

      default:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center mb-12">
                <div className="inline-flex p-1.5 bg-gray-200 rounded-2xl">
                    <button 
                        onClick={() => setSubTab('professionals')}
                        className={`px-10 py-3 rounded-xl font-bold transition-all ${subTab === 'professionals' ? 'bg-white text-brand-blue-depth shadow-sm' : 'text-text-secondary'}`}
                    >
                        Buscar Profissionais
                    </button>
                    <button 
                        onClick={() => setSubTab('opportunities')}
                        className={`px-10 py-3 rounded-xl font-bold transition-all ${subTab === 'opportunities' ? 'bg-white text-brand-blue-depth shadow-sm' : 'text-text-secondary'}`}
                    >
                        Ver Vagas Abertas
                    </button>
                </div>
            </div>

            {subTab === 'professionals' ? (
              <>
                <div className="bg-gradient-to-r from-brand-blue-depth to-brand-green-sprout p-12 rounded-[2.5rem] mb-12 flex items-center gap-10 overflow-x-auto no-scrollbar shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    {categories.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`text-4xl font-black whitespace-nowrap transition-all uppercase tracking-tight py-2 border-b-4 ${category === cat ? 'text-white border-white' : 'text-white/40 border-transparent hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                    <div className="ml-auto shrink-0 flex items-center justify-center w-14 h-14 rounded-full border-2 border-white/40 text-white cursor-pointer hover:bg-white/10">
                        <ChevronRight size={24} />
                    </div>
                </div>

                {/* Simulated Provider Dashboard Banner */}
                {userRole === 'professional' && (
                  <div className="bg-gradient-to-r from-brand-blue-depth to-[#1e486e] p-8 rounded-[2rem] text-white mb-10 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 border border-white/5 relative overflow-hidden">
                    <div className="relative z-10">
                      <span className="bg-brand-green-sprout text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">Ative seu Perfil</span>
                      <h3 className="text-xl font-bold mt-2 mb-1">Seja bem-vinda de volta ao Oportuniza, {currentUser?.name || 'Darcy'}!</h3>
                      <p className="text-xs text-gray-200">Como prestadora de serviços, você pode personalizar as suas fotos de portfólio, sua descrição de apresentação e responder as avaliações no mural oficial.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const me = professionals.find(p => p.id === currentUser?.id) || professionals.find(p => p.id === '6') || professionals[0];
                        if (me) setSelectedProfessional(me);
                      }}
                      className="bg-brand-green-sprout hover:bg-[#3d8349] text-white font-black text-xs py-3.5 px-6 rounded-xl uppercase tracking-widest shrink-0 transition-all shadow-md active:scale-95 z-10"
                    >
                      Acessar Meu Perfil Público
                    </button>
                    {/* Decorative bubble background */}
                    <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full translate-y-12 translate-x-12 shrink-0 pointer-events-none" />
                  </div>
                )}

                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-black text-text-title tracking-tight">Recomendados</h2>
                        <div className="flex items-center gap-1 text-[10px] bg-brand-blue-depth/5 text-brand-blue-depth px-2 py-1 rounded-md font-bold">
                            <MapPin size={12} />
                            {location}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {professionals
                  .filter(p => !category || p.specialty === category || (category === 'Efetiva' && p.specialty === 'Governança'))
                  .map((prof) => (
                    <div key={prof.id} onClick={() => setSelectedProfessional(prof)} className="cursor-pointer">
                        <ProfessionalCard professional={prof} />
                    </div>
                ))}
                {professionals.filter(p => !category || p.specialty === category || (category === 'Efetiva' && p.specialty === 'Governança')).length === 0 && (
                  <div className="col-span-full bg-white rounded-[2.5rem] p-12 text-center border border-gray-100 shadow-xl flex flex-col items-center justify-center">
                    <User size={48} className="text-brand-green-sprout mb-4 animate-pulse" />
                    <h4 className="text-xl font-bold text-text-title mb-2">Sem profissionais ativos</h4>
                    <p className="text-text-secondary text-sm max-w-md">Não há profissionais cadastrados na categoria "{category}" no momento. Crie uma nova oportunidade ou explore outras especialidades.</p>
                  </div>
                )}
                </div>
              </>
            ) : (
              <div className="max-w-5xl mx-auto">
                <div className="bg-white p-4 rounded-[2rem] shadow-xl border border-gray-100 mb-12 flex flex-col md:flex-row gap-3">
                    <div className="flex-1 flex items-center px-4 bg-gray-50 rounded-2xl">
                        <Search size={22} className="text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Ex: Reforma urgente em Sorocaba..."
                            className="flex-1 px-4 py-5 bg-transparent border-none focus:ring-0 outline-none text-text-body font-bold"
                        />
                    </div>
                    <button className="bg-brand-blue-depth text-white px-12 py-4 rounded-2xl font-black shadow-lg hover:shadow-xl transition-all uppercase tracking-widest text-sm">
                        Buscar Vaga
                    </button>
                </div>
                {opportunities.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans pb-20 overflow-x-hidden">
      {/* Dashboard Nav */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Logo />
            
            <div className="hidden md:flex items-center gap-12">
               <button 
                onClick={() => {setActiveTab('main'); setSelectedProfessional(null);}} 
                className={`flex items-center gap-2 font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'main' && !selectedProfessional ? 'text-brand-blue-depth' : 'text-text-secondary hover:text-brand-blue-depth'}`}
               >
                <LayoutDashboard size={18} />
                Explorar
               </button>
               {userRole === 'professional' ? (
                 <button 
                  onClick={() => {
                    const me = professionals.find(p => p.id === currentUser?.id) || professionals.find(p => p.id === '6') || professionals[0];
                    if (me) setSelectedProfessional(me);
                  }} 
                  className={`flex items-center gap-2 font-black uppercase tracking-widest text-xs transition-colors ${selectedProfessional?.id === (currentUser?.id || '6') ? 'text-brand-blue-depth' : 'text-text-secondary hover:text-brand-blue-depth'}`}
                 >
                  <User size={18} />
                  Meu Perfil
                 </button>
               ) : null}
               <button 
                onClick={() => {setActiveTab('history'); setSelectedProfessional(null);}} 
                className={`flex items-center gap-2 font-black uppercase tracking-widest text-xs transition-colors ${activeTab === 'history' ? 'text-brand-blue-depth' : 'text-text-secondary hover:text-brand-blue-depth'}`}
               >
                <History size={18} />
                Histórico
               </button>
               
               <div className="h-10 w-[1px] bg-gray-200" />
               
               <button 
                    onClick={() => setShowProfile(true)}
                    className="flex items-center gap-4 group"
               >
                  <div className="text-right">
                    <p className="text-sm font-black text-text-title leading-none">{currentUser?.name || 'Visitante'}</p>
                    <p className="text-[10px] text-brand-green-sprout font-black uppercase tracking-widest mt-1">{userRole === 'professional' ? 'Prestador' : 'Cliente'}</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue-depth flex items-center justify-center text-white shadow-xl shadow-brand-blue-depth/20 group-hover:scale-105 transition-transform overflow-hidden border-2 border-white">
                    <img src={userRole === 'professional' ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150" : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"} className="w-full h-full object-cover" alt="Me" />
                  </div>
               </button>
            </div>

            <div className="md:hidden flex items-center gap-4">
                <button onClick={() => setShowProfile(true)} className="w-12 h-12 rounded-2xl bg-brand-blue-depth flex items-center justify-center text-white border-2 border-white shadow-lg">
                    <User size={20} />
                </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <motion.div
        key={`${activeTab}-${selectedProfessional ? 'prof' : 'list'}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {renderContent()}
      </motion.div>

      {/* Side Profile Card */}
      <AnimatePresence>
        {showProfile && (
            <ProfileSideCard 
                user={{ name: currentUser?.name || 'Visitante', role: userRole }} 
                onClose={() => setShowProfile(false)} 
                onLogout={onLogout}
                onViewMyProfile={() => {
                    const me = professionals.find(p => p.id === currentUser?.id) || professionals.find(p => p.id === '6') || professionals[0];
                    if (me) setSelectedProfessional(me);
                }}
            />
        )}
      </AnimatePresence>

      {/* Post Service Modal */}
      <AnimatePresence>
        {showPostModal && (
            <PostServiceModal 
                onClose={() => setShowPostModal(false)}
                onPost={handlePostService}
            />
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 flex justify-around py-5 z-[100] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <button onClick={() => {setActiveTab('main'); setSelectedProfessional(null);}} className={`p-2 transition-all ${activeTab === 'main' && !selectedProfessional ? 'text-brand-blue-depth scale-125' : 'text-gray-300'}`}><LayoutDashboard size={26} /></button>
            {userRole === 'professional' && (
              <button 
                onClick={() => {
                  const me = professionals.find(p => p.id === currentUser?.id) || professionals.find(p => p.id === '6') || professionals[0];
                  if (me) setSelectedProfessional(me);
                }} 
                className={`p-2 transition-all ${selectedProfessional?.id === (currentUser?.id || '6') ? 'text-brand-blue-depth scale-125' : 'text-gray-300'}`}
              >
                <User size={26} />
              </button>
            )}
            <button onClick={() => {setActiveTab('history'); setSelectedProfessional(null);}} className={`p-2 transition-all ${activeTab === 'history' ? 'text-brand-blue-depth scale-125' : 'text-gray-300'}`}><History size={26} /></button>
            <button onClick={() => setShowProfile(true)} className="p-2 text-gray-300"><Settings size={26} /></button>
      </div>
    </div>
  );
};
