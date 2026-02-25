import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface ApiEvent {
  id: number;
  title: string;
  date_text: string;
  time_text: string;
  category: string;
  description: string;
  image: string;
  location: string;
  price: string;
  status: 'upcoming' | 'past';
  contact: string;
}

const EVENTS_API = 'https://functions.poehali.dev/69176b78-d673-4802-b7ae-5739d7147e4c';

const navItems = [
  { id: 'main', label: 'Главная' },
  { id: 'residents', label: 'Резиденты' },
  { id: 'events', label: 'Мероприятия' },
  { id: 'spaces', label: 'Пространства' },
  { id: 'booking', label: 'Бронирование' },
  { id: 'contacts', label: 'Контакты' },
  { id: 'about', label: 'О центре' },
];

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
  { name: 'Коворкинг-зона', capacity: '60 рабочих мест', icon: 'Laptop', features: ['Высокоскоростной Wi-Fi', 'Кофе-пространство', 'Переговорные комнаты', 'Зона отдыха'] },
  { name: 'Конференц-зал', capacity: 'до 150 человек', icon: 'Mic2', features: ['Проектор и экран', 'Звуковое оборудование', 'Сцена', 'Световое оборудование'] },
  { name: 'Медиа-студия', capacity: '10 человек', icon: 'Video', features: ['Звукозаписывающее оборудование', 'Видеомонтажные станции', 'Зелёный фон', 'Камеры'] },
  { name: 'Творческая мастерская', capacity: '25 мест', icon: 'Palette', features: ['Мольберты', 'Инструменты', 'Материалы для творчества', 'Выставочное пространство'] },
  { name: 'IT-лаборатория', capacity: '20 рабочих станций', icon: 'Cpu', features: ['Мощные компьютеры', 'Лицензионное ПО', 'VR-оборудование', '3D-принтер'] },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('main');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsFilter, setEventsFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedEvent, setSelectedEvent] = useState<ApiEvent | null>(null);

  useEffect(() => {
    setEventsLoading(true);
    fetch(EVENTS_API)
      .then(r => r.json())
      .then(data => setEvents(data))
      .finally(() => setEventsLoading(false));
  }, []);

  const filteredEvents = eventsFilter === 'all' ? events : events.filter(e => e.status === eventsFilter);

  const go = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {

      case 'residents':
        return (
          <div className="animate-fade-in">
            <SectionTitle>Резиденты</SectionTitle>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {residents.map((r, i) => (
                <div key={i} className="bg-card p-6 hover:bg-[hsl(15,8%,12%)] transition-colors group">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-base leading-tight mb-1 group-hover:text-[hsl(var(--accent))] transition-colors">{r.name}</p>
                      <p className="text-sm text-muted-foreground">{r.field}</p>
                    </div>
                    <span className="text-xs text-muted-foreground border border-border px-2 py-1 shrink-0 ml-4">{r.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
              <SectionTitle>Мероприятия</SectionTitle>
              <div className="flex gap-0 border border-border">
                {(['all', 'upcoming', 'past'] as const).map((f, i) => (
                  <button
                    key={f}
                    onClick={() => setEventsFilter(f)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${i < 2 ? 'border-r border-border' : ''} ${eventsFilter === f ? 'bg-accent text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                  >
                    {f === 'all' ? 'Все' : f === 'upcoming' ? 'Предстоящие' : 'Прошедшие'}
                  </button>
                ))}
              </div>
            </div>
            {eventsLoading && (
              <div className="flex items-center justify-center py-24 text-muted-foreground gap-3">
                <Icon name="Loader" size={20} className="animate-spin" />
                <span>Загрузка...</span>
              </div>
            )}
            {!eventsLoading && filteredEvents.length === 0 && (
              <div className="text-center py-24 text-muted-foreground">
                <p className="font-['Bebas_Neue'] text-3xl tracking-wider mb-2">Нет мероприятий</p>
                <p className="text-sm">В этой категории пусто</p>
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-card group hover:bg-[hsl(15,8%,12%)] transition-colors">
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-accent text-white text-xs px-2 py-1 font-semibold uppercase tracking-wide">{event.category}</span>
                      {event.status === 'past' && (
                        <span className="bg-black/70 text-white/60 text-xs px-2 py-1 uppercase tracking-wide">Прошло</span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/80 text-white text-xs px-2 py-1 font-medium">{event.price}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-['Bebas_Neue'] text-xl text-white leading-tight">{event.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={12} />
                        {event.date_text}{event.time_text ? ` • ${event.time_text}` : ''}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="MapPin" size={12} />
                        {event.location}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{event.description}</p>
                    {event.status === 'upcoming' ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            onClick={() => setSelectedEvent(event)}
                            className="text-sm font-semibold text-accent border border-accent/40 px-4 py-2 hover:bg-accent hover:text-white transition-colors"
                          >
                            Записаться →
                          </button>
                        </DialogTrigger>
                        <DialogContent className="bg-card border-border rounded-none">
                          <DialogHeader>
                            <DialogTitle className="font-['Bebas_Neue'] text-2xl tracking-wider">{selectedEvent?.title}</DialogTitle>
                            <DialogDescription className="text-muted-foreground text-sm">
                              {selectedEvent?.date_text}{selectedEvent?.time_text ? ` в ${selectedEvent.time_text}` : ''} • {selectedEvent?.location}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-2">
                            <p className="text-sm leading-relaxed">{selectedEvent?.description}</p>
                            <Separator className="bg-border" />
                            <div>
                              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Для записи:</p>
                              <a href={`tel:${selectedEvent?.contact}`} className="flex items-center gap-2 text-accent hover:underline font-medium">
                                <Icon name="Phone" size={16} />
                                {selectedEvent?.contact}
                              </a>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Завершено</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'spaces':
        return (
          <div className="animate-fade-in">
            <SectionTitle>Пространства</SectionTitle>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {spaces.map((space, i) => (
                <div key={i} className="bg-card p-6 hover:bg-[hsl(15,8%,12%)] transition-colors group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 border border-accent/30 flex items-center justify-center group-hover:border-accent transition-colors">
                      <Icon name={space.icon} size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-['Bebas_Neue'] text-xl tracking-wider">{space.name}</h3>
                      <p className="text-xs text-muted-foreground">{space.capacity}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {space.features.map((f, j) => (
                      <span key={j} className="text-xs border border-border px-2 py-1 text-muted-foreground">{f}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'booking':
        return (
          <div className="animate-fade-in max-w-xl">
            <SectionTitle>Бронирование</SectionTitle>
            <div className="bg-card border border-border p-8">
              <p className="text-sm text-muted-foreground mb-6">Выберите дату и отправьте заявку — мы свяжемся с вами для подтверждения.</p>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="mb-6 border border-border rounded-none bg-transparent"
              />
              <button className="w-full bg-accent text-white py-3 font-semibold text-sm uppercase tracking-wider hover:bg-accent/90 transition-colors">
                Отправить заявку
              </button>
              <p className="text-xs text-center text-muted-foreground mt-3">Онлайн-бронирование будет доступно в ближайшее время</p>
            </div>
          </div>
        );

      case 'contacts':
        return (
          <div className="animate-fade-in max-w-2xl">
            <SectionTitle>Контакты</SectionTitle>
            <div className="bg-card border border-border divide-y divide-border">
              <ContactRow icon="MapPin" label="Адрес">
                <p className="text-sm">423570, Республика Татарстан</p>
                <p className="text-sm font-medium">г. Нижнекамск, ул. Лесная, д. 53</p>
              </ContactRow>
              <ContactRow icon="Phone" label="Телефон">
                <p className="text-sm">+7 (8555) 45-67-89</p>
                <p className="text-xs text-muted-foreground">Пн–Пт: 9:00 – 21:00, Сб–Вс: 10:00 – 18:00</p>
              </ContactRow>
              <ContactRow icon="Mail" label="Email">
                <p className="text-sm">info@nk-baza.ru</p>
              </ContactRow>
              <ContactRow icon="Globe" label="Соцсети">
                <div className="flex gap-4 flex-wrap">
                  <a href="https://t.me/nkBaza" target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">Telegram</a>
                  <a href="#" className="text-sm text-accent hover:underline">ВКонтакте</a>
                  <a href="#" className="text-sm text-accent hover:underline">Instagram*</a>
                </div>
                <p className="text-xs text-muted-foreground mt-1">*Meta признана экстремистской организацией в РФ</p>
              </ContactRow>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="animate-fade-in max-w-3xl">
            <SectionTitle>О центре</SectionTitle>
            <div className="bg-card border border-border p-8 space-y-5">
              <p className="text-base leading-relaxed">
                <span className="text-accent font-semibold">МАУ «Центр креативных индустрий «База»</span> — современное пространство для развития
                творческих проектов и креативного предпринимательства в Нижнекамске.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Мы объединяем талантливых людей из разных сфер: дизайнеров, художников, медиа-специалистов,
                IT-разработчиков и креативных предпринимателей. База — это не просто коворкинг, это целая
                экосистема для развития креативных индустрий в Татарстане.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Здесь вы найдёте всё необходимое: современные рабочие пространства, медиа-студию,
                IT-лабораторию, творческую мастерскую и конференц-зал. Мы проводим образовательные программы,
                воркшопы, выставки и нетворкинг-мероприятия.
              </p>

              <div className="border border-accent/20 bg-accent/5 p-5 mt-4">
                <p className="font-['Bebas_Neue'] text-xl tracking-wider text-accent mb-1">#НКБольшеЧемГород #АйдаНаБазу</p>
                <p className="text-sm text-muted-foreground">Присоединяйтесь к сообществу креативных людей Нижнекамска!</p>
              </div>

              <div className="grid grid-cols-3 gap-px bg-border mt-6">
                {[['16', 'Резидентов'], ['200+', 'Мероприятий в год'], ['5', 'Пространств']].map(([num, label]) => (
                  <div key={label} className="bg-card px-4 py-6 text-center">
                    <div className="font-['Bebas_Neue'] text-5xl text-accent leading-none mb-2">{num}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="animate-fade-in space-y-16">
            {/* Hero */}
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/3f3d9455-fca0-4e12-951d-4faa125851e6/bucket/77f2038a-8901-4074-b16b-507c855a5a37.png"
                alt="БАЗА — Центр креативных индустрий"
                className="w-full max-w-2xl h-auto mx-auto"
              />
              <p className="text-center text-muted-foreground mt-6 text-sm uppercase tracking-widest">
                Центр креативных индустрий · Нижнекамск
              </p>
            </div>

            {/* Marquee */}
            <div className="border-y border-border py-3 overflow-hidden bg-accent/5">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="font-['Bebas_Neue'] text-lg tracking-[0.2em] text-accent/70 mx-8">
                    БАЗА · НИЖНЕКАМСК · КРЕАТИВНЫЕ ИНДУСТРИИ · КОВОРКИНГ · СТУДИИ · МАСТЕРСКИЕ ·
                  </span>
                ))}
              </div>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {[
                { id: 'events', icon: 'Calendar', title: 'Мероприятия', desc: 'Воркшопы, выставки и нетворкинг' },
                { id: 'spaces', icon: 'Building2', title: 'Пространства', desc: 'Коворкинг, студии и залы' },
                { id: 'residents', icon: 'Users', title: 'Резиденты', desc: 'Креативные команды и проекты' },
              ].map(card => (
                <button
                  key={card.id}
                  onClick={() => go(card.id)}
                  className="bg-card p-8 text-left group hover:bg-[hsl(15,8%,12%)] transition-colors"
                >
                  <div className="w-12 h-12 border border-border flex items-center justify-center mb-6 group-hover:border-accent transition-colors">
                    <Icon name={card.icon} size={22} className="text-accent" />
                  </div>
                  <h3 className="font-['Bebas_Neue'] text-2xl tracking-wider mb-2 group-hover:text-accent transition-colors">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                  <div className="mt-6 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Перейти →</div>
                </button>
              ))}
            </div>

            {/* Bottom info strip */}
            <div className="grid sm:grid-cols-2 gap-px bg-border">
              <div className="bg-card p-6 flex items-center gap-4">
                <Icon name="MapPin" size={18} className="text-accent shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Адрес</p>
                  <p className="text-sm font-medium">г. Нижнекамск, ул. Лесная, 53</p>
                </div>
              </div>
              <div className="bg-card p-6 flex items-center gap-4">
                <Icon name="Phone" size={18} className="text-accent shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Телефон</p>
                  <p className="text-sm font-medium">+7 (950) 317-13-77</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen grid-texture bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-background/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-0">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => go('main')}
              className="font-['Bebas_Neue'] text-3xl tracking-widest text-foreground hover:text-accent transition-colors"
            >
              БАЗА
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0">
              {navItems.slice(1).map(item => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`px-4 h-14 text-xs uppercase tracking-widest font-medium transition-colors border-r border-border first:border-l ${
                    activeSection === item.id
                      ? 'text-accent bg-accent/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(o => !o)}
            >
              <span className={`w-6 h-0.5 bg-foreground transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-foreground transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-foreground transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background divide-y divide-border">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`w-full text-left px-4 py-3 text-sm uppercase tracking-widest transition-colors ${
                  activeSection === item.id ? 'text-accent bg-accent/5' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24 bg-card/40">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-['Bebas_Neue'] text-xl tracking-widest text-muted-foreground">БАЗА</span>
          <p className="text-xs text-muted-foreground">© 2024 МАУ «Центр креативных индустрий «База»</p>
          <a
            href="https://t.me/nkBaza"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-accent hover:underline uppercase tracking-wider"
          >
            Telegram →
          </a>
        </div>
      </footer>
    </div>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-['Bebas_Neue'] text-5xl tracking-wider mb-8 text-foreground">
    <span className="border-b-2 border-accent pb-1">{children}</span>
  </h2>
);

const ContactRow = ({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) => (
  <div className="flex items-start gap-4 p-6">
    <Icon name={icon} size={20} className="text-accent mt-0.5 shrink-0" />
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
      {children}
    </div>
  </div>
);

export default Index;
