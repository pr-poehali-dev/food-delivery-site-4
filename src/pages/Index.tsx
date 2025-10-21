import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const filteredDishes = dishes.filter((dish) => {
    return selectedCategory === 'all' || dish.category === selectedCategory;
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b-2 border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-secondary p-2.5 rounded-2xl shadow-lg">
                <Icon name="UtensilsCrossed" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  FoodExpress
                </h1>
                <p className="text-xs text-muted-foreground">Доставка за 30 минут</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#menu" className="text-foreground hover:text-primary transition-colors font-medium">
                Меню
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                О нас
              </a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors font-medium">
                Вопросы
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Контакты
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative border-2 border-primary/30 hover:bg-primary/10">
                    <Icon name="ShoppingCart" size={22} className="text-primary" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-primary shadow-lg animate-scale-in">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg flex flex-col bg-gradient-to-b from-orange-50 to-white">
                  <SheetHeader className="border-b pb-4">
                    <SheetTitle className="text-2xl font-heading flex items-center gap-2">
                      <Icon name="ShoppingBag" size={28} className="text-primary" />
                      Ваш заказ
                    </SheetTitle>
                  </SheetHeader>

                  {cartItems.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <div className="bg-orange-100 p-6 rounded-full mb-4">
                        <Icon name="ShoppingCart" size={64} className="text-primary" />
                      </div>
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
                          <Card key={item.id} className="overflow-hidden border-2 border-orange-200 hover:shadow-lg transition-all">
                            <CardContent className="p-3 flex gap-3">
                              <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-heading font-bold text-base mb-1 truncate text-foreground">
                                  {item.name}
                                </h4>
                                <p className="text-xl font-bold text-primary mb-3">
                                  {item.price * item.quantity} ₽
                                </p>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-9 w-9 border-2 border-primary/30"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" size={16} />
                                  </Button>
                                  <span className="w-10 text-center font-bold text-lg">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-9 w-9 border-2 border-primary/30"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" size={16} />
                                  </Button>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => removeItem(item.id)}
                              >
                                <Icon name="Trash2" size={20} />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="border-t-2 border-primary/20 pt-4 space-y-4 bg-white rounded-t-2xl shadow-lg p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Товаров:</span>
                            <span className="font-semibold">{totalItems} шт</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Доставка:</span>
                            <span className="font-semibold text-accent">Бесплатно</span>
                          </div>
                          <div className="border-t-2 border-primary/20 pt-3 flex justify-between items-center">
                            <span className="text-xl font-heading font-bold">Итого:</span>
                            <span className="text-3xl font-heading font-bold text-primary">
                              {totalPrice} ₽
                            </span>
                          </div>
                        </div>

                        <Button
                          className="w-full h-16 text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 shadow-xl"
                          onClick={() => {
                            setShowOrderForm(true);
                            setIsCartOpen(false);
                          }}
                        >
                          <Icon name="CreditCard" size={24} className="mr-2" />
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </SheetContent>
              </Sheet>

              <Button className="hidden md:flex bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg font-semibold">
                <Icon name="User" size={18} className="mr-2" />
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowOrderForm(false)}>
          <Card className="w-full max-w-md bg-white" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-heading font-bold text-primary">Оформление заказа</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowOrderForm(false)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Ваше имя</label>
                  <Input placeholder="Введите имя" className="border-2 border-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Телефон</label>
                  <Input placeholder="+7 (___) ___-__-__" className="border-2 border-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Адрес доставки</label>
                  <Input placeholder="Улица, дом, квартира" className="border-2 border-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Комментарий к заказу</label>
                  <Textarea placeholder="Дополнительные пожелания" className="border-2 border-primary/30" />
                </div>

                <div className="bg-orange-50 p-4 rounded-xl border-2 border-primary/20">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Сумма заказа:</span>
                    <span className="text-2xl font-bold text-primary">{totalPrice} ₽</span>
                  </div>
                </div>

                <Button 
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 shadow-xl"
                  onClick={() => {
                    alert(`Заказ на ${totalPrice} ₽ успешно оформлен! 🎉\nМы свяжемся с вами в ближайшее время.`);
                    setCartItems([]);
                    setShowOrderForm(false);
                  }}
                >
                  <Icon name="Check" size={20} className="mr-2" />
                  Подтвердить заказ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-6 py-2 text-base bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
              🍕 Бесплатная доставка от 1000 ₽
            </Badge>
            <h2 className="text-5xl md:text-7xl font-heading font-extrabold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              Вкусная еда с доставкой за 30 минут
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
              Большой выбор блюд от лучших поваров. Свежие продукты, быстрая доставка!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-10 py-7 gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-2xl font-bold text-white">
                <Icon name="ChefHat" size={24} />
                Выбрать блюда
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 gap-2 border-2 border-primary hover:bg-primary/10 font-bold">
                <Icon name="Phone" size={24} />
                +7 (800) 555-35-35
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-primary">Наше меню</h2>
            <p className="text-lg text-muted-foreground">Выберите любимые блюда из нашего ассортимента</p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-110 border-0'
                    : 'border-2 border-primary/30 hover:bg-primary/10 hover:scale-105'
                }`}
              >
                <Icon name={category.icon} size={20} />
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish, index) => (
              <Card
                key={dish.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-2 border-orange-200 bg-white animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {dish.popular && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-primary to-secondary text-white shadow-lg px-3 py-1">
                      <Icon name="Flame" size={16} className="mr-1" />
                      Хит продаж
                    </Badge>
                  )}
                </div>
                <CardContent className="p-5">
                  <h3 className="font-heading font-bold text-xl mb-2 text-foreground">{dish.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-heading font-bold text-primary">{dish.price} ₽</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg font-semibold px-4"
                      onClick={() => addToCart(dish)}
                    >
                      <Icon name="Plus" size={18} className="mr-1" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Clock', title: 'Быстрая доставка', desc: 'Доставим за 30 минут или вернём деньги' },
              { icon: 'Star', title: 'Качество', desc: 'Только свежие продукты от проверенных поставщиков' },
              { icon: 'Heart', title: 'С любовью', desc: 'Готовим с душой, как для себя' },
            ].map((item, i) => (
              <Card key={i} className="text-center p-8 border-2 border-primary/20 hover:shadow-xl transition-shadow bg-white">
                <div className="bg-gradient-to-br from-primary to-secondary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon name={item.icon} size={36} className="text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3 text-primary">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 text-primary">Часто задаваемые вопросы</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: 'Какое минимальное время доставки?', a: 'Мы доставляем заказы в течение 30-40 минут с момента оформления.' },
              { q: 'Какая минимальная сумма заказа?', a: 'Минимальная сумма заказа - 500 ₽. Бесплатная доставка от 1000 ₽.' },
              { q: 'Можно ли оплатить картой?', a: 'Да, мы принимаем оплату картой онлайн и курьеру при получении.' },
              { q: 'Как отследить заказ?', a: 'После оформления вы получите SMS с номером заказа и ссылкой для отслеживания.' },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-2 border-primary/20 rounded-xl px-6 bg-white">
                <AccordionTrigger className="text-lg font-heading font-semibold hover:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-primary">Свяжитесь с нами</h2>
              <p className="text-lg text-muted-foreground">Есть вопросы? Напишите нам, и мы ответим в течение 15 минут!</p>
            </div>
            <Card className="p-8 border-2 border-primary/20 shadow-xl bg-white">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-foreground">Ваше имя</label>
                  <Input placeholder="Иван Иванов" className="h-12 border-2 border-primary/30 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-foreground">Email</label>
                  <Input type="email" placeholder="ivan@example.com" className="h-12 border-2 border-primary/30 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-foreground">Сообщение</label>
                  <Textarea placeholder="Ваше сообщение..." rows={5} className="border-2 border-primary/30 focus:border-primary" />
                </div>
                <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 shadow-xl">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить сообщение
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-primary via-secondary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Icon name="UtensilsCrossed" size={28} />
                </div>
                <h3 className="text-2xl font-heading font-bold">FoodExpress</h3>
              </div>
              <p className="text-white/90 leading-relaxed">Доставка вкусной еды быстро и с заботой о вас. Работаем ежедневно с 9:00 до 23:00</p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-4 text-white">Меню</h4>
              <div className="space-y-2 text-white/90">
                <a href="#menu" className="block hover:text-white transition-colors">Пицца</a>
                <a href="#menu" className="block hover:text-white transition-colors">Суши</a>
                <a href="#menu" className="block hover:text-white transition-colors">Бургеры</a>
                <a href="#menu" className="block hover:text-white transition-colors">Десерты</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-4 text-white">Контакты</h4>
              <div className="space-y-3 text-white/90">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  +7 (800) 555-35-35
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  info@foodexpress.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  Москва, ул. Примерная, 123
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-4 text-white">Мы в соцсетях</h4>
              <div className="flex gap-3">
                {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                  <Button key={social} variant="ghost" size="icon" className="bg-white/20 hover:bg-white/30 text-white">
                    <Icon name={social} size={20} />
                  </Button>
                ))}
              </div>
              <div className="mt-6">
                <Badge className="bg-white/20 text-white px-4 py-2 text-sm">
                  <Icon name="Shield" size={16} className="mr-2" />
                  Безопасная оплата
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/30 mt-12 pt-8 text-center text-white/80">
            <p>&copy; 2024 FoodExpress. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
