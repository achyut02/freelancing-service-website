import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone?: string;
          role: 'user' | 'provider' | 'admin';
          avatar_url?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          phone?: string;
          role?: 'user' | 'provider' | 'admin';
          avatar_url?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string;
          role?: 'user' | 'provider' | 'admin';
          avatar_url?: string;
          created_at?: string;
        };
      };
      service_providers: {
        Row: {
          id: string;
          user_id: string;
          business_name: string;
          description: string;
          category: string;
          location: string;
          phone: string;
          email: string;
          website?: string;
          rating: number;
          total_reviews: number;
          price_range: string;
          availability_schedule: any;
          images: string[];
          services: string[];
          verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          business_name: string;
          description: string;
          category: string;
          location: string;
          phone: string;
          email: string;
          website?: string;
          rating?: number;
          total_reviews?: number;
          price_range: string;
          availability_schedule?: any;
          images?: string[];
          services?: string[];
          verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          business_name?: string;
          description?: string;
          category?: string;
          location?: string;
          phone?: string;
          email?: string;
          website?: string;
          rating?: number;
          total_reviews?: number;
          price_range?: string;
          availability_schedule?: any;
          images?: string[];
          services?: string[];
          verified?: boolean;
          created_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          provider_id: string;
          service_type: string;
          appointment_date: string;
          appointment_time: string;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes?: string;
          total_cost?: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider_id: string;
          service_type: string;
          appointment_date: string;
          appointment_time: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes?: string;
          total_cost?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          provider_id?: string;
          service_type?: string;
          appointment_date?: string;
          appointment_time?: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes?: string;
          total_cost?: number;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          provider_id: string;
          booking_id?: string;
          rating: number;
          comment: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider_id: string;
          booking_id?: string;
          rating: number;
          comment: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          provider_id?: string;
          booking_id?: string;
          rating?: number;
          comment?: string;
          created_at?: string;
        };
      };
    };
  };
};