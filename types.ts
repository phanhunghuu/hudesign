
export interface CurriculumItem {
  session: string;
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  suitableFor: string[];
  originalPrice: string;
  discountPrice: string;
  perks: string[];
  type: 'OFFLINE' | 'ONLINE';
  curriculum?: CurriculumItem[];
  isSpecial?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'Canva' | 'Photoshop' | 'Illustrator' | 'All';
  price: number;
  image: string;
  description: string;
  features: string[];
  reviewImages?: string[];
}

export interface FormData {
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
}

export interface AICustomPlan {
  estimatedSessions: number;
  estimatedPrice: string;
  syllabus: CurriculumItem[];
  reasoning: string;
}
