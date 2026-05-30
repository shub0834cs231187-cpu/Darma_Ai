export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  subscription_plan: 'free' | 'pro' | 'premium' | 'enterprise';
  is_verified: boolean;
  created_at: string;
}

export interface SkinAnalysis {
  id: string;
  user_id: string;
  image_url: string;
  skin_score: number;
  hydration_score: number;
  acne_score: number;
  risk_score: number;
  skin_type: string;
  conditions: string[];
  recommendations: string[];
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  reviews_count: number;
  ingredients: Ingredient[];
  comedogenic_score: number;
  acne_triggers: string[];
  safe_ingredients: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  benefits: string[];
  risks: string[];
  comedogenic_level: number;
}

export interface Recommendation {
  id: string;
  user_id: string;
  skin_type: string;
  morning_routine: RoutineProduct[];
  night_routine: RoutineProduct[];
  weekly_routine: RoutineProduct[];
  created_at: string;
}

export interface RoutineProduct {
  product_id: string;
  product_name: string;
  step: number;
  time: string;
  reason: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url: string;
  category: string;
  author: string;
  published_at: string;
  views: number;
}

export interface Testimonial {
  id: string;
  user_name: string;
  role: string;
  content: string;
  rating: number;
  image_url: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billing_period: 'monthly' | 'yearly';
  features: string[];
  popular: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'replied';
  created_at: string;
}
