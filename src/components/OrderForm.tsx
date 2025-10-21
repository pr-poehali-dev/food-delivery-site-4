import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface OrderFormProps {
  totalPrice: number;
  itemsCount: number;
  onSuccess: () => void;
}

const OrderForm = ({ totalPrice, itemsCount, onSuccess }: OrderFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Спасибо, ${formData.name}! Ваш заказ на ${totalPrice} ₽ принят. Доставим по адресу: ${formData.address}`);
    onSuccess();
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="text-2xl font-heading flex items-center gap-2">
          <Icon name="ClipboardList" size={24} className="text-primary" />
          Оформление заказа
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">Товаров:</span>
            <span className="font-semibold">{itemsCount} шт</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">Доставка:</span>
            <span className="font-semibold text-secondary">Бесплатно</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between items-center">
            <span className="text-lg font-heading font-bold">К оплате:</span>
            <span className="text-2xl font-heading font-bold text-primary">{totalPrice} ₽</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-base">Ваше имя *</Label>
            <Input
              id="name"
              required
              placeholder="Иван Иванов"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-base">Телефон *</Label>
            <Input
              id="phone"
              type="tel"
              required
              placeholder="+7 (999) 123-45-67"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address" className="text-base">Адрес доставки *</Label>
            <Textarea
              id="address"
              required
              placeholder="Улица, дом, квартира"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="comment" className="text-base">Комментарий к заказу</Label>
            <Textarea
              id="comment"
              placeholder="Дополнительные пожелания"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="mt-1"
              rows={2}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg"
          >
            <Icon name="CreditCard" size={20} className="mr-2" />
            Подтвердить заказ на {totalPrice} ₽
          </Button>

          <p className="text-sm text-muted-foreground text-center mt-4">
            Нажимая кнопку, вы соглашаетесь с условиями доставки
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
