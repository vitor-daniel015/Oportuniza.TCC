import { Professional, Opportunity } from '../types';

export const calculateMatchingScore = (userLocation: string, professional: Professional): number => {
  // Real matching logic would involve ML or distance calculation
  // For simulation, we check if categories match and if location is similar
  let score = 85; // Base score
  
  if (professional.location.includes(userLocation)) {
    score += 10;
  }
  
  // Random variance for simulation
  score += Math.floor(Math.random() * 5);
  
  return Math.min(score, 100);
};

export const getGeolocation = (): Promise<{ lat: number; lng: number; address: string }> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: -23.5147, lng: -47.7145, address: 'Capela do Alto, SP' });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({ 
            lat: position.coords.latitude, 
            lng: position.coords.longitude, 
            address: 'Vizinhança Detectada' 
          });
        },
        () => {
          resolve({ lat: -23.5147, lng: -47.7145, address: 'Capela do Alto, SP' });
        }
      );
    }
  });
};

export const verifyRating = (rating: number, count: number): { isVerified: boolean; label: string } => {
  if (count > 50 && rating > 4.5) {
    return { isVerified: true, label: 'Diamante' };
  }
  if (count > 20 && rating > 4.0) {
    return { isVerified: true, label: 'Verificado' };
  }
  return { isVerified: false, label: 'Iniciante' };
};
