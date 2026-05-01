import { Professional, Opportunity } from './types';

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
