import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('main');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const events = [
    {
      id: 1,
      title: 'Мудрость материнства',
      date: '19 февраля',
      time: '18:00',
      category: 'Семья',
      description: 'Тёплая и поддерживающая встреча для мам — про материнство, заботу о себе и важные переходы, которые мы проживаем вместе с детьми.',
      image: 'https://cdn.poehali.dev/projects/3f3d9455-fca0-4e12-951d-4faa125851e6/bucket/8a12d5c4-c5ab-4c8f-9696-e9c53357608b.jpg',
      location: 'Лесная, 55',
      price: 'Бесплатно',
      status: 'upcoming' as const,
      contact: '+79272463896',
    },
    {
      id: 2,
      title: 'Мастер-класс по керамике',
      date: '22 февраля',
      time: '14:00',
      category: 'Творчество',
      description: 'Создайте свою первую керамическую работу под руководством мастеров студии «VAZA». Все материалы включены.',
      image: 'https://cdn.poehali.dev/projects/3f3d9455-fca0-4e12-951d-4faa125851e6/files/a4fbed42-9685-40fd-83a1-7c172c26d110.jpg',
      location: 'Лесная, 53',
      price: 'Бесплатно',
      status: 'upcoming' as const,
      contact: '+79272463896',
    },
    {
      id: 3,
      title: 'Мастер-класс «Пуговки-цветочки»',
      date: '1 марта',
      time: '',
      category: 'Творчество',
      description: 'Создаём цветочные композиции из пластиковых пуговиц и превращаем переработанный материал в стильный декор. Идеальный подарок к 8 Марта — красивый и осознанный.',
      image: 'https://cdn4.telesco.pe/file/oF-hkydNqAdzGzGrwO5sATYlNS4jYvlKmHus_TuhNsmPD7J6XRmBBFqVNihZIPTorUXiHhqtmZCyZ74JDzn9TCXIQF_84LTRSEuMxhkmpxaYOFztYxpzzopi5pCcs0o38TuFmYwVOPb-aLe9MSIC_rVVrxwDRfkB9BjdJlJ37QlG8Jl2jaFCbM-GS7HfxRniMYOGqFvcB_Fp5KXlopNIfyKFkhjplsbcvIcT-qlz4cxeOqhk9MJwpxYxY3628U_MtvCS1LS4i6hZe27m2IF5p-HvPgif5B08vYuoPsjQ8Uvykbbkr7hwLmtJtVQ-YYvc8HiwJmE11SsPOsANy2BA1A.jpg',
      location: 'Лесная, 55',
      price: 'Бесплатно',
      status: 'upcoming' as const,
      contact: '+79272463896',
    },
    {
      id: 4,
      title: 'Детская творческая лаборатория',
      date: '8 марта',
      time: '11:00',
      category: 'Дети',
      description: 'Праздничный мастер-класс для детей 5-12 лет: рисование, лепка, создание открыток к 8 Марта.',
      image: 'https://cdn.poehali.dev/projects/3f3d9455-fca0-4e12-951d-4faa125851e6/files/67b02a17-0cef-457b-a164-f300e735c149.jpg',
      location: 'Лесная, 53',
      price: 'Бесплатно',
      status: 'upcoming' as const,
      contact: '+79272463896',
    },
    {
      id: 5,
      title: 'Нетворкинг «Креативный завтрак»',
      date: '9 февраля',
      time: '10:00',
      category: 'Нетворкинг',
      description: 'Утренняя встреча для предпринимателей и креативных специалистов. Знакомства, обмен опытом и свежие идеи за чашкой кофе.',
      image: 'https://cdn.poehali.dev/projects/3f3d9455-fca0-4e12-951d-4faa125851e6/files/8d8b5715-9dbc-483c-9f6c-70b49795e0d2.jpg',
      location: 'Лесная, 53',
      price: 'Бесплатно',
      status: 'past' as const,
      contact: '+79272463896',
    },
    {
      id: 6,
      title: 'Концерт «МузЦех Live»',
      date: '2 февраля',
      time: '19:00',
      category: 'Музыка',
      description: 'Живой концерт резидентов МузЦеха — авторская музыка, джем-сейшн и тёплая атмосфера.',
      image: 'https://cdn.poehali.dev/projects/3f3d9455-fca0-4e12-951d-4faa125851e6/files/a102abf8-08fb-4bd7-9524-33614d956fde.jpg',
      location: 'Лесная, 53',
      price: 'Бесплатно',
      status: 'past' as const,
      contact: '+79272463896',
    },
  ];

  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [eventsFilter, setEventsFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredEvents = eventsFilter === 'all' ? events : events.filter(e => e.status === eventsFilter);

  const residents = [
    { name: 'Мастерская «MARO»', field: 'Творческая мастерская', year: 2023 },
    { name: 'Кулинарная студия «Молоко»', field: 'Кулинария', year: 2023 },
    { name: 'Школа семейного образования «Матрешка»', field: 'Образование', year: 2023 },
    { name: 'Семейная мастерская «Бэйбика»', field: 'Творчество для семей', year: 2023 },
    { name: 'Художественная студия «Indi Art»', field: 'Изобразительное искусство', year: 2023 },
    { name: 'Студия керамики «VAZA»', field: 'Керамика', year: 2023 },
    { name: 'Танцевальная студия «BeU»', field: 'Танцы', year: 2023 },
    { name: 'Фотостудия «Вселенная»', field: 'Фотография', year: 2023 },
    { name: 'Студия английского языка', field: 'Иностранные языки', year: 2024 },
    { name: 'Вокальная студия «Про Голос»', field: 'Вокал', year: 2024 },
    { name: 'Школа барменов', field: 'Барменское дело', year: 2024 },
    { name: 'Детский развивающий центр «Шарли»', field: 'Детское развитие', year: 2024 },
    { name: '«Локация» ПАО НКНХ', field: 'Корпоративное пространство', year: 2023 },
    { name: 'Фотостудия «Рядом»', field: 'Фотография', year: 2024 },
    { name: '«МузЦех»', field: 'Музыка', year: 2024 },
    { name: 'Школа креативных индустрий г. Нижнекамска', field: 'Образование', year: 2023 },
  ];

  const spaces = [
    { name: 'Коворкинг-зона', capacity: '60 рабочих мест', features: ['Высокоскоростной Wi-Fi', 'Кофе-пространство', 'Переговорные комнаты', 'Зона отдыха'] },
    { name: 'Конференц-зал', capacity: 'до 150 человек', features: ['Проектор и экран', 'Звуковое оборудование', 'Сцена', 'Световое оборудование'] },
    { name: 'Медиа-студия', capacity: '10 человек', features: ['Звукозаписывающее оборудование', 'Видеомонтажные станции', 'Зеленый фон', 'Камеры'] },
    { name: 'Творческая мастерская', capacity: '25 мест', features: ['Мольберты', 'Инструменты', 'Материалы для творчества', 'Выставочное пространство'] },
    { name: 'IT-лаборатория', capacity: '20 рабочих станций', features: ['Мощные компьютеры', 'Лицензионное ПО', 'VR-оборудование', '3D-принтер'] },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'residents':
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-black mb-8 text-accent">Резиденты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {residents.map((resident, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur border-accent/20 hover:border-accent/50 transition-all hover-scale">
                  <CardHeader>
                    <CardTitle className="text-xl">{resident.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {resident.field} • С {resident.year} года
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-4xl font-black text-accent">Мероприятия</h2>
              <div className="flex gap-2">
                <Button
                  variant={eventsFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setEventsFilter('all')}
                >
                  Все
                </Button>
                <Button
                  variant={eventsFilter === 'upcoming' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setEventsFilter('upcoming')}
                >
                  Предстоящие
                </Button>
                <Button
                  variant={eventsFilter === 'past' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setEventsFilter('past')}
                >
                  Прошедшие
                </Button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="bg-card/50 backdrop-blur border-accent/20 hover:border-accent/50 transition-all hover-scale overflow-hidden">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="secondary">{event.category}</Badge>
                      {event.status === 'past' && (
                        <Badge variant="outline" className="bg-background/80 backdrop-blur">Прошло</Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-accent text-accent-foreground">{event.price}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="text-muted-foreground flex items-center gap-4 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {event.date}{event.time ? ` • ${event.time}` : ''}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="MapPin" size={14} />
                        {event.location}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      {event.status === 'upcoming' ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button onClick={() => setSelectedEvent(event)}>
                              Записаться
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-card border-accent/20">
                            <DialogHeader>
                              <DialogTitle>{selectedEvent?.title}</DialogTitle>
                              <DialogDescription>
                                {selectedEvent?.date} в {selectedEvent?.time} • {selectedEvent?.location}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <p className="text-sm text-muted-foreground">
                                {selectedEvent?.description}
                              </p>
                              <Separator className="bg-accent/20" />
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Для записи свяжитесь с нами:</p>
                                <a href={`tel:${selectedEvent?.contact}`} className="flex items-center gap-2 text-accent hover:underline">
                                  <Icon name="Phone" size={16} />
                                  {selectedEvent?.contact}
                                </a>
                              </div>
                              <p className="text-xs text-muted-foreground">Вход свободный, по предварительной записи</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">Мероприятие завершено</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredEvents.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Нет мероприятий в этой категории</p>
              </div>
            )}
          </div>
        );

      case 'spaces':
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-black mb-8 text-accent">Пространства</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {spaces.map((space, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur border-accent/20 hover:border-accent/50 transition-all hover-scale">
                  <CardHeader>
                    <CardTitle className="text-xl">{space.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Вместимость: {space.capacity}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {space.features.map((feature, i) => (
                        <Badge key={i} variant="outline">{feature}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'booking':
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-black mb-8 text-accent">Бронирование</h2>
            <Card className="bg-card/50 backdrop-blur border-accent/20 max-w-2xl">
              <CardHeader>
                <CardTitle>Забронировать пространство</CardTitle>
                <CardDescription>
                  Выберите подходящее пространство и время
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-accent/20 bg-background/50 mx-auto"
                />
                <Button className="w-full" size="lg">
                  Отправить заявку
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Функция бронирования будет добавлена в следующей версии
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case 'contacts':
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-black mb-8 text-accent">Контакты</h2>
            <Card className="bg-card/50 backdrop-blur border-accent/20 max-w-2xl">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="mt-1 text-accent" />
                  <div>
                    <h3 className="font-semibold mb-1 text-accent">Адрес</h3>
                    <p className="text-foreground font-medium">423570, Республика Татарстан</p>
                    <p className="text-foreground">г. Нижнекамск, ул. Лесная, д. 53</p>
                  </div>
                </div>
                <Separator className="bg-accent/20" />
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="mt-1 text-accent" />
                  <div>
                    <h3 className="font-semibold mb-1 text-accent">Телефон</h3>
                    <p className="text-foreground">+7 (8555) 45-67-89</p>
                    <p className="text-muted-foreground text-sm">Пн-Пт: 9:00 - 21:00, Сб-Вс: 10:00 - 18:00</p>
                  </div>
                </div>
                <Separator className="bg-accent/20" />
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="mt-1 text-accent" />
                  <div>
                    <h3 className="font-semibold mb-1 text-accent">Email</h3>
                    <p className="text-foreground">info@nk-baza.ru</p>
                  </div>
                </div>
                <Separator className="bg-accent/20" />
                <div className="flex items-start gap-4">
                  <Icon name="Globe" size={24} className="mt-1 text-accent" />
                  <div>
                    <h3 className="font-semibold mb-1 text-accent">Социальные сети</h3>
                    <div className="flex gap-3 mt-2">
                      <a href="#" className="text-accent hover:text-accent/80 transition-colors">ВКонтакте</a>
                      <a href="#" className="text-accent hover:text-accent/80 transition-colors">Telegram</a>
                      <a href="#" className="text-accent hover:text-accent/80 transition-colors">Instagram*</a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">*Meta признана экстремистской организацией в РФ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-black mb-8 text-accent">О центре</h2>
            <Card className="bg-card/50 backdrop-blur border-accent/20 max-w-3xl">
              <CardContent className="pt-6 space-y-4">
                <p className="text-lg leading-relaxed">
                  <strong className="text-accent">МАУ «Центр креативных индустрий «База»</strong> — современное пространство 
                  для развития творческих проектов и креативного предпринимательства в Нижнекамске.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Мы объединяем талантливых людей из разных сфер: дизайнеров, художников, медиа-специалистов, 
                  IT-разработчиков и креативных предпринимателей. База — это не просто коворкинг, это целая 
                  экосистема для развития креативных индустрий в Татарстане.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Здесь вы найдёте всё необходимое: современные рабочие пространства, медиа-студию, 
                  IT-лабораторию, творческую мастерскую и конференц-зал. Мы проводим образовательные программы, 
                  воркшопы, выставки и нетворкинг-мероприятия.
                </p>
                <div className="mt-8 p-6 bg-accent/10 border border-accent/20 rounded-lg">
                  <h3 className="text-xl font-bold text-accent mb-4">#НКБольшеЧемГород #АйдаНаБазу</h3>
                  <p className="text-muted-foreground">
                    Присоединяйтесь к сообществу креативных людей Нижнекамска!
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-black text-accent mb-2">16</div>
                    <div className="text-sm text-muted-foreground">Резидентов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-accent mb-2">200+</div>
                    <div className="text-sm text-muted-foreground">Мероприятий в год</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-accent mb-2">5</div>
                    <div className="text-sm text-muted-foreground">Пространств</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-12">
            <div className="relative w-full max-w-5xl mx-auto py-12">
              <img 
                src="https://cdn.poehali.dev/projects/3f3d9455-fca0-4e12-951d-4faa125851e6/bucket/77f2038a-8901-4074-b16b-507c855a5a37.png" 
                alt="БАЗА - Центр креативных индустрий"
                className="w-full h-auto"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="bg-card/50 backdrop-blur border-accent/20 hover:border-accent/50 transition-all hover-scale cursor-pointer" onClick={() => setActiveSection('events')}>
                <CardHeader>
                  <Icon name="Calendar" size={32} className="mb-4 text-accent" />
                  <CardTitle className="text-accent">Мероприятия</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Воркшопы, выставки и нетворкинг
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-accent/20 hover:border-accent/50 transition-all hover-scale cursor-pointer" onClick={() => setActiveSection('spaces')}>
                <CardHeader>
                  <Icon name="Building2" size={32} className="mb-4 text-accent" />
                  <CardTitle className="text-accent">Пространства</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Коворкинг, студии и залы
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-accent/20 hover:border-accent/50 transition-all hover-scale cursor-pointer" onClick={() => setActiveSection('residents')}>
                <CardHeader>
                  <Icon name="Users" size={32} className="mb-4 text-accent" />
                  <CardTitle className="text-accent">Резиденты</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Креативные команды и проекты
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen urban-texture bg-background">
      <nav className="border-b border-accent/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setActiveSection('main')}
              className="text-2xl font-black tracking-tight text-accent hover:text-accent/80 transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              БАЗА
            </button>
            <div className="flex gap-6">
              {[
                { id: 'main', label: 'Главная', icon: 'Home' },
                { id: 'residents', label: 'Резиденты', icon: 'Users' },
                { id: 'events', label: 'Мероприятия', icon: 'Calendar' },
                { id: 'spaces', label: 'Пространства', icon: 'Building2' },
                { id: 'booking', label: 'Бронирование', icon: 'Clock' },
                { id: 'contacts', label: 'Контакты', icon: 'Phone' },
                { id: 'about', label: 'О центре', icon: 'Info' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`hidden md:flex items-center gap-2 transition-colors font-medium ${
                    activeSection === item.id ? 'text-accent font-bold' : 'text-muted-foreground hover:text-accent'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      <footer className="border-t border-white/20 bg-background/50 backdrop-blur-sm mt-24">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 БАЗА — Центр креативных индустрий
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;