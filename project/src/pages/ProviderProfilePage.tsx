import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Phone, Mail, Globe, Calendar, Clock, CheckCircle } from 'lucide-react';

const ProviderProfilePage: React.FC = () => {
  const { id } = useParams();

  // Mock data - in real app this would come from API
  const provider = {
    id: '1',
    businessName: 'Clean Pro Services',
    category: 'Home Services',
    rating: 4.8,
    totalReviews: 156,
    location: 'New York, NY',
    phone: '+1 (555) 123-4567',
    email: 'contact@cleanpro.com',
    website: 'https://cleanpro.com',
    description: 'Professional cleaning services for homes and offices. We provide reliable, thorough cleaning with eco-friendly products and experienced staff.',
    services: ['House Cleaning', 'Office Cleaning', 'Deep Cleaning', 'Post-Construction Cleanup'],
    priceRange: '$$',
    verified: true,
    images: [
      'https://images.pexels.com/photos/4099468/pexels-photo-4099468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7641821/pexels-photo-7641821.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed',
    },
  };

  const reviews = [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent service! Very professional and thorough. My house has never been cleaner.',
      date: '2025-01-10',
    },
    {
      id: '2',
      customerName: 'Mike Davis',
      rating: 4,
      comment: 'Good work overall. Arrived on time and did a solid job. Would recommend.',
      date: '2025-01-08',
    },
    {
      id: '3',
      customerName: 'Emily Chen',
      rating: 5,
      comment: 'Amazing attention to detail. They cleaned areas I didn\'t even think about!',
      date: '2025-01-05',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                <div className="flex-shrink-0 mb-6 md:mb-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {provider.businessName.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h1 className="text-3xl font-bold text-gray-900 mr-3">
                      {provider.businessName}
                    </h1>
                    {provider.verified && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-4">{provider.category}</p>
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(provider.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-lg font-semibold text-gray-900">
                        {provider.rating}
                      </span>
                      <span className="ml-1 text-gray-600">({provider.totalReviews} reviews)</span>
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      {provider.priceRange}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{provider.location}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{provider.description}</p>
                </div>
              </div>
            </motion.div>

            {/* Photo Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {provider.images.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt={`${provider.businessName} gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {provider.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-100"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-blue-900">{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 sticky top-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 mr-3 text-blue-600" />
                  <span>{provider.phone}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 mr-3 text-blue-600" />
                  <span>{provider.email}</span>
                </div>
                {provider.website && (
                  <div className="flex items-center text-gray-700">
                    <Globe className="w-5 h-5 mr-3 text-blue-600" />
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200">
                  <Calendar className="w-4 h-4 mr-2 inline" />
                  Book Appointment
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200">
                  <Phone className="w-4 h-4 mr-2 inline" />
                  Call Now
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200">
                  <Mail className="w-4 h-4 mr-2 inline" />
                  Send Message
                </button>
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Business Hours
              </h3>
              <div className="space-y-2">
                {Object.entries(provider.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-gray-700 capitalize font-medium">{day}</span>
                    <span className="text-gray-600">{hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfilePage;