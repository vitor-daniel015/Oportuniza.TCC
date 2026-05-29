export interface Professional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  location: string;
  description: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  imageUrl: string;
  category: string;
  clientId: string;
  status: 'open' | 'closed';
  createdAt: string;
}

export interface ServiceRequest {
  id: string;
  opportunityId: string;
  professionalId: string;
  clientId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'professional';
  avatarUrl?: string;
  location?: string;
  bio?: string;
  specialty?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface Review {
  id: string;
  professionalId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewReply {
  id: string;
  reviewId: string;
  replierName: string;
  message: string;
  createdAt: string;
}
