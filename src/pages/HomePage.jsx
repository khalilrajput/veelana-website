import React from 'react';
import Hero from '../components/Hero';
import ScienceAnimation from '../components/ScienceAnimation';
import ValueGrid from '../components/ValueGrid';
import ProductShowcase from '../components/ProductShowcase';
import IngredientsGrid from '../components/IngredientsGrid';
import HowToUse from '../components/HowToUse';
import Testimonials from '../components/Testimonials';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <ScienceAnimation />
      <ValueGrid />
      <ProductShowcase />
      <IngredientsGrid />
      <HowToUse />
      <Testimonials />
    </div>
  );
}
