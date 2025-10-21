import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl">
                <Icon name="UtensilsCrossed" size={28} className="text-white" />
              </div>
              <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FoodExpress
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#menu" className="text-foreground hover:text-primary transition-colors font-medium">
                Меню
              </a>
              <a href="#delivery" className="text-foreground hover:text-primary transition-colors font-medium">
                Доставка
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                О нас
              </a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-medium">
                Контакты
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={22} />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary animate-scale-in">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg flex flex-col">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-heading flex items-center gap-2">
                      <Icon name="ShoppingBag" size={24} className="text-primary" />
                      Ваш заказ
                    </SheetTitle>
                  </SheetHeader>

                  {cartItems.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4 opacity-50" />
                      <h3 className="text-xl font-heading font-bold mb-2">Корзина пуста</h3>
                      <p className="text-muted-foreground mb-4">Добавьте блюда из меню</p>
                      <Button onClick={() => setIsCartOpen(false)}>
                        Перейти к меню
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-y-auto py-4 space-y-4">
                        {cartItems.map((item) => (
                          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-3 flex gap-3">
                              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-heading font-semibold text-base mb-1 truncate">
                                  {item.name}
                                </h4>
                                <p className="text-lg font-bold text-primary mb-2">
                                  {item.price * item.quantity} ₽
                                </p>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => removeItem(item.id)}
                              >
                                <Icon name="Trash2" size={18} />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="border-t pt-4 space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Товаров:</span>
                            <span className="font-medium">{totalItems} шт</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Доставка:</span>
                            <span className="font-medium text-green-600">Бесплатно</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between items-center">
                            <span className="text-lg font-heading font-bold">Итого:</span>
                            <span className="text-2xl font-heading font-bold text-primary">
                              {totalPrice} ₽
                            </span>
                          </div>
                        </div>

                        <Button
                          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
                          onClick={() => {
                            alert(`Заказ на ${totalPrice} ₽ оформлен! 🎉`);
                            setCartItems([]);
                            setIsCartOpen(false);
                          }}
                        >
                          <Icon name="CreditCard" size={20} className="mr-2" />
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </SheetContent>
              </Sheet>

              <Button className="hidden md:flex bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-heading font-extrabold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Доставка вкусной еды за 30 минут
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Широкий выбор блюд от лучших ресторанов вашего города. Быстро, вкусно, всегда свежее!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative w-full sm:w-96">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Найти блюдо..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-8 h-12">
                <Icon name="Sparkles" size={20} className="mr-2" />
                Найти
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                    : 'hover:scale-105'
                }`}
              >
                <Icon name={category.icon} size={18} />
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDishes.map((dish, index) => (
              <Card
                key={dish.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {dish.popular && (
                    <Badge className="absolute top-3 right-3 bg-secondary text-white">
                      <Icon name="Flame" size={14} className="mr-1" />
                      Популярное
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-heading font-bold text-lg mb-2">{dish.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-heading font-bold text-primary">{dish.price} ₽</span>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      onClick={() => addToCart(dish)}
                    >
                      <Icon name="Plus" size={16} className="mr-1" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDishes.length === 0 && (
            <div className="text-center py-16">
              <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-heading font-bold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">Попробуйте изменить запрос или выбрать другую категорию</p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary to-secondary text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="UtensilsCrossed" size={24} />
                <h3 className="text-xl font-heading font-bold">FoodExpress</h3>
              </div>
              <p className="text-white/80">Доставка вкусной еды быстро и с заботой о вас</p>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-white/80">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (800) 555-35-35
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@foodexpress.ru
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 FoodExpress. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
