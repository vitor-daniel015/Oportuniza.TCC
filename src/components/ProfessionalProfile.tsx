import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Star, MessageSquare, CornerDownRight, Send, Plus, Calendar, UserCheck, ChevronDown, Check, User, Edit, FileText, Clock, ShieldCheck, X } from 'lucide-react';
import { Professional, Review, ReviewReply } from '../types';
import { dbService } from '../lib/supabaseClientService';
import { motion, AnimatePresence } from 'motion/react';

export const ProfessionalProfile: React.FC<{ 
  professional: Professional; 
  onContact: (p: Professional) => void;
  userRole?: 'client' | 'professional' | 'visitor';
}> = ({ professional, onContact, userRole = 'visitor' }) => {
  
  // Local state for reviews and replies matching this professional
  const [reviews, setReviews] = useState<Review[]>([]);
  const [replies, setReplies] = useState<ReviewReply[]>([]);

  // Editing profile states (Only for profile owner/professional)
  const [localDescription, setLocalDescription] = useState(professional.description);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editDescTemp, setEditDescTemp] = useState(professional.description);

  // Portfolio local state
  const [localPortfolio, setLocalPortfolio] = useState<string[]>([
    'https://images.unsplash.com/photo-1581578731548-c64695cc6954',
    'https://images.unsplash.com/photo-1541625602330-2277a1cd43a7',
    'https://images.unsplash.com/photo-1517033284163-f30a944062cb',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c'
  ]);
  const [isEditingPortfolio, setIsEditingPortfolio] = useState(false);
  const [portfolioUrlsTemp, setPortfolioUrlsTemp] = useState<string[]>([]);

  // Form states for creating a new review (Only for client/contratante)
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');

  // Reply states (Only for profile owner/professional)
  const [activeReplyFormReviewId, setActiveReplyFormReviewId] = useState<string | null>(null);
  const [newReplyName, setNewReplyName] = useState(professional.name);
  const [newReplyMessage, setNewReplyMessage] = useState('');

  // Load reviews and replies when professional shifts
  useEffect(() => {
    // Load reviews
    dbService.getReviews(professional.id).then(data => {
      setReviews(data);
    });

    // Load replies
    dbService.getReplies().then(data => {
      setReplies(data);
    });

    setLocalDescription(professional.description);
    setEditDescTemp(professional.description);
    setIsWritingReview(false);
    setReviewSuccessMsg('');
    setActiveReplyFormReviewId(null);
    setIsEditingDescription(false);
    setIsEditingPortfolio(false);

    // Seed standard mock portfolio photos matching the category
    if (professional.specialty === 'Pedreiro') {
      setLocalPortfolio([
        'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5',
        'https://images.unsplash.com/photo-1504148455328-c376907d081c',
        'https://images.unsplash.com/photo-1581578731548-c64695cc6954',
        'https://images.unsplash.com/photo-1590069261209-f8e9b8642343'
      ]);
    } else if (professional.specialty === 'Faxineira' || professional.specialty === 'Efetiva') {
      setLocalPortfolio([
        'https://images.unsplash.com/photo-1581578731548-c64695cc6954',
        'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac',
        'https://images.unsplash.com/photo-1583907659441-adddf659f71c',
        'https://images.unsplash.com/photo-1603712760398-3f62f37e76a9'
      ]);
    } else if (professional.specialty === 'Encanador') {
      setLocalPortfolio([
        'https://images.unsplash.com/photo-1517033284163-f30a944062cb',
        'https://images.unsplash.com/photo-1504148455328-c376907d081c',
        'https://images.unsplash.com/photo-1581578731548-c64695cc6954',
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e'
      ]);
    } else {
      setLocalPortfolio([
        'https://images.unsplash.com/photo-1581578731548-c64695cc6954',
        'https://images.unsplash.com/photo-1541625602330-2277a1cd43a7',
        'https://images.unsplash.com/photo-1517033284163-f30a944062cb',
        'https://images.unsplash.com/photo-1504148455328-c376907d081c'
      ]);
    }
  }, [professional.id, professional.description, professional.specialty]);

  // Handle saving modified description
  const saveDescription = async () => {
    const updated = await dbService.updateProfessionalProfile(professional.id, { description: editDescTemp });
    setLocalDescription(updated.description);
    setIsEditingDescription(false);
  };

  // Handle saving modified portfolio images
  const savePortfolio = () => {
    setLocalPortfolio(portfolioUrlsTemp);
    setIsEditingPortfolio(false);
  };

  // Turn on portfolio editor
  const handleStartEditPortfolio = () => {
    setPortfolioUrlsTemp([...localPortfolio]);
    setIsEditingPortfolio(true);
  };

  // Handle posting a new review
  const handleAddNewReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole !== 'client') return;
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const addedReview = await dbService.addReview({
      professionalId: professional.id,
      reviewerName: newReviewName,
      rating: newReviewRating,
      comment: newReviewComment
    });

    setReviews(prev => [addedReview, ...prev]);
    setNewReviewName('');
    setNewReviewRating(5);
    setNewReviewComment('');
    setIsWritingReview(false);
    setReviewSuccessMsg('Avaliação publicada com sucesso!');
    setTimeout(() => setReviewSuccessMsg(''), 4000);
  };

  // Handle posting a reply to a specific review
  const handleAddNewReply = async (e: React.FormEvent, reviewId: string) => {
    e.preventDefault();
    if (userRole !== 'professional') return;
    if (!newReplyName.trim() || !newReplyMessage.trim()) return;

    const addedReply = await dbService.addReply({
      reviewId,
      replierName: newReplyName,
      message: newReplyMessage
    });

    setReplies(prev => [...prev, addedReply]);
    setNewReplyMessage('');
    setActiveReplyFormReviewId(null);
  };

  // Calculate dynamic rating statistics
  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0 
    ? parseFloat((reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1))
    : professional.rating;

  // Breakdown metrics for star percentages
  const getStarPercentage = (starNum: number) => {
    if (reviewCount === 0) return starNum === 5 ? 100 : 0;
    const countForStar = reviews.filter(r => Math.round(r.rating) === starNum).length;
    return Math.round((countForStar / reviewCount) * 100);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Banner / Mode Alert */}
      {userRole === 'professional' && (
        <div className="bg-brand-blue-depth text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-semibold sticky top-24 z-40 border-b border-white/10 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="bg-brand-green-sprout text-white text-xs px-3 py-1.5 rounded-full uppercase font-black tracking-wider shadow-sm shrink-0">
              Modo Dono do Perfil
            </span>
            <p className="text-gray-200">
              Você está acessando como o prestador <strong>{professional.name}</strong>. Você tem permissão para editar sua biografia, as fotos do portfólio e responder às avaliações dos clientes.
            </p>
          </div>
        </div>
      )}

      {/* Visual Top Cover Banner */}
      <div className="h-64 bg-gradient-to-r from-brand-blue-depth to-brand-green-sprout relative">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0">
          <div className="relative">
            <img 
              src={professional.imageUrl} 
              alt={professional.name} 
              className="w-40 h-40 rounded-3xl object-cover border-8 border-white shadow-xl"
              id="prof-profile-avatar"
            />
            <div className="absolute bottom-2 right-2 bg-brand-blue-depth text-white p-2 rounded-xl border-4 border-white shadow-lg">
                <Star size={24} fill="white" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-12 px-6 md:px-24">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          
          {/* Main Left Section */}
          <div className="flex-1 w-full">
            <h1 className="text-4xl font-extrabold text-text-title mb-2 tracking-tight" id="prof-profile-name">
              {professional.name}
            </h1>
            <p className="text-xl text-brand-green-sprout font-bold mb-4">{professional.specialty}</p>
            
            {/* Dynamic Star Rating Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < Math.floor(averageRating) ? "fill-brand-blue-depth text-brand-blue-depth" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-lg font-extrabold text-text-title">
                ({averageRating.toFixed(1)}) • {reviewCount} {reviewCount === 1 ? 'avaliação' : 'avaliações'}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-text-secondary text-sm font-semibold">
                <MapPin size={18} className="text-brand-blue-depth" />
                <span>{professional.location}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-text-secondary text-sm font-semibold">
                <MessageSquare size={18} className="text-brand-green-sprout" />
                <span>Respostas imediatas no mural</span>
              </div>
            </div>

            {/* About Section */}
            <div className="prose prose-blue max-w-none mb-10 bg-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-black text-text-title" id="prof-profile-about-title">Sobre Mim</h3>
                {userRole === 'professional' && !isEditingDescription && (
                  <button 
                    onClick={() => {
                      setEditDescTemp(localDescription);
                      setIsEditingDescription(true);
                    }}
                    className="flex items-center gap-1.5 text-xs font-black text-brand-blue-depth bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-xl transition-all"
                  >
                    <Edit size={14} />
                    Editar Biografia
                  </button>
                )}
              </div>
              
              {isEditingDescription ? (
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                  <textarea 
                    value={editDescTemp}
                    onChange={(e) => setEditDescTemp(e.target.value)}
                    rows={5}
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm text-text-title outline-none focus:ring-2 focus:ring-brand-blue-depth/20 resize-none font-medium"
                  />
                  <div className="flex justify-end gap-2 text-xs">
                    <button 
                      onClick={() => setIsEditingDescription(false)}
                      className="px-4 py-2 text-gray-500 font-bold hover:text-text-title"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={saveDescription}
                      className="bg-brand-blue-depth text-white px-5 py-2 rounded-xl font-bold hover:bg-brand-blue-depth/95"
                    >
                      Salvar Biografia
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-text-secondary leading-relaxed bg-gray-50/50 p-6 rounded-2xl border border-gray-100 text-base font-medium">
                  {localDescription}
                </p>
              )}
            </div>

            {/* ENHANCED SECTION: DETAILED INFO SHOWN GLOBALLY */}
            <div className="mb-10 bg-gradient-to-br from-[#F4F7F9] to-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-black mb-6 text-text-title flex items-center gap-2">
                <FileText size={22} className="text-brand-blue-depth" />
                Informações de Atendimento & Especialidade
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-brand-green-sprout mt-1 shrink-0" />
                    <div>
                      <h4 className="text-sm font-extrabold text-text-title">Horário de Atendimento</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Segunda a Sábado — 07:30 às 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-brand-green-sprout mt-1 shrink-0" />
                    <div>
                      <h4 className="text-sm font-extrabold text-text-title">Área de Atuação Principal</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Capela do Alto, Sorocaba, Porto, Iperó, Araçoiaba da Serra</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-brand-green-sprout mt-1 shrink-0" />
                    <div>
                      <h4 className="text-sm font-extrabold text-text-title">Frequência Disponível</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Diário, Semanal, Mensal ou Contrato Temporário</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} className="text-brand-blue-depth mt-1 shrink-0" />
                    <div>
                      <h4 className="text-sm font-extrabold text-[#111111] flex items-center gap-1.5">
                        Documentação Auditada
                        <span className="text-[9px] bg-emerald-500 text-white font-black px-1.5 py-0.5 rounded">100% OK</span>
                      </h4>
                      <p className="text-xs text-text-secondary mt-0.5">RG Cadastrado, MEI Ativo, Antecedentes criminais checados</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={18} className="text-brand-blue-depth mt-1 shrink-0" />
                    <div>
                      <h4 className="text-sm font-extrabold text-[#111111]">Metodologia de Trabalho</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Ferramental próprio completo inclusivo. Orçamento ágil e sem custo.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <UserCheck size={18} className="text-brand-blue-depth mt-1 shrink-0" />
                    <div>
                      <h4 className="text-sm font-extrabold text-[#111111]">Garantia de Satisfação</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Retorno preventivo em até 48 horas após obra ou limpeza se solicitado.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tag Highlights */}
              <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-gray-200/60">
                {['Maquinário Próprio', 'Nota Fiscal MEI', 'Pontualidade Certificada', 'Recomendado Oportuniza', 'Garantia Pós-Obra'].map((tag) => (
                  <span key={tag} className="bg-white px-3.5 py-1.5 rounded-xl text-xs font-bold text-text-secondary border border-gray-200">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio Gallery Section */}
            <div className="mb-14 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-text-title">Portfólio de Trabalhos</h3>
                {userRole === 'professional' && !isEditingPortfolio && (
                  <button 
                    onClick={handleStartEditPortfolio}
                    className="flex items-center gap-1.5 text-xs font-black text-brand-blue-depth bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-xl transition-all"
                  >
                    <Edit size={14} />
                    Editar Portfólio
                  </button>
                )}
              </div>

              {isEditingPortfolio ? (
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4 mb-6">
                  <h4 className="text-sm font-black text-text-title uppercase tracking-wider mb-2">Fotos do Portfólio (4 URLs)</h4>
                  <p className="text-xs text-gray-500 mb-2">Configure links de imagens para ilustrar seu portfólio no sistema.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolioUrlsTemp.map((url, index) => (
                      <div key={index}>
                        <label className="block text-[10px] font-black text-gray-400 mb-1 uppercase">Link Foto {index + 1}</label>
                        <input 
                          type="text" 
                          value={url}
                          onChange={(e) => {
                            const updated = [...portfolioUrlsTemp];
                            updated[index] = e.target.value;
                            setPortfolioUrlsTemp(updated);
                          }}
                          placeholder="Link da imagem Unsplash ou externa"
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-text-title outline-none focus:ring-1 focus:ring-brand-blue-depth/20 font-mono"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2 text-xs pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => setIsEditingPortfolio(false)}
                      className="px-4 py-2 text-gray-500 font-bold hover:text-text-title"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={savePortfolio}
                      className="bg-brand-blue-depth text-white px-5 py-2 rounded-xl font-bold hover:bg-brand-blue-depth/95"
                    >
                      Salvar Fotos
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {localPortfolio.map((img, i) => (
                    <motion.img 
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      src={`${img}?q=80&w=400&auto=format&fit=crop`} 
                      alt="Portfolio item" 
                      className="w-full h-32 md:h-48 object-cover rounded-2xl shadow-md cursor-pointer border border-gray-100"
                    />
                  ))}
                </div>
              )}
            </div>

            <hr className="border-gray-100 my-10" />

            {/* EVALUATIONS & COMMENTS MODULE */}
            <div className="mt-10" id="evaluation-system-section">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-3xl font-black text-text-title tracking-tight">Depoimentos dos Clientes</h3>
                  <p className="text-sm text-text-secondary mt-1">Opiniões e avaliações registradas sobre o trabalho de {professional.name}</p>
                </div>
                
                {userRole === 'client' ? (
                  <button 
                    onClick={() => setIsWritingReview(!isWritingReview)}
                    className="bg-brand-blue-depth hover:bg-brand-blue-depth/90 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-sm whitespace-nowrap"
                    id="btn-evaluate-prof"
                  >
                    <Plus size={18} />
                    Avaliar Prestador
                  </button>
                ) : (
                  <div className="bg-gray-100/85 text-xs text-text-secondary px-5 py-3 rounded-2xl font-bold border border-gray-200">
                    {userRole === 'professional' ? (
                      <span>🔒 Apenas clientes contratantes podem postar comentários nesta página.</span>
                    ) : (
                      <span>🔒 Acesse como Contratante para avaliar e comentar sobre prestadores.</span>
                    )}
                  </div>
                )}
              </div>

              {reviewSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl mb-6 flex items-center gap-2 text-sm font-semibold animate-fade-in">
                  <span className="bg-emerald-500 text-white rounded-full p-1"><Check size={12} /></span>
                  {reviewSuccessMsg}
                </div>
              )}

              {/* Review Write Form Block */}
              <AnimatePresence>
                {isWritingReview && userRole === 'client' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-50 rounded-3xl p-8 border border-gray-200 mb-10 shadow-sm"
                    id="write-review-form-container"
                  >
                    <h4 className="text-lg font-black text-text-title mb-4 uppercase tracking-wide">Nova Avaliação</h4>
                    <form onSubmit={handleAddNewReview} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Seu Nome Completo</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="Ex: Ana Maria Silva"
                            value={newReviewName}
                            onChange={(e) => setNewReviewName(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-blue-depth/20 outline-none font-medium text-text-title"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider font-semibold">Sua Nota (1 a 5 estrelas)</label>
                          <div className="flex items-center gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button 
                                key={star}
                                type="button"
                                onClick={() => setNewReviewRating(star)}
                                className="focus:outline-none transition-transform hover:scale-125"
                              >
                                <Star 
                                  size={28} 
                                  className={star <= newReviewRating ? "fill-brand-blue-depth text-brand-blue-depth" : "text-gray-300"} 
                                />
                              </button>
                            ))}
                            <span className="text-sm font-bold ml-2 text-text-title bg-white p-2 rounded-lg border border-gray-200">{newReviewRating} / 5</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider font-semibold">Seu Comentário Público</label>
                        <textarea 
                          required 
                          rows={4}
                          placeholder="Fale um pouco sobre o serviço realizado por este prestador..."
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-blue-depth/20 outline-none font-medium text-text-title resize-none"
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button 
                          type="button" 
                          onClick={() => setIsWritingReview(false)}
                          className="px-5 py-3 rounded-xl font-bold text-gray-500 hover:text-text-title text-sm"
                        >
                          Cancelar
                        </button>
                        <button 
                          type="submit" 
                          className="bg-brand-blue-depth text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-95 text-sm filter drop-shadow"
                          id="btn-submit-review"
                        >
                          Publicar Avaliação
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stats bento-metric breakdown block */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-8 rounded-[2rem] border border-gray-100 mb-10">
                
                {/* Score panel */}
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mb-1">Média Geral</p>
                  <p className="text-6xl font-black text-brand-blue-depth mb-2">{averageRating.toFixed(1)}</p>
                  <div className="flex gap-1 mb-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < Math.round(averageRating) ? "fill-brand-blue-depth text-brand-blue-depth" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-xs text-text-secondary mt-1 font-semibold">{reviewCount} avaliações recebidas</p>
                </div>

                {/* Bars column */}
                <div className="md:col-span-2 flex flex-col justify-center gap-3 py-2 px-1 md:px-8 border-t md:border-t-0 md:border-l border-gray-200/60">
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mb-1">Distribuição de notas</p>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const percentage = getStarPercentage(star);
                    return (
                      <div key={star} className="flex items-center gap-3 text-xs font-bold text-text-secondary">
                        <span className="w-4 text-right">{star}★</span>
                        <div className="flex-1 h-3 bg-gray-200/70 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-brand-green-sprout rounded-full transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-10 text-right text-gray-400 font-semibold">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6" id="reviews-list-rendered">
                {reviews.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-text-secondary text-sm">
                    Nenhuma avaliação postada ainda. Seja o primeiro a escrever um depoimento de serviço!
                  </div>
                ) : (
                  reviews.map((review) => {
                    // Filter replies directly linked to this specific review ID
                    const reviewReplies = replies.filter(rep => rep.reviewId === review.id);

                    return (
                      <div 
                        key={review.id} 
                        className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col"
                        id={`review-card-${review.id}`}
                      >
                        {/* Reviewer Header */}
                        <div className="flex items-start justify-between gap-2 mb-4">
                          <div className="flex items-center gap-3.5">
                            {/* Avatar icon */}
                            <div className="w-12 h-12 rounded-full bg-brand-blue-depth/5 border border-brand-blue-depth/10 flex items-center justify-center text-brand-blue-depth font-black text-sm uppercase">
                              {review.reviewerName ? review.reviewerName.charAt(0) : 'U'}
                            </div>
                            <div>
                              <h5 className="font-extrabold text-text-title text-base">{review.reviewerName}</h5>
                              <div className="flex items-center gap-2 mt-0.5">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={12} 
                                      className={i < review.rating ? "fill-brand-blue-depth text-brand-blue-depth" : "text-gray-200"} 
                                    />
                                  ))}
                                </div>
                                <span className="text-[10px] text-gray-400">• &nbsp; {new Date(review.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                              </div>
                            </div>
                          </div>

                          <span className="bg-brand-blue-depth/5 text-brand-blue-depth text-xs font-black px-2.5 py-1 rounded-lg">
                            Nota: {review.rating} / 5
                          </span>
                        </div>

                        {/* Review Content */}
                        <p className="text-text-body text-sm leading-relaxed mb-6 bg-gray-50/30 p-4 rounded-xl">
                          "{review.comment}"
                        </p>

                        {/* Replies Section */}
                        {reviewReplies.length > 0 && (
                          <div className="space-y-4 mb-6 relative">
                            {/* Visual Nested Indent Thread Line on left */}
                            <div className="absolute top-0 bottom-0 left-6 border-l-2 border-brand-green-sprout/20 pointer-events-none" />
                            
                            {reviewReplies.map((reply) => (
                              <div 
                                key={reply.id} 
                                className="ml-10 bg-brand-green-sprout/5 border border-brand-green-sprout/10 rounded-2xl p-5 relative"
                                id={`reply-card-${reply.id}`}
                              >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-2">
                                    <CornerDownRight size={16} className="text-brand-green-sprout" />
                                    <span className="font-black text-xs text-brand-green-sprout uppercase tracking-wider flex items-center gap-1.5">
                                      <UserCheck size={12} />
                                      {reply.replierName}
                                      <span className="text-[9px] bg-brand-green-sprout text-white rounded px-1.5 py-0.5 lowercase font-semibold">prestador</span>
                                    </span>
                                  </div>
                                  <span className="text-[9px] text-gray-400 font-medium">Replicado em {new Date(reply.createdAt).toLocaleDateString('pt-BR')}</span>
                                </div>
                                <p className="text-text-body text-xs leading-relaxed pl-6">
                                  {reply.message}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Inline Toggle Reply Submitting Interface */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                          <span className="text-xs text-gray-400 font-semibold">Dúvidas ou agradecimentos</span>
                          
                          {userRole === 'professional' ? (
                            activeReplyFormReviewId !== review.id ? (
                              <button 
                                onClick={() => {
                                  setActiveReplyFormReviewId(review.id);
                                  setNewReplyName(professional.name); 
                                }}
                                className="text-xs font-bold text-brand-blue-depth hover:text-brand-green-sprout transition-colors flex items-center gap-1 bg-gray-100/80 px-3 py-1.5 rounded-xl hover:bg-gray-100"
                                id={`trigger-reply-btn-${review.id}`}
                              >
                                <CornerDownRight size={14} />
                                Responder como Prestador
                              </button>
                            ) : (
                              <button 
                                onClick={() => setActiveReplyFormReviewId(null)}
                                className="text-xs font-bold text-gray-400 hover:text-red-500 transition-all font-semibold"
                              >
                                Fechar Campos
                              </button>
                            )
                          ) : (
                            <span className="text-[10px] text-gray-400 font-semibold italic">
                              Apenas o dono do perfil pode enviar respostas.
                            </span>
                          )}
                        </div>

                        {/* Animated reply submission card form */}
                        <AnimatePresence>
                          {activeReplyFormReviewId === review.id && userRole === 'professional' && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden mt-4"
                              id={`reply-box-form-${review.id}`}
                            >
                              <form onSubmit={(e) => handleAddNewReply(e, review.id)} className="bg-gray-50 border border-gray-200 p-5 rounded-2xl space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Assinando como:</label>
                                    <input 
                                      type="text" 
                                      required
                                      disabled
                                      value={newReplyName}
                                      className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-text-title outline-none"
                                    />
                                    <p className="text-[9px] text-gray-400 mt-1">Sua resposta oficial em nome deste perfil profissional.</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Sua Resposta de Agradecimento/Esclarecimento</label>
                                  <textarea 
                                    required 
                                    rows={2}
                                    placeholder="Escreva seu agradecimento sincero ou resposta técnica às dúvidas do cliente..."
                                    value={newReplyMessage}
                                    onChange={(e) => setNewReplyMessage(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-text-title outline-none focus:ring-1 focus:ring-brand-blue-depth/20 resize-none animate-none"
                                  />
                                </div>
                                <div className="flex justify-end gap-2 text-xs font-medium pt-2">
                                  <button 
                                    type="button" 
                                    onClick={() => setActiveReplyFormReviewId(null)}
                                    className="px-3 py-2 text-gray-400 hover:text-text-title"
                                  >
                                    Cancelar
                                  </button>
                                  <button 
                                    type="submit"
                                    className="bg-brand-green-sprout text-white px-4 py-2 rounded-lg font-bold flex items-center gap-1 shadow-sm hover:brightness-95"
                                  >
                                    Responder <Send size={12} />
                                  </button>
                                </div>
                              </form>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Right Column Card */}
          <div className="w-full lg:w-80 bg-[#F4F7F9] rounded-[2.5rem] p-10 lg:sticky lg:top-32 border border-gray-100 shadow-sm h-fit">
            <h3 className="text-xl font-black mb-8 text-center tracking-tight text-text-title uppercase">Conectar Agora</h3>
            <div className="space-y-4">
              
              {/* Primary Premium contact point directed straight to wa.me */}
              <button 
                onClick={() => onContact(professional)}
                className="w-full bg-brand-green-sprout hover:bg-opacity-95 text-white py-5 rounded-2xl font-black shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                id="btn-whatsapp-direct"
              >
                <Phone size={20} />
                WhatsApp (wa.me)
              </button>
              
              <div className="pt-6 border-t border-gray-200 mt-6 lg:pb-2">
                <div className="flex items-center gap-3 text-text-secondary mb-4">
                    <Mail size={18} />
                    <span className="text-xs font-bold text-gray-500">verificado@oportuniza.org</span>
                </div>
                <div className="bg-white p-5 rounded-2xl text-[10px] text-gray-400 font-medium leading-relaxed italic border border-gray-50">
                  "Oportuniza prioriza o contato direto por WhatsApp (wa.me) para simplificar orçamentos sem intermediários em Capela do Alto e cidades próximas."
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
