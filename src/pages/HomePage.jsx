import React from 'react';
import Hero from '../components/Hero';
import ScienceAnimation from '../components/ScienceAnimation';
import ValueGrid from '../components/ValueGrid';
import HairQuiz from '../components/HairQuiz';
import RoutineBuilder from '../components/RoutineBuilder';
import ProductShowcase from '../components/ProductShowcase';
import IngredientsGrid from '../components/IngredientsGrid';
import HowToUse from '../components/HowToUse';
import Testimonials from '../components/Testimonials';

export default function HomePage({ onOpenOrder }) {
  return (
    <div>
      <title>Veelana | Premium Herbal Hair Care Oil | 25+ Cold-Pressed Herbs Pakistan</title>
      <meta name="description" content="Buy Veelana Herbal Hair Care Oil - 25+ cold-pressed organic herbs for hair growth, hair fall solution, and scalp repair. 100% Vegan, Paraben Free. Order now with COD across Pakistan. Rs. 999" />
      <meta property="og:title" content="Veelana | Premium Herbal Hair Care Oil | 25+ Cold-Pressed Herbs Pakistan" />
      <meta property="og:description" content="Buy Veelana Herbal Hair Care Oil - 25+ cold-pressed organic herbs for hair growth, hair fall solution, and scalp repair. 100% Vegan, Paraben Free. Order now with COD across Pakistan. Rs. 999" />
      <meta property="og:url" content="https://www.veelana.online/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.veelana.online/assets/real_full_set_boxes.webp" />
      <meta name="twitter:title" content="Veelana | Premium Herbal Hair Care Oil | 25+ Cold-Pressed Herbs Pakistan" />
      <meta name="twitter:description" content="Buy Veelana Herbal Hair Care Oil - 25+ cold-pressed organic herbs for hair growth, hair fall solution, and scalp repair. 100% Vegan, Paraben Free. Order now with COD across Pakistan. Rs. 999" />
      <link rel="canonical" href="https://www.veelana.online/" />
      <Hero onOpenOrder={onOpenOrder} />
      <ScienceAnimation />
      <ValueGrid />
      <HairQuiz onOpenOrder={onOpenOrder} />
      <ProductShowcase onOpenOrder={onOpenOrder} />
      <RoutineBuilder onOpenOrder={onOpenOrder} />
      <IngredientsGrid />
      <HowToUse onOpenOrder={onOpenOrder} />
      <Testimonials />
    </div>
  );
}

