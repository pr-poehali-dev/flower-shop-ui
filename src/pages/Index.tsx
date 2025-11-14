import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface Bouquet {
  id: number;
  name: string;
  price: number;
  occasion: string;
  image: string;
  description: string;
}

interface Flower {
  id: number;
  name: string;
  price: number;
  emoji: string;
  color: string;
}

interface CustomBouquetItem {
  flower: Flower;
  quantity: number;
}

const bouquets: Bouquet[] = [
  { id: 1, name: 'Красные розы классика', price: 1500, occasion: 'Красные розы', image: 'https://cdn.poehali.dev/files/d78db5e2-0d0d-445b-90a5-bdd46e2325cc.jpg', description: '15 красных роз по 100₽' },
  { id: 3, name: 'Белоснежные розы', price: 1500, occasion: 'Романтика', image: 'https://cdn.poehali.dev/files/5d081602-a133-489b-99e1-0023037ac513.jpg', description: '15 белых роз по 100₽' },
  { id: 4, name: 'Желтое солнце', price: 1500, occasion: 'День рождения', image: 'https://cdn.poehali.dev/files/ccca74b5-f2d1-4461-801c-633424e7d290.jpg', description: '15 желтых роз по 100₽' },
  { id: 5, name: 'Персиковый закат', price: 1500, occasion: 'Романтика', image: 'https://cdn.poehali.dev/files/746bf317-326b-418d-808e-5fbac791183f.jpg', description: '15 оранжевых роз по 100₽' },
  { id: 6, name: 'Малиновая нежность', price: 1500, occasion: 'День рождения', image: 'https://cdn.poehali.dev/files/b1ff2bef-2e39-4910-8e64-a8f34ae24158.jpg', description: '15 малиновых роз по 100₽' },
  { id: 7, name: 'Сиреневые хризантемы', price: 1400, occasion: 'День рождения', image: 'https://cdn.poehali.dev/files/350de024-a4ae-4d19-8635-40c37b2d6c92.jpg', description: '7 кустовых хризантем по 200₽' },
  { id: 8, name: 'Фиолетовые хризантемы', price: 1400, occasion: 'День рождения', image: 'https://cdn.poehali.dev/files/eba1351a-a4c4-48af-ab4a-85fbb4a28f66.jpg', description: '7 кустовых хризантем по 200₽' },
  { id: 9, name: 'Зеленые хризантемы', price: 1400, occasion: 'День рождения', image: 'https://cdn.poehali.dev/files/b9974384-c23c-4cf0-b8ea-d4e65b6dc5ba.jpg', description: '7 кустовых хризантем по 200₽' },
  { id: 10, name: 'Белые хризантемы', price: 1400, occasion: 'Романтика', image: 'https://cdn.poehali.dev/files/3c2c1629-bcc4-4e2e-ae80-26697b16664c.jpg', description: '7 кустовых хризантем по 200₽' },
  { id: 11, name: 'Мятные хризантемы', price: 1400, occasion: 'Романтика', image: 'https://cdn.poehali.dev/files/ecb2dda6-48b3-4519-8883-2d95937194a1.jpg', description: '7 кустовых хризантем по 200₽' },
];

const flowers: Flower[] = [
  { id: 1, name: 'Роза белая', price: 100, emoji: '🤍', color: 'white' },
  { id: 2, name: 'Роза желтая', price: 100, emoji: '💛', color: 'yellow' },
  { id: 3, name: 'Роза малиновая', price: 100, emoji: '🌹', color: 'pink' },
  { id: 4, name: 'Роза оранжевая', price: 100, emoji: '🧡', color: 'orange' },
  { id: 5, name: 'Хризантема кустовая', price: 200, emoji: '🌼', color: 'yellow' },
  { id: 6, name: 'Хризантема одноголовая', price: 150, emoji: '🌻', color: 'yellow' },
  { id: 7, name: 'Эвкалипт', price: 80, emoji: '🌿', color: 'green' },
  { id: 8, name: 'Гипсофила', price: 90, emoji: '✨', color: 'white' },
];

