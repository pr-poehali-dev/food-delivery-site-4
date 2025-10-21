import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface FoodCatalogProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onAddToCart: (item: { id: number; name: string; price: number; image: string }) => void;
}

const categories = [
  { id: 'all', name: 'Все', icon: 'LayoutGrid' },
  { id: 'pizza', name: 'Пицца', icon: 'Pizza' },
  { id: 'sushi', name: 'Суши', icon: 'Fish' },
  { id: 'burgers', name: 'Бургеры', icon: 'Beef' },
  { id: 'salads', name: 'Салаты', icon: 'Salad' },
  { id: 'desserts', name: 'Десерты', icon: 'IceCream' },
];

const foodItems = [
  {
    id: 1,
    name: 'Пепперони',
    category: 'pizza',
    price: 590,
    image: 'https://cdn.poehali.dev/projects/47b4565b-1af5-4f01-969e-75514b96c0e8/files/1bb0b546-3ccf-41f6-bd58-5649d0e5b683.jpg',
    description: 'Классическая пицца с колбасой пепперони и моцареллой',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Филадельфия',
    category: 'sushi',
    price: 450,
    image: 'https://cdn.poehali.dev/projects/47b4565b-1af5-4f01-969e-75514b96c0e8/files/f4f85797-e7a0-4aea-9638-a2d0dc94d78e.jpg',
    description: 'Классический ролл с лососем и сливочным сыром',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Бургер BBQ',
    category: 'burgers',
    price: 380,
    image: 'https://cdn.poehali.dev/projects/47b4565b-1af5-4f01-969e-75514b96c0e8/files/1da7ed1f-11e7-4f16-97a1-73dc11169c34.jpg',
    description: 'Сочный бургер с соусом барбекю и беконом',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Цезарь с курицей',
    category: 'salads',
    price: 320,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    description: 'Свежий салат с курицей гриль и соусом Цезарь',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Тирамису',
    category: 'desserts',
    price: 280,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    description: 'Классический итальянский десерт с кофе',
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Маргарита',
    category: 'pizza',
    price: 490,
    image: 'https://cdn.poehali.dev/projects/47b4565b-1af5-4f01-969e-75514b96c0e8/files/1bb0b546-3ccf-41f6-bd58-5649d0e5b683.jpg',
    description: 'Простая и вкусная пицца с томатами и базиликом',
    rating: 4.7,
  },
];

const FoodCatalog = ({ selectedCategory, onCategoryChange, onAddToCart }: FoodCatalogProps) => {
  const filteredItems = selectedCategory === 'all' 
    ? foodItems 
    : foodItems.filter(item => item.category === selectedCategory);

  return (
    <section id="catalog" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-center mb-12">Наше меню</h2>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              onClick={() => onCategoryChange(cat.id)}
              className="gap-2"
            >
              <Icon name={cat.icon as any} size={20} />
              {cat.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow animate-fade-in">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-white text-foreground gap-1">
                  <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                  {item.rating}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-heading font-semibold mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                <p className="text-2xl font-bold text-primary">{item.price} ₽</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full gap-2"
                  onClick={() => onAddToCart({ 
                    id: item.id, 
                    name: item.name, 
                    price: item.price, 
                    image: item.image 
                  })}
                >
                  <Icon name="ShoppingCart" size={18} />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodCatalog;
