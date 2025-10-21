import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const categories = [
  { id: 'all', name: 'Все', icon: 'Utensils' },
  { id: 'pizza', name: 'Пицца', icon: 'Pizza' },
  { id: 'sushi', name: 'Суши', icon: 'Fish' },
  { id: 'burgers', name: 'Бургеры', icon: 'Beef' },
  { id: 'desserts', name: 'Десерты', icon: 'Cake' },
];

const dishes = [
  {
    id: 1,
    name: 'Маргарита',
    category: 'pizza',
    price: 690,
    image: 'https://cdn.poehali.dev/projects/47b4565b-1af5-4f01-969e-75514b96c0e8/files/1bb0b546-3ccf-41f6-bd58-5649d0e5b683.jpg',
    description: 'Томаты, моцарелла, базилик',
    popular: true,
  },
  {
    id: 2,
    name: 'Пепперони',
    category: 'pizza',
    price: 790,
    image: 'https://cdn.poehali.dev/projects/47b4565b-1af5-4f01-969e-75514b96c0e8/files/1bb0b546-3ccf-41f6-bd58-5649d0e5b683.jpg',
    description: 'Пепперони, моцарелла, томатный соус',
    popular: true,
  },
  {
    id: 3,
    name: 'Филадельфия',
    category: 'sushi',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/47b4565b-1af5-4f01-969e-75514b96c0e8/files/f4f85797-e7a0-4aea-9638-a2d0dc94d78e.jpg',
    description: 'Лосось, сливочный сыр, огурец',
    popular: true,
  },
  {
    id: 4,
    name: 'Калифорния',
    category: 'sushi',
    price: 790,
    image: 'https://cdn.poehali.dev/projects/47b4565b-1af5-4f01-969e-75514b96c0e8/files/f4f85797-e7a0-4aea-9638-a2d0dc94d78e.jpg',
    description: 'Краб, авокадо, огурец, икра тобико',
  },
  {
    id: 5,
    name: 'Чизбургер',
    category: 'burgers',
    price: 590,
    image: 'https://cdn.poehali.dev/projects/47b4565b-1af5-4f01-969e-75514b96c0e8/files/1da7ed1f-11e7-4f16-97a1-73dc11169c34.jpg',
    description: 'Говяжья котлета, чеддер, соус',
  },
  {
    id: 6,
    name: 'Двойной бургер',
    category: 'burgers',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/47b4565b-1af5-4f01-969e-75514b96c0e8/files/1da7ed1f-11e7-4f16-97a1-73dc11169c34.jpg',
    description: 'Две котлеты, двойной сыр, бекон',
    popular: true,
  },
  {
    id: 7,
    name: 'Чизкейк',
    category: 'desserts',
    price: 390,
    image: '/placeholder.svg',
    description: 'Нежный сырный торт с ягодным соусом',
  },
  {
    id: 8,
    name: 'Тирамису',
    category: 'desserts',
    price: 490,
    image: '/placeholder.svg',
    description: 'Классический итальянский десерт',
  },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (dish: typeof dishes[0]) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, quantity: 1, image: dish.image }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-primary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-2xl shadow-lg">
                <Icon name="UtensilsCrossed" size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  FoodExpress
                </h1>
                <p className="text-xs text-muted-foreground">Доставка за 30 минут</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#menu" className="text-foreground hover:text-primary transition-colors font-semibold">
                Меню
              </a>
              <a href="#delivery" className="text-foreground hover:text-primary transition-colors font-semibold">
                Доставка
              </a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors font-semibold">
                FAQ
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-semibold">
                Контакты
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative border-2 hover:border-primary hover:bg-primary/5">
                    <Icon name="ShoppingCart" size={22} />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-primary animate-scale-in">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg flex flex-col bg-gradient-to-br from-orange-50 to-amber-50">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-heading flex items-center gap-2">
                      <Icon name="ShoppingBag" size={24} className="text-primary" />
                      Ваш заказ
                    </SheetTitle>
                  </SheetHeader>

                  {cartItems.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4 opacity-30" />
                      <h3 className="text-xl font-heading font-bold mb-2">Корзина пуста</h3>
                      <p className="text-muted-foreground mb-4">Добавьте вкусные блюда из меню</p>
                      <Button onClick={() => setIsCartOpen(false)} className="bg-primary hover:bg-primary/90">
                        Перейти к меню
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-y-auto py-4 space-y-3">
                        {cartItems.map((item) => (
                          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all border-2 border-transparent hover:border-primary/20">
                            <CardContent className="p-3 flex gap-3">
                              <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-heading font-bold text-base mb-1 truncate">
                                  {item.name}
                                </h4>
                                <p className="text-xl font-bold text-primary mb-2">
                                  {item.price * item.quantity} ₽
                                </p>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 border-2"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 border-2"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="flex-shrink-0 text-destructive hover:bg-destructive/10"
                                onClick={() => removeItem(item.id)}
                              >
                                <Icon name="Trash2" size={18} />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="border-t-2 border-primary/20 pt-4 space-y-4 bg-white rounded-2xl p-4 shadow-lg">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Товаров:</span>
                            <span className="font-semibold">{totalItems} шт</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Доставка:</span>
                            <span className="font-semibold text-accent">Бесплатно</span>
                          </div>
                          <div className="border-t-2 pt-3 flex justify-between items-center">
                            <span className="text-lg font-heading font-bold">Итого:</span>
                            <span className="text-3xl font-heading font-bold text-primary">
                              {totalPrice} ₽
                            </span>
                          </div>
                        </div>

                        <Button
                          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg hover:shadow-xl transition-all"
                          onClick={() => {
                            alert(`Заказ на ${totalPrice} ₽ успешно оформлен! 🎉\n\nМы свяжемся с вами в ближайшее время.`);
                            setCartItems([]);
                            setIsCartOpen(false);
                          }}
                        >
                          <Icon name="CreditCard" size={22} className="mr-2" />
                          Оформить заказ
                        </Button>
                        
                        <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                          <Icon name="Truck" size={14} />
                          Доставим за 30 минут или вернём деньги
                        </p>
                      </div>
                    </>
                  )}
                </SheetContent>
              </Sheet>

              <Button className="hidden md:flex bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-bold shadow-md">
                <Icon name="Phone" size={18} className="mr-2" />
                Позвонить
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-heading font-extrabold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
              Вкусная еда с доставкой за 30 минут
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 mb-10 font-medium">
              Свежие блюда от лучших поваров города. Быстро, вкусно, всегда горячее!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="relative w-full sm:w-96">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Найти блюдо..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base border-2 focus:border-primary"
                />
              </div>
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-10 h-14 text-base font-bold shadow-lg">
                <Icon name="Sparkles" size={20} className="mr-2" />
                Найти
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md">
                <Icon name="Clock" size={24} className="text-primary" />
                <span className="font-semibold">Доставка 30 мин</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md">
                <Icon name="ShieldCheck" size={24} className="text-accent" />
                <span className="font-semibold">Гарантия качества</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md">
                <Icon name="Sparkles" size={24} className="text-secondary" />
                <span className="font-semibold">Свежие продукты</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">Наше меню</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Выбирайте из более 100 блюд</p>
          
          <div className="flex gap-3 overflow-x-auto pb-4 mb-12 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap transition-all border-2 font-semibold ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                    : 'hover:scale-105 hover:border-primary'
                }`}
              >
                <Icon name={category.icon} size={20} />
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDishes.map((dish, index) => (
              <Card
                key={dish.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-scale-in border-2 hover:border-primary/30"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {dish.popular && (
                    <Badge className="absolute top-3 right-3 bg-primary text-white shadow-lg">
                      <Icon name="Flame" size={14} className="mr-1" />
                      Хит продаж
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-heading font-bold text-xl mb-2">{dish.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-heading font-bold text-primary">{dish.price} ₽</span>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-bold shadow-md"
                      onClick={() => addToCart(dish)}
                    >
                      <Icon name="Plus" size={16} className="mr-1" />
                      Заказать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDishes.length === 0 && (
            <div className="text-center py-20">
              <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-2xl font-heading font-bold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">Попробуйте изменить запрос или выбрать другую категорию</p>
            </div>
          )}
        </div>
      </section>

      <section id="delivery" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-16">Как мы работаем</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: 'ShoppingCart', title: 'Выберите блюда', desc: 'Добавьте понравившиеся блюда в корзину' },
                { icon: 'CreditCard', title: 'Оформите заказ', desc: 'Укажите адрес и способ оплаты' },
                { icon: 'Truck', title: 'Получите доставку', desc: 'Курьер привезёт заказ за 30 минут' },
              ].map((step, i) => (
                <Card key={i} className="text-center p-8 hover:shadow-xl transition-shadow border-2">
                  <div className="bg-gradient-to-br from-primary to-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon name={step.icon as any} size={36} className="text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">Частые вопросы</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Ответы на популярные вопросы</p>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border-2 rounded-xl px-6 bg-muted/30">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Какая минимальная сумма заказа?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Минимальная сумма заказа — 500 рублей. Доставка бесплатная при заказе от 1000 рублей.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-2 rounded-xl px-6 bg-muted/30">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Как быстро вы доставляете?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Средне время доставки — 30 минут. Если опоздаем, вернём деньги за доставку.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border-2 rounded-xl px-6 bg-muted/30">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Какие способы оплаты доступны?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Принимаем наличные, банковские карты и оплату онлайн через СБП.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border-2 rounded-xl px-6 bg-muted/30">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Есть ли у вас акции и скидки?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да! Скидка 15% на первый заказ по промокоду FIRST15. Следите за акциями в социальных сетях.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">Свяжитесь с нами</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Есть вопросы? Напишите нам!</p>
            
            <Card className="p-8 shadow-xl border-2">
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base font-semibold">Ваше имя</Label>
                  <Input id="name" placeholder="Иван Иванов" className="mt-2 h-12 border-2" />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-base font-semibold">Телефон</Label>
                  <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" className="mt-2 h-12 border-2" />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-base font-semibold">Email</Label>
                  <Input id="email" type="email" placeholder="ivan@example.com" className="mt-2 h-12 border-2" />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-base font-semibold">Сообщение</Label>
                  <Textarea id="message" placeholder="Ваше сообщение..." rows={5} className="mt-2 border-2" />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
                  }}
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить сообщение
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                  <Icon name="UtensilsCrossed" size={28} />
                </div>
                <h3 className="text-2xl font-heading font-bold">FoodExpress</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Доставка вкусной еды быстро и с заботой о вас. Всегда свежие продукты и горячие блюда.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-4 text-secondary">Меню</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#menu" className="hover:text-primary transition-colors">Пицца</a></li>
                <li><a href="#menu" className="hover:text-primary transition-colors">Суши</a></li>
                <li><a href="#menu" className="hover:text-primary transition-colors">Бургеры</a></li>
                <li><a href="#menu" className="hover:text-primary transition-colors">Десерты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-4 text-secondary">Информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#delivery" className="hover:text-primary transition-colors">О доставке</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-4 text-secondary">Контакты</h4>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={18} className="text-primary" />
                  +7 (800) 555-35-35
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={18} className="text-primary" />
                  info@foodexpress.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} className="text-primary" />
                  Москва, ул. Примерная, 123
                </p>
              </div>
              
              <div className="mt-6">
                <h5 className="font-semibold mb-3">Мы в соцсетях</h5>
                <div className="flex gap-3">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary hover:bg-white/10 rounded-full">
                    <Icon name="Instagram" size={22} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary hover:bg-white/10 rounded-full">
                    <Icon name="Facebook" size={22} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary hover:bg-white/10 rounded-full">
                    <Icon name="Send" size={22} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p className="mb-2">&copy; 2024 FoodExpress. Все права защищены.</p>
            <p className="text-sm">Лицензия на осуществление деятельности № 123456789</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
