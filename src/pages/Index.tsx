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
    { id: 1, title: 'Воркшоп по дизайн-мышлению', date: '15 февраля', time: '19:00', category: 'Образование', spots: 12 },
    { id: 2, title: 'Нетворкинг для стартапов', date: '18 февраля', time: '18:00', category: 'Нетворкинг', spots: 25 },
    { id: 3, title: 'Выставка современного искусства', date: '20 февраля', time: '12:00', category: 'Культура', spots: 50 },
    { id: 4, title: 'Мастер-класс по анимации', date: '22 февраля', time: '17:00', category: 'Мастер-класс', spots: 15 },
  ];

  const residents = [
    { name: 'Студия Архитектуры "Пространство"', field: 'Архитектура', year: 2023 },
    { name: 'Creative Lab', field: 'Дизайн', year: 2024 },
    { name: 'Tech Innovators', field: 'IT', year: 2024 },
    { name: 'Art Collective', field: 'Искусство', year: 2023 },
  ];

  const spaces = [
    { name: 'Коворкинг', capacity: '50 мест', features: ['Wi-Fi', 'Кофе-зона', 'Переговорные'] },
    { name: 'Конференц-зал', capacity: '100 человек', features: ['Проектор', 'Звук', 'Сцена'] },
    { name: 'Творческая мастерская', capacity: '20 мест', features: ['Инструменты', 'Материалы', 'Хранение'] },
    { name: 'Студия звукозаписи', capacity: '5 человек', features: ['Оборудование', 'Звукоизоляция'] },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'residents':
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold mb-8">Резиденты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {residents.map((resident, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur border-white/20 hover-scale">
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
              <h2 className="text-4xl font-bold">Мероприятия</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-white/20 bg-card/80 backdrop-blur p-3"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="bg-card/80 backdrop-blur border-white/20 hover-scale">
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
                        <DialogContent className="bg-card border-white/20">
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
            <h2 className="text-4xl font-bold mb-8">Пространства</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {spaces.map((space, index) => (
                <Card key={index} className="bg-card/80 backdrop-blur border-white/20 hover-scale">
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
            <h2 className="text-4xl font-bold mb-8">Бронирование</h2>
            <Card className="bg-card/80 backdrop-blur border-white/20 max-w-2xl">
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
                  className="rounded-md border border-white/20 bg-background/50 mx-auto"
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
            <h2 className="text-4xl font-bold mb-8">Контакты</h2>
            <Card className="bg-card/80 backdrop-blur border-white/20 max-w-2xl">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="mt-1 text-accent" />
                  <div>
                    <h3 className="font-semibold mb-1">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Креативная, д. 1</p>
                  </div>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="mt-1 text-accent" />
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="mt-1 text-accent" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@baza.ru</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold mb-8">О центре</h2>
            <Card className="bg-card/80 backdrop-blur border-white/20 max-w-3xl">
              <CardContent className="pt-6 space-y-4">
                <p className="text-lg leading-relaxed">
                  <strong>БАЗА</strong> — это пространство для креативных индустрий, где встречаются 
                  талантливые люди, рождаются идеи и реализуются проекты.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Мы создали экосистему, которая объединяет дизайнеров, архитекторов, художников, 
                  программистов и предпринимателей. Здесь вы найдёте пространства для работы, 
                  образовательные программы, возможности для нетворкинга и вдохновение для новых проектов.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Резидентов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">120+</div>
                    <div className="text-sm text-muted-foreground">Мероприятий в год</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">4</div>
                    <div className="text-sm text-muted-foreground">Пространства</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-12">
            <div className="text-center space-y-6 py-20">
              <div className="flex flex-col items-center gap-8">
                <img 
                  src="https://cdn.poehali.dev/projects/3f3d9455-fca0-4e12-951d-4faa125851e6/bucket/220752ea-19b3-4184-a6f6-8baa0fb93907.png" 
                  alt="БАЗА"
                  className="w-full max-w-3xl"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="bg-card/80 backdrop-blur border-white/20 hover-scale cursor-pointer" onClick={() => setActiveSection('events')}>
                <CardHeader>
                  <Icon name="Calendar" size={32} className="mb-4 text-accent" />
                  <CardTitle>Мероприятия</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Воркшопы, выставки и нетворкинг
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-white/20 hover-scale cursor-pointer" onClick={() => setActiveSection('spaces')}>
                <CardHeader>
                  <Icon name="Building2" size={32} className="mb-4 text-accent" />
                  <CardTitle>Пространства</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Коворкинг, студии и залы
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-white/20 hover-scale cursor-pointer" onClick={() => setActiveSection('residents')}>
                <CardHeader>
                  <Icon name="Users" size={32} className="mb-4 text-accent" />
                  <CardTitle>Резиденты</CardTitle>
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
    <div className="min-h-screen concrete-texture">
      <nav className="border-b border-white/20 bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setActiveSection('main')}
              className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
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
                  className={`hidden md:flex items-center gap-2 hover:text-accent transition-colors ${
                    activeSection === item.id ? 'text-accent font-semibold' : ''
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