export default function Index() {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('Все');
  const [priceRange, setPriceRange] = useState<string>('Все');
  const [cart, setCart] = useState<Bouquet[]>([]);
  const [activeSection, setActiveSection] = useState('main');
  const [customBouquet, setCustomBouquet] = useState<CustomBouquetItem[]>([]);
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);

  const occasions = ['Все', 'Красные розы', 'Романтика', 'День рождения', 'Свадьба'];
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

  const addFlowerToCustom = (flower: Flower) => {
    const existing = customBouquet.find(item => item.flower.id === flower.id);
    if (existing) {
      setCustomBouquet(customBouquet.map(item => 
        item.flower.id === flower.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCustomBouquet([...customBouquet, { flower, quantity: 1 }]);
    }
  };

  const removeFlowerFromCustom = (flowerId: number) => {
    const existing = customBouquet.find(item => item.flower.id === flowerId);
    if (existing && existing.quantity > 1) {
      setCustomBouquet(customBouquet.map(item => 
        item.flower.id === flowerId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCustomBouquet(customBouquet.filter(item => item.flower.id !== flowerId));
    }
  };

  const customBouquetTotal = customBouquet.reduce((sum, item) => sum + (item.flower.price * item.quantity), 0);

  const addCustomToCart = () => {
    if (customBouquet.length > 0) {
      const customBouquetItem: Bouquet = {
        id: Date.now(),
        name: 'Собственный букет',
        price: customBouquetTotal,
        occasion: 'Индивидуальный',
        image: 'https://cdn.poehali.dev/projects/721cce8c-8358-4211-a869-95b97b5f409f/files/a7c744b0-9dd7-4a3f-a59c-2f006ce07c8e.jpg',
        description: customBouquet.map(item => `${item.flower.name} x${item.quantity}`).join(', ')
      };
      setCart([...cart, customBouquetItem]);
      setCustomBouquet([]);
      setShowCustomBuilder(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">Цветочная поляна🌸</h1>
            
            <nav className="hidden md:flex gap-6">
              <button onClick={() => setActiveSection('main')} className="hover:text-primary transition-colors">Главная</button>
              <button onClick={() => setActiveSection('catalog')} className="hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => { setActiveSection('catalog'); setShowCustomBuilder(true); }} className="hover:text-primary transition-colors font-semibold">Собрать букет</button>
              <button onClick={() => setActiveSection('delivery')} className="hover:text-primary transition-colors">Доставка</button>
              <button onClick={() => setActiveSection('about')} className="hover:text-primary transition-colors">О нас</button>
              <button onClick={() => setActiveSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
            </nav>

            <Button asChild size="sm" className="gap-1 text-xs">
              <a href="https://t.me/fflowers3" target="_blank" rel="noopener noreferrer">
                <Icon name="Send" size={16} />
                Заказать букет
              </a>
            </Button>
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
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-3xl font-bold">Наш каталог</h3>
              <Button 
                size="lg" 
                onClick={() => setShowCustomBuilder(!showCustomBuilder)}
                className="gap-2"
              >
                <Icon name="Sparkles" size={20} />
                {showCustomBuilder ? 'Готовые букеты' : 'Собрать свой букет'}
              </Button>
            </div>
            
            {!showCustomBuilder ? (
              <>
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
                        <p className="text-2xl font-bold text-primary"></p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <a href="https://t.me/fflowers3" target="_blank" rel="noopener noreferrer">
                            <Icon name="Send" size={18} className="mr-2" />
                            Заказать
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="max-w-6xl mx-auto">
                <Card className="p-6 mb-8">
                  <h4 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Icon name="Sparkles" size={28} className="text-primary" />
                    Соберите свой уникальный букет
                  </h4>
                  <p className="text-muted-foreground mb-6">Выберите цветы и создайте композицию по своему вкусу</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {flowers.map(flower => (
                      <Card key={flower.id} className="p-4 hover:shadow-lg transition-all cursor-pointer" onClick={() => addFlowerToCustom(flower)}>
                        <div className="text-center">
                          <div className="text-5xl mb-2">{flower.emoji}</div>
                          <h5 className="font-semibold mb-1">{flower.name}</h5>
                          <p className="text-primary font-bold">{flower.price}₽</p>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {customBouquet.length > 0 && (
                    <>
                      <Separator className="mb-6" />
                      <div className="space-y-4">
                        <h5 className="font-semibold text-xl">Ваш букет:</h5>
                        {customBouquet.map(item => (
                          <div key={item.flower.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                            <div className="flex items-center gap-4">
                              <span className="text-3xl">{item.flower.emoji}</span>
                              <div>
                                <p className="font-medium">{item.flower.name}</p>
                                <p className="text-sm text-muted-foreground">{item.flower.price}₽ × {item.quantity}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button variant="outline" size="icon" onClick={() => removeFlowerFromCustom(item.flower.id)}>
                                <Icon name="Minus" size={16} />
                              </Button>
                              <span className="font-semibold w-8 text-center">{item.quantity}</span>
                              <Button variant="outline" size="icon" onClick={() => addFlowerToCustom(item.flower)}>
                                <Icon name="Plus" size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between items-center pt-4">
                          <div className="text-2xl font-bold">Итого: <span className="text-primary">{customBouquetTotal}₽</span></div>
                          <Button asChild size="lg" className="gap-2">
                            <a href="https://t.me/fflowers3" target="_blank" rel="noopener noreferrer">
                              <Icon name="Send" size={20} />
                              Заказать букет
                            </a>
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </Card>
              </div>
            )}
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
                <h4 className="font-semibold mb-2">доставка по Севастополю</h4>
                <p className="text-muted-foreground"></p>
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
              <p>• По Севастополю 300р</p>
              <p>• В Балаклаву 400р</p>
              <p>• В Инкерман 500р</p>
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
                  <div className="text-4xl font-bold text-primary mb-2">3+</div>
                  <p className="text-muted-foreground">года на рынке</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
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
                <p className="text-lg mb-2">+7 (978) 860-45-91</p>
                <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
              </Card>
              
              <Card className="p-6">
                <h4 className="font-semibold text-xl mb-4 flex items-center gap-2">Telegram</h4>
                <p className="text-lg mb-2">@Yert88</p>
                <p className="text-muted-foreground">Ответим в течение 1 часа</p>
              </Card>
              
              <Card className="p-6">
                <h4 className="font-semibold text-xl mb-4 flex items-center gap-2">
                  <Icon name="MapPin" size={24} />
                  Адрес
                </h4>
                <p className="text-lg mb-2">г. Севастополь, ул. проспект Октябрьской Революции, 43Д</p>
                <p className="text-muted-foreground"></p>
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
            <a href="https://t.me/fflowers3" target="_blank" rel="noopener noreferrer">
              <Icon name="Send" size={24} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}