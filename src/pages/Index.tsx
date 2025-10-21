import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FoodCatalog from '@/components/FoodCatalog';
import Cart from '@/components/Cart';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: { id: number; name: string; price: number; image: string }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    alert('Функция оформления заказа в разработке!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header cartComponent={
        <Cart
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={handleCheckout}
        />
      } />
      <Hero />
      <FoodCatalog 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default Index;
