import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

interface Bouquet {
  id: number;
  name: string;
  price: number;
  occasion: string;
  image: string;
  description: string;
}

const bouquets: Bouquet[] = [
  { id: 1, name: 'Розовая нежность', price: 3500, occasion: 'Романтика', image: 'https://cdn.poehali.dev/projects/721cce8c-8358-4211-a869-95b97b5f409f/files/a7c744b0-9dd7-4a3f-a59c-2f006ce07c8e.jpg', description: 'Букет из роз и эвкалипта' },
  { id: 2, name: 'Весенний сад', price: 4200, occasion: 'День рождения', image: 'https://cdn.poehali.dev/projects/721cce8c-8358-4211-a869-95b97b5f409f/files/74112c55-211b-4fad-8e72-8272632fc49d.jpg', description: 'Пионы и тюльпаны' },
  { id: 3, name: 'Свадебный шик', price: 5500, occasion: 'Свадьба', image: 'https://cdn.poehali.dev/projects/721cce8c-8358-4211-a869-95b97b5f409f/files/239a558d-6168-4da4-a76d-3d7d4f96fa90.jpg', description: 'Роскошные розы в крафте' },
  { id: 4, name: 'Пудровая мечта', price: 3200, occasion: 'Романтика', image: 'https://cdn.poehali.dev/projects/721cce8c-8358-4211-a869-95b97b5f409f/files/a7c744b0-9dd7-4a3f-a59c-2f006ce07c8e.jpg', description: 'Нежные пастельные оттенки' },
  { id: 5, name: 'Яркое настроение', price: 3800, occasion: 'День рождения', image: 'https://cdn.poehali.dev/projects/721cce8c-8358-4211-a869-95b97b5f409f/files/74112c55-211b-4fad-8e72-8272632fc49d.jpg', description: 'Микс сезонных цветов' },
  { id: 6, name: 'Королевский букет', price: 6500, occasion: 'Свадьба', image: 'https://cdn.poehali.dev/projects/721cce8c-8358-4211-a869-95b97b5f409f/files/239a558d-6168-4da4-a76d-3d7d4f96fa90.jpg', description: 'Премиальная композиция' },
];

