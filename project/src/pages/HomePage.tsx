import React from 'react';
import Hero from '../components/Home/Hero';
import ServiceCategories from '../components/Home/ServiceCategories';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <ServiceCategories />
    </div>
  );
};

export default HomePage;