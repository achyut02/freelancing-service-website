import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Star, Phone, Mail, Globe, Calendar } from 'lucide-react';
import { useServiceProviders } from '../../hooks/useServiceProviders';
import { Link } from 'react-router-dom';

type Props = { initialCategory?: string };

const SearchResults: React.FC<Props> = ({ initialCategory }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [category, setCategory] = useState(initialCategory || searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('priceRange') || '');
  const [rating, setRating] = useState(Number(searchParams.get('rating') || 0));

  const filters = {
    search: searchQuery,
    location,
    category,
    priceRange,
    rating: rating > 0 ? rating : undefined,
  };

  const { providers, loading, error } = useServiceProviders(filters);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (location) params.set('location', location);
    if (category) params.set('category', category);
    if (priceRange) params.set('priceRange', priceRange);
    if (rating > 0) params.set('rating', rating.toString());
    setSearchParams(params);
  }, [searchQuery, location, category, priceRange, rating, setSearchParams]);

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    'healthcare',
    'home',
    'fitness',
    'transportation',
    'housing',
    'sanitation',
    'mental-health',
    'delivery',
  ];

  const priceRanges = ['$', '$$', '$$$', '$$$$'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Prices</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Minimum Rating:</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(rating === star ? 0 : star)}
                    className={`p-1 ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    } hover:text-yellow-400 transition-colors duration-200`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </form>
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={cat}
                          checked={category === cat}
                          onChange={(e) => setCategory(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">
                          {cat.replace('-', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Results List */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-300 rounded-xl"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">Error loading providers: {error}</p>
              </div>
            ) : providers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No service providers found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {providers.map((provider, index) => (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {provider.business_name.charAt(0)}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {provider.business_name}
                            </h3>
                            <p className="text-gray-600 capitalize">{provider.category.replace('-', ' ')}</p>
                          </div>
                          <div className="flex items-center mt-2 md:mt-0">
                            <div className="flex items-center mr-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm font-medium text-gray-900">
                                {provider.rating.toFixed(1)}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              ({provider.total_reviews} reviews)
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-2">{provider.description}</p>

                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{provider.location}</span>
                          </div>
                          <div className="text-sm font-medium text-green-600">
                            {provider.price_range}
                          </div>
                          {provider.verified && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Verified
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {provider.services.slice(0, 3).map((service) => (
                            <span
                              key={service}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {service}
                            </span>
                          ))}
                          {provider.services.length > 3 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{provider.services.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Link
                            to={`/provider/${provider.id}`}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
                          >
                            View Profile
                          </Link>
                          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </button>
                          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;