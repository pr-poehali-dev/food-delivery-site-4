import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 relative">
          <Icon name="ShoppingCart" size={24} />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-white text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-heading">Ваша корзина</SheetTitle>
          <SheetDescription>
            {totalItems > 0 ? `${totalItems} ${totalItems === 1 ? 'товар' : 'товара'}` : 'Корзина пуста'}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <Icon name="ShoppingCart" size={80} className="text-muted-foreground/30" />
              <p className="text-muted-foreground text-lg">Корзина пуста</p>
              <p className="text-sm text-muted-foreground">Добавьте блюда из меню</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all">
                  <CardContent className="p-0">
                    <div className="flex gap-4">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 py-3 pr-3 flex flex-col justify-between">
                        <div>
                          <h3 className="font-heading font-semibold text-lg mb-1">{item.name}</h3>
                          <p className="text-primary font-bold text-xl">{item.price} ₽</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                          
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t pt-6 flex-col gap-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium">Итого:</span>
              <span className="font-heading font-bold text-3xl text-primary">{totalPrice} ₽</span>
            </div>
            
            <Button 
              size="lg" 
              className="w-full text-lg py-6 gap-2 shadow-lg hover:shadow-xl transition-shadow"
              onClick={onCheckout}
            >
              <Icon name="CreditCard" size={24} />
              Оформить заказ
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
              <Icon name="Truck" size={16} />
              <span>Бесплатная доставка от 1000 ₽</span>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
