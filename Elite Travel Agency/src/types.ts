export type ActiveTab = 'home' | 'gallery' | 'bookings' | 'packages' | 'ai-agent' | 'about' | 'contact' | 'help';

export interface TravelPackage {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  vibe: 'Abyss' | 'Cybercity' | 'Celestial' | 'Sovereign' | 'Eco-Dome';
  neonColor: 'blue' | 'pink' | 'green' | 'purple';
  highlights: string[];
  description: string;
  perks: string[];
}

export interface BookingFormState {
  destinationId: string;
  fullName: string;
  email: string;
  departureDate: string;
  durationDays: number;
  classTier: 'standard' | 'orbital' | 'quantum';
  quantumShielding: boolean;
  neuralTranslation: boolean;
  companionCount: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'technology' | 'logistics';
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  description: string;
  vibe: 'Cybercity' | 'Abyss' | 'Celestial' | 'Sovereign' | 'Eco-Dome';
  coordinates: string;
}
