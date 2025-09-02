import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';

type ServiceProvider = Database['public']['Tables']['service_providers']['Row'];

interface SearchFilters {
  category?: string;
  location?: string;
  priceRange?: string;
  rating?: number;
  search?: string;
}

export const useServiceProviders = (filters: SearchFilters = {}) => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProviders();
  }, [filters]);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('service_providers')
        .select('*')
        .eq('verified', true);

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters.priceRange) {
        query = query.eq('price_range', filters.priceRange);
      }

      if (filters.rating) {
        query = query.gte('rating', filters.rating);
      }

      if (filters.search) {
        query = query.or(`business_name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query.order('rating', { ascending: false });

      if (error) throw error;
      setProviders(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { providers, loading, error, refetch: fetchProviders };
};