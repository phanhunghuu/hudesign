
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
  curriculum?: CurriculumItem[]; // Thuộc tính mới cho lộ trình học
}

export interface FormData {
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
}
