import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FoodCatalog from '@/components/FoodCatalog';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      <Hero />
      <FoodCatalog 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </div>
  );
};

export default Index;