export default function Index() {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('Все');
  const [priceRange, setPriceRange] = useState<string>('Все');
  const [cart, setCart] = useState<Bouquet[]>([]);
  const [activeSection, setActiveSection] = useState('main');

  const occasions = ['Все', 'Романтика', 'День рождения', 'Свадьба'];
  const priceRanges = ['Все', 'До 4000₽', '4000-5000₽', 'От 5000₽'];

  const filteredBouquets = bouquets.filter(bouquet => {
    const occasionMatch = selectedOccasion === 'Все' || bouquet.occasion === selectedOccasion;
    let priceMatch = true;
    
    if (priceRange === 'До 4000₽') priceMatch = bouquet.price < 4000;
    if (priceRange === '4000-5000₽') priceMatch = bouquet.price >= 4000 && bouquet.price <= 5000;
    if (priceRange === 'От 5000₽') priceMatch = bouquet.price > 5000;
    
    return occasionMatch && priceMatch;
  });

  const addToCart = (bouquet: Bouquet) => {
    setCart([...cart, bouquet]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">Цветочная поляна🌷🌸🌺</h1>
            
            <nav className="hidden md:flex gap-6">
              <button onClick={() => setActiveSection('main')} className="hover:text-primary transition-colors">Главная</button>
              <button onClick={() => setActiveSection('catalog')} className="hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => setActiveSection('delivery')} className="hover:text-primary transition-colors">Доставка</button>
              <button onClick={() => setActiveSection('about')} className="hover:text-primary transition-colors">О нас</button>
              <button onClick={() => setActiveSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-primary font-semibold">{item.price}₽</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(index)}>
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Итого:</span>
                        <span className="text-primary">{totalPrice}₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {activeSection === 'main' && (
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-accent opacity-60" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Свежие букеты с доставкой по лучшей цене в Севастополе</h2>
              <p className="text-xl text-muted-foreground mb-8">Создаём настроение каждый день. Доставка по Севастополю</p>
              <Button size="lg" className="text-lg px-8" onClick={() => setActiveSection('catalog')}>
                Выбрать букет
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {(activeSection === 'main' || activeSection === 'catalog') && (
        <section className="py-16 bg-white" id="catalog">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Наш каталог</h3>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <div className="flex flex-wrap gap-2">
                {occasions.map(occasion => (
                  <Button
                    key={occasion}
                    variant={selectedOccasion === occasion ? 'default' : 'outline'}
                    onClick={() => setSelectedOccasion(occasion)}
                    className="rounded-full"
                  >
                    {occasion}
                  </Button>
                ))}
              </div>
              
              <Separator orientation="vertical" className="h-10 hidden md:block" />
              
              <div className="flex flex-wrap gap-2">
                {priceRanges.map(range => (
                  <Button
                    key={range}
                    variant={priceRange === range ? 'default' : 'outline'}
                    onClick={() => setPriceRange(range)}
                    className="rounded-full"
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBouquets.map((bouquet, index) => (
                <Card key={bouquet.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative overflow-hidden aspect-square">
                    <img 
                      src={bouquet.image} 
                      alt={bouquet.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4">{bouquet.occasion}</Badge>
                  </div>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-xl mb-2">{bouquet.name}</h4>
                    <p className="text-muted-foreground text-sm mb-4">{bouquet.description}</p>
                    <p className="text-2xl font-bold text-primary">{bouquet.price}₽</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => addToCart(bouquet)}>
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'delivery' && (
        <section className="py-16 min-h-[60vh]">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-3xl font-bold text-center mb-12">Доставка</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <div className="text-4xl mb-4">🚚</div>
                <h4 className="font-semibold mb-2">Быстрая доставка</h4>
                <p className="text-muted-foreground">По Москве за 2 часа</p>
              </Card>
              <Card className="text-center p-6">
                <div className="text-4xl mb-4">📅</div>
                <h4 className="font-semibold mb-2">Точно в срок</h4>
                <p className="text-muted-foreground">Доставка к указанному времени</p>
              </Card>
              <Card className="text-center p-6">
                <div className="text-4xl mb-4">💝</div>
                <h4 className="font-semibold mb-2">С заботой</h4>
                <p className="text-muted-foreground">Бережная упаковка</p>
              </Card>
            </div>
            <div className="mt-12 space-y-4">
              <h4 className="font-semibold text-xl">Стоимость доставки:</h4>
              <p>• В пределах МКАД — бесплатно при заказе от 3000₽</p>
              <p>• В пределах МКАД — 350₽ при заказе до 3000₽</p>
              <p>• За МКАД — 500₽ + 30₽/км</p>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="py-16 min-h-[60vh] bg-secondary/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-3xl font-bold text-center mb-8">О нас</h3>
            <div className="prose prose-pink max-w-none">
              <p className="text-lg mb-4">Цветочная поляна🌷🌸🌺 - это команда профессиональных флористов с 10-летним опытом. Мы создаём уникальные букеты, которые дарят радость и особенные эмоции.</p>
              <p className="text-lg mb-4">
                Работаем только со свежими цветами от проверенных поставщиков. 
                Каждый букет создаётся с любовью и вниманием к деталям.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <p className="text-muted-foreground">лет на рынке</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                  <p className="text-muted-foreground">довольных клиентов</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <p className="text-muted-foreground">свежие цветы</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-16 min-h-[60vh]">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-3xl font-bold text-center mb-12">Контакты</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h4 className="font-semibold text-xl mb-4 flex items-center gap-2">
                  <Icon name="Phone" size={24} />
                  Телефон
                </h4>
                <p className="text-lg mb-2">+7 (495) 123-45-67</p>
                <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
              </Card>
              
              <Card className="p-6">
                <h4 className="font-semibold text-xl mb-4 flex items-center gap-2">
                  <Icon name="Mail" size={24} />
                  Email
                </h4>
                <p className="text-lg mb-2">info@fleurboutique.ru</p>
                <p className="text-muted-foreground">Ответим в течение 1 часа</p>
              </Card>
              
              <Card className="p-6">
                <h4 className="font-semibold text-xl mb-4 flex items-center gap-2">
                  <Icon name="MapPin" size={24} />
                  Адрес
                </h4>
                <p className="text-lg mb-2">г. Москва, ул. Цветочная, д. 15</p>
                <p className="text-muted-foreground">м. Тверская, 5 минут пешком</p>
              </Card>
              
              <Card className="p-6">
                <h4 className="font-semibold text-xl mb-4 flex items-center gap-2">
                  <Icon name="Clock" size={24} />
                  Режим работы
                </h4>
                <p className="text-lg mb-2">Ежедневно 9:00 - 21:00</p>
                <p className="text-muted-foreground">Без выходных</p>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-secondary/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground"></p>
          <div className="flex justify-center gap-4 mt-4">
            <Icon name="Instagram" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <Icon name="Facebook" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <Icon name="MessageCircle" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}