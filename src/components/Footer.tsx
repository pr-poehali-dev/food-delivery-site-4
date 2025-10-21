import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary via-accent to-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="UtensilsCrossed" size={32} />
              <h3 className="text-2xl font-heading font-bold">FoodExpress</h3>
            </div>
            <p className="text-white/80 mb-4">
              Доставка вкусной еды быстро и с заботой о вас. Работаем без выходных!
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                <Icon name="Twitter" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                <Icon name="Youtube" size={20} />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Меню</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Пицца</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Суши</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Бургеры</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Салаты</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Десерты</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Информация</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#about" className="hover:text-white transition-colors">О нас</a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-white transition-colors">Доставка и оплата</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Вопросы и ответы</a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-white transition-colors">Контакты</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Вакансии</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Контакты</h4>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={18} />
                <span>+7 (800) 555-35-35</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={18} />
                <span>info@foodexpress.ru</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="MapPin" size={18} />
                <span>г. Москва, ул. Примерная, 123</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Clock" size={18} />
                <span>Ежедневно с 10:00 до 23:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              &copy; 2024 FoodExpress. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
