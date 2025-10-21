import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 animate-fade-in">
            Вкусная еда с доставкой на дом
          </h2>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Большой выбор блюд от лучших ресторанов вашего города. 
            Доставим за 30 минут или вернём деньги!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button size="lg" className="text-lg px-8 py-6 gap-2">
              <Icon name="ShoppingBag" size={24} />
              Выбрать блюда
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 gap-2">
              <Icon name="Phone" size={24} />
              Позвонить
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
