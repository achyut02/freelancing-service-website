import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart,
  Wrench,
  Dumbbell,
  Truck,
  Home,
  Trash2,
  Brain,
  Stethoscope,
} from 'lucide-react';

const ServiceCategories: React.FC = () => {
  const categories = [
    {
      id: 'healthcare',
      name: 'Healthcare',
      description: 'Doctors, dentists, specialists',
      icon: Stethoscope,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      count: '1,200+',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'home',
      name: 'Home Services',
      description: 'Electricians, plumbers, cleaners',
      icon: Wrench,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      count: '2,500+',
      image: 'https://images.pexels.com/photos/8293648/pexels-photo-8293648.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'fitness',
      name: 'Fitness & Wellness',
      description: 'Gyms, trainers, yoga studios',
      icon: Dumbbell,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      count: '800+',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'transportation',
      name: 'Transportation',
      description: 'Taxi, delivery, moving services',
      icon: Truck,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      count: '600+',
      image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'housing',
      name: 'Housing',
      description: 'Real estate, rentals, property',
      icon: Home,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      count: '450+',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'sanitation',
      name: 'Sanitation',
      description: 'Waste management, cleaning',
      icon: Trash2,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50',
      count: '300+',
      image: 'https://images.pexels.com/photos/4099468/pexels-photo-4099468.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'mental-health',
      name: 'Mental Health',
      description: 'Therapists, counselors, support',
      icon: Brain,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      count: '200+',
      image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'delivery',
      name: 'Delivery Services',
      description: 'Food, packages, courier',
      icon: Heart,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      count: '900+',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Explore Service Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Find trusted professionals across various service categories to meet all your needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/${category.id}`}
                  className="group block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-semibold text-gray-900">{category.count}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;