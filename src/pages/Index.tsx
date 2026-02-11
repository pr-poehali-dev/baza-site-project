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
  const [selectedEvent, setSelectedEvent] = useState<{ id: number; title: string; date: string; time: string; category: string; spots: number } | null>(null);

  const events = [
    { id: 1, title: 'Воркшоп по графическому дизайну', date: '14 февраля', time: '18:00', category: 'Дизайн', spots: 20 },
    { id: 2, title: 'Мастер-класс по созданию подкастов', date: '16 февраля', time: '17:00', category: 'Медиа', spots: 15 },
    { id: 3, title: 'Нетворкинг для креативных предпринимателей', date: '18 февраля', time: '19:00', category: 'Нетворкинг', spots: 30 },
    { id: 4, title: 'Лекция: Digital-маркетинг для творческих проектов', date: '20 февраля', time: '18:30', category: 'Образование', spots: 25 },
    { id: 5, title: 'Выставка современного искусства Татарстана', date: '22 февраля', time: '15:00', category: 'Выставка', spots: 50 },
    { id: 6, title: 'Pitch-сессия для стартапов', date: '25 февраля', time: '19:00', category: 'Бизнес', spots: 40 },
  ];

  const residents = [
    { name: 'Дизайн-студия "Графика"', field: 'Графический дизайн', year: 2023 },
    { name: 'Медиа-агентство "Контент Pro"', field: 'Контент-продакшн', year: 2023 },
    { name: 'IT-команда "Code Creators"', field: 'Разработка', year: 2024 },
    { name: 'Творческое объединение "Арт-Площадка"', field: 'Современное искусство', year: 2024 },
    { name: 'Студия анимации "Motion Lab"', field: 'Анимация', year: 2024 },
    { name: 'Образовательный проект "Креатив Школа"', field: 'Образование', year: 2023 },
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
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-black text-accent">Мероприятия</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-accent/20 bg-card/50 backdrop-blur p-3"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="bg-card/50 backdrop-blur border-accent/20 hover:border-accent/50 transition-all hover-scale">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          <Icon name="Calendar" size={16} className="inline mr-2" />
                          {event.date} • {event.time}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{event.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Осталось мест: {event.spots}
                      </span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedEvent(event)}>
                            Зарегистрироваться
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card border-accent/20">
                          <DialogHeader>
                            <DialogTitle>Регистрация на мероприятие</DialogTitle>
                            <DialogDescription>
                              {selectedEvent?.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <p className="text-sm text-muted-foreground">
                              Дата: {selectedEvent?.date} в {selectedEvent?.time}
                            </p>
                            <p className="text-sm">
                              Функция регистрации будет добавлена в следующей версии.
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                    <div className="text-3xl font-black text-accent mb-2">60+</div>
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