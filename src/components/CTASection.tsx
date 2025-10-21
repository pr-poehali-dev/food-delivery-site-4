import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary via-accent to-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 animate-fade-in">
            Голодны? Закажите прямо сейчас! 🍕
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in">
            Доставим свежую и вкусную еду за 30 минут или вернём деньги!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-xl"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="UtensilsCrossed" size={24} className="mr-2" />
              Выбрать блюда
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
            >
              <Icon name="Phone" size={24} className="mr-2" />
              Позвонить
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">30 мин</div>
              <div className="text-sm opacity-90">Доставка</div>
            </div>
            <div className="text-center border-x border-white/20">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-sm opacity-90">Блюд</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Поддержка</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
