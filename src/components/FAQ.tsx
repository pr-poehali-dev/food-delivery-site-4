import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

const faqData = [
  {
    question: 'Как быстро доставляется заказ?',
    answer: 'Мы доставляем заказы в течение 30-40 минут с момента подтверждения. Если опоздаем — вернём деньги!',
  },
  {
    question: 'Какая минимальная сумма заказа?',
    answer: 'Минимальная сумма заказа — 500 рублей. При заказе от 1000 рублей доставка бесплатная!',
  },
  {
    question: 'Какие способы оплаты доступны?',
    answer: 'Принимаем оплату наличными курьеру, банковскими картами онлайн, а также через Apple Pay и Google Pay.',
  },
  {
    question: 'Можно ли изменить или отменить заказ?',
    answer: 'Да, вы можете изменить или отменить заказ в течение 5 минут после оформления. Позвоните нам по телефону.',
  },
  {
    question: 'Есть ли у вас вегетарианские блюда?',
    answer: 'Конечно! У нас большой выбор вегетарианских блюд: салаты, роллы с овощами, пиццы с сыром и овощами.',
  },
  {
    question: 'Работаете ли вы в выходные?',
    answer: 'Да, мы работаем без выходных с 10:00 до 23:00. Доставляем вкусную еду каждый день!',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 bg-gradient-to-b from-white to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Частые вопросы
          </h2>
          <p className="text-xl text-muted-foreground">
            Ответы на популярные вопросы о доставке
          </p>
        </div>

        <Card className="max-w-3xl mx-auto p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;
