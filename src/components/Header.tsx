import { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  cartComponent?: ReactNode;
}

const Header = ({ cartComponent }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-primary via-secondary to-primary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="UtensilsCrossed" size={32} className="text-white" />
            <h1 className="text-2xl font-heading font-bold text-white">FoodExpress</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#catalog" className="text-white hover:text-white/80 font-medium transition-colors">
              Меню
            </a>
            <a href="#about" className="text-white hover:text-white/80 font-medium transition-colors">
              О нас
            </a>
            <a href="#delivery" className="text-white hover:text-white/80 font-medium transition-colors">
              Доставка
            </a>
            <a href="#contacts" className="text-white hover:text-white/80 font-medium transition-colors">
              Контакты
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {cartComponent}
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Icon name="User" size={24} />
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            {cartComponent}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-3 pb-2">
            <a href="#catalog" className="text-white hover:text-white/80 font-medium py-2 transition-colors">
              Меню
            </a>
            <a href="#about" className="text-white hover:text-white/80 font-medium py-2 transition-colors">
              О нас
            </a>
            <a href="#delivery" className="text-white hover:text-white/80 font-medium py-2 transition-colors">
              Доставка
            </a>
            <a href="#contacts" className="text-white hover:text-white/80 font-medium py-2 transition-colors">
              Контакты
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
