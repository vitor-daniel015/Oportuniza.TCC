import { Professional, Opportunity, Review, ReviewReply } from './types';

export const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Lauro Domingues Neto',
    specialty: 'Pedreiro',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a1cd43a7?q=80&w=400&auto=format&fit=crop',
    location: 'Capela do Alto - SP',
    description: 'Especialista em alvenaria, rebocagem e acabamentos finos. Mais de 15 anos de experiência em reformas residenciais.'
  },
  {
    id: '2',
    name: 'Ana Carolina Souza',
    specialty: 'Faxineira',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?q=80&w=400&auto=format&fit=crop',
    location: 'Sorocaba - SP',
    description: 'Limpeza residencial e comercial. Organização de ambientes e cuidado com móveis delicados. Pontualidade garantida.'
  },
  {
    id: '3',
    name: 'Roberto Silva',
    specialty: 'Encanador',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1517033284163-f30a944062cb?q=80&w=400&auto=format&fit=crop',
    location: 'Capela do Alto - SP',
    description: 'Instalações hidráulicas, reparo de vazamentos e manutenção de caixas d\'água. Trabalho rápido e limpo.'
  },
  {
    id: '4',
    name: 'Marcos Vinicius',
    specialty: 'Pedreiro',
    rating: 3.8,
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=400&auto=format&fit=crop',
    location: 'Iperó - SP',
    description: 'Construção civil básica, telhados e muros. Preços competitivos e agilidade na entrega da obra.'
  },
  {
    id: '5',
    name: 'Sueli Pereira',
    specialty: 'Baba',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    location: 'Capela do Alto - SP',
    description: 'Cuidado infantil com muito carinho e responsabilidade. Experiência com todas as idades.'
  },
  {
    id: '6',
    name: 'Darcy Carriel',
    specialty: 'Efetiva',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    location: 'Capela do Alto - SP',
    description: 'Profissional de limpeza e governança doméstica contratada para serviços mensais e diários de grande eficiência. Especialização em organização técnica residencial, lavanderia profissional e conservação de ambientes de alto padrão.'
  }
];

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Contrata-se um pedreiro',
    description: 'Preciso de um profissional para reforma de muro externo e pintura.',
    price: 'A combinar',
    location: 'Capela do Alto - SP, Porto, Rua Lydia Plan Souza, 99',
    imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a1cd43a7?q=80&w=400&auto=format&fit=crop',
    category: 'Pedreiro',
    clientId: 'client_1',
    status: 'open',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Contrata-se uma faxineira',
    description: 'Limpeza pesada pós-obra em apartamento de 3 quartos.',
    price: 'R$ 350,00',
    location: 'Sorocaba - SP, Centro',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?q=80&w=400&auto=format&fit=crop',
    category: 'Faxineira',
    clientId: 'client_2',
    status: 'open',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Manutenção Hidráulica',
    description: 'Vazamento em pia de cozinha e troca de torneira.',
    price: 'R$ 150,00',
    location: 'Capela do Alto - SP',
    imageUrl: 'https://images.unsplash.com/photo-1517033284163-f30a944062cb?q=80&w=400&auto=format&fit=crop',
    category: 'Encanador',
    clientId: 'client_1',
    status: 'open',
    createdAt: new Date().toISOString()
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev_1_1',
    professionalId: '1',
    reviewerName: 'Claudio Antunes',
    rating: 5,
    comment: 'Trabalho excelente no reboco e assentamento de tijolos. Lauro é extremamente pontual e organizado. Recomendo fortemente!',
    createdAt: '2026-04-10T14:30:00Z'
  },
  {
    id: 'rev_1_2',
    professionalId: '1',
    reviewerName: 'Mariana Lima',
    rating: 4,
    comment: 'Gostei muito da reforma do banheiro. Deixou tudo bem nivelado e as tomadas instaladas de forma correta. Demorou só um dia a mais que o previsto por conta da chuva, mas valeu a pena.',
    createdAt: '2026-04-20T10:15:00Z'
  },
  {
    id: 'rev_2_1',
    professionalId: '2',
    reviewerName: 'Juliana Ferreira',
    rating: 5,
    comment: 'Ana fez uma faxina impecável! Limpou até onde eu nem sabia que dava pra limpar. Pretendo contratá-la semanalmente.',
    createdAt: '2026-05-02T16:45:00Z'
  },
  {
    id: 'rev_3_1',
    professionalId: '3',
    reviewerName: 'Felipe Ramos',
    rating: 4,
    comment: 'Resolveu um vazamento crítico na pia da cozinha. O atendimento foi rápido e o valor justo.',
    createdAt: '2026-05-11T09:00:00Z'
  },
  {
    id: 'rev_4_1',
    professionalId: '4',
    reviewerName: 'Thiago Mendes',
    rating: 3.8,
    comment: 'Levantou o muro com rapidez. Apenas houve uma pequena falha no acabamento da calçada, mas ele se prontificou a regularizar.',
    createdAt: '2026-05-14T11:20:00Z'
  },
  {
    id: 'rev_5_1',
    professionalId: '5',
    reviewerName: 'Camila Rocha',
    rating: 5,
    comment: 'A Sueli é um anjo! Cuidou do meu filhinho de 2 anos com um carinho sem igual. Extremamente atenciosa.',
    createdAt: '2026-05-18T18:00:00Z'
  },
  {
    id: 'rev_6_1',
    professionalId: '6',
    reviewerName: 'Julio Cesar Alencar',
    rating: 5,
    comment: 'A Darcy organizou minha casa de campo com um profissionalismo absurdo. Tudo limpo e impecável. Excelente!',
    createdAt: '2026-05-20T10:00:00Z'
  },
  {
    id: 'rev_6_2',
    professionalId: '6',
    reviewerName: 'Fernanda Portillo',
    rating: 4.8,
    comment: 'Muito caprichosa com a lavagem das roupas e cortinas. Recomendo os serviços dela.',
    createdAt: '2026-05-21T15:30:00Z'
  }
];

export const mockReviewReplies: ReviewReply[] = [
  {
    id: 'rep_1_1',
    reviewId: 'rev_1_1',
    replierName: 'Lauro Domingues Neto',
    message: 'Muito obrigado, Claudio! Sempre busco dar o meu melhor para garantir a segurança e beleza da construção.',
    createdAt: '2026-04-10T18:00:00Z'
  },
  {
    id: 'rep_1_2',
    reviewId: 'rev_1_2',
    replierName: 'Lauro Domingues Neto',
    message: 'Oi Mariana! Agradeço o feedback. Peço desculpas pelo atraso, realmente a chuva forte impediu a secagem do contra-piso externo. Fico feliz que gostou do resultado final!',
    createdAt: '2026-04-20T12:00:00Z'
  },
  {
    id: 'rep_2_1',
    reviewId: 'rev_2_1',
    replierName: 'Ana Carolina Souza',
    message: 'Obrigada, Juliana! Estarei à disposição sempre que precisar manter seu lar brilhando.',
    createdAt: '2026-05-02T19:30:00Z'
  }
];

