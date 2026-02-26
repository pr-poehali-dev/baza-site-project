import { useState, useEffect } from 'react';
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
  { id: 'main',      label: 'Главная' },
  { id: 'events',    label: 'Мероприятия' },
  { id: 'residents', label: 'Резиденты' },
  { id: 'spaces',    label: 'Пространства' },
  { id: 'booking',   label: 'Бронирование' },
  { id: 'contacts',  label: 'Контакты' },
  { id: 'about',     label: 'О центре' },
];

const residents = [
  { name: 'Мастерская «MARO»',                         field: 'Творческая мастерская' },
  { name: 'Кулинарная студия «Молоко»',                 field: 'Кулинария' },
  { name: 'Школа семейного образования «Матрешка»',    field: 'Образование' },
  { name: 'Семейная мастерская «Бэйбика»',              field: 'Творчество для семей' },
  { name: 'Художественная студия «Indi Art»',           field: 'Изобразительное искусство' },
  { name: 'Студия керамики «VAZA»',                     field: 'Керамика' },
  { name: 'Танцевальная студия «BeU»',                  field: 'Танцы' },
  { name: 'Фотостудия «Вселенная»',                     field: 'Фотография' },
  { name: 'Студия английского языка',                   field: 'Иностранные языки' },
  { name: 'Вокальная студия «Про Голос»',               field: 'Вокал' },
  { name: 'Школа барменов',                             field: 'Барменское дело' },
  { name: 'Детский развивающий центр «Шарли»',          field: 'Детское развитие' },
  { name: '«Локация» ПАО НКНХ',                        field: 'Корпоративное пространство' },
  { name: 'Фотостудия «Рядом»',                         field: 'Фотография' },
  { name: '«МузЦех»',                                  field: 'Музыка' },
  { name: 'Школа креативных индустрий г. Нижнекамска',  field: 'Образование' },
];

const spaces = [
  { name: 'Коворкинг-зона',        capacity: '60 рабочих мест', icon: 'Laptop',  features: ['Wi-Fi', 'Кофе-зона', 'Переговорные', 'Зона отдыха'] },
  { name: 'Конференц-зал',         capacity: 'до 150 человек',  icon: 'Mic2',    features: ['Проектор', 'Звук', 'Сцена', 'Свет'] },
  { name: 'Медиа-студия',          capacity: '10 человек',      icon: 'Video',   features: ['Запись звука', 'Видеомонтаж', 'Хромакей', 'Камеры'] },
  { name: 'Творческая мастерская', capacity: '25 мест',         icon: 'Palette', features: ['Мольберты', 'Инструменты', 'Материалы', 'Выставка'] },
  { name: 'IT-лаборатория',        capacity: '20 станций',      icon: 'Cpu',     features: ['ПК', 'Лицензионное ПО', 'VR', '3D-принтер'] },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('main');
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [date, setDate]                   = useState<Date | undefined>(new Date());
  const [events, setEvents]               = useState<ApiEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsFilter, setEventsFilter]   = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    setEventsLoading(true);
    fetch(EVENTS_API)
      .then(r => r.json())
      .then(d => setEvents(Array.isArray(d) ? d : []))
      .catch(() => setEvents([]))
      .finally(() => setEventsLoading(false));
  }, []);

  const filtered = eventsFilter === 'all' ? events : events.filter(e => e.status === eventsFilter);
  const go = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeSection) {

      // ── МЕРОПРИЯТИЯ ─────────────────────────────────────────────────
      case 'events': return (
        <div className="animate-fade-in">
          <PageHeader top="Мероприятия" sub="Мастер‑классы и события" />
          <div className="flex gap-0 mb-10 border border-[#3a3c42] w-fit">
            {(['all','upcoming','past'] as const).map((f, i) => (
              <button key={f} onClick={() => setEventsFilter(f)}
                className={`px-5 py-2 font-['Oswald'] text-sm uppercase tracking-widest transition-colors
                  ${i < 2 ? 'border-r border-[#3a3c42]' : ''}
                  ${eventsFilter === f ? 'bg-[#F5E642] text-[#2d2f34]' : 'text-[#888] hover:text-white hover:bg-[#383a40]'}`}>
                {f === 'all' ? 'Все' : f === 'upcoming' ? 'Предстоящие' : 'Прошедшие'}
              </button>
            ))}
          </div>

          {eventsLoading && (
            <div className="flex items-center gap-3 py-20 text-[#888]">
              <Icon name="Loader" size={18} className="animate-spin" />
              <span className="font-['Oswald'] tracking-widest uppercase text-sm">Загрузка...</span>
            </div>
          )}
          {!eventsLoading && filtered.length === 0 && (
            <p className="font-['Oswald'] text-3xl text-[#555] tracking-wider py-20 text-center">Нет мероприятий</p>
          )}

          <div className="divide-y divide-[#3a3c42]">
            {filtered.map(ev => (
              <div key={ev.id} className="py-6 flex gap-6 md:gap-10 items-start group">
                <div className="w-28 md:w-36 shrink-0">
                  <p className="font-['Oswald'] text-xl text-[#F5E642] leading-tight">{ev.time_text || ev.date_text}</p>
                  <p className="text-xs text-[#888] mt-1 leading-snug">{ev.price}</p>
                  <p className="text-xs text-[#888] leading-snug">{ev.location}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Oswald'] text-lg md:text-xl text-white leading-tight uppercase tracking-wide">
                    {ev.title}
                    {ev.status === 'past' && (
                      <span className="ml-2 text-sm text-[#555] normal-case tracking-normal font-['PT_Sans']">завершено</span>
                    )}
                  </p>
                  <p className="text-sm text-[#999] mt-1">{ev.category}</p>
                  <p className="text-sm text-[#bbb] mt-2 leading-relaxed line-clamp-2">{ev.description}</p>
                  {ev.status === 'upcoming' && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="mt-3 font-['Oswald'] text-sm uppercase tracking-widest text-[#F5E642] hover:underline">
                          Записаться →
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#2d2f34] border-[#3a3c42] rounded-none">
                        <DialogHeader>
                          <DialogTitle className="font-['Oswald'] text-2xl tracking-wide uppercase text-white">{ev.title}</DialogTitle>
                          <DialogDescription className="text-[#999] text-sm">
                            {ev.date_text}{ev.time_text ? ` · ${ev.time_text}` : ''} · {ev.location}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-2">
                          <p className="text-sm leading-relaxed text-[#ccc]">{ev.description}</p>
                          <Separator className="bg-[#3a3c42]" />
                          {ev.contact && (
                            <a href={`tel:${ev.contact}`}
                              className="flex items-center gap-2 text-[#F5E642] hover:underline font-['Oswald'] uppercase tracking-widest text-sm">
                              <Icon name="Phone" size={16} />{ev.contact}
                            </a>
                          )}
                          <div className="pt-1">
                            <p className="text-xs text-[#666] mb-3">Для записи свяжитесь с нами:</p>
                            <div className="flex flex-col gap-2">
                              <a href="tel:+79503171377"
                                className="flex items-center gap-2 text-[#F5E642] hover:underline font-['Oswald'] uppercase tracking-widest text-sm">
                                <Icon name="Phone" size={16} />+7 (950) 317‑13‑77
                              </a>
                              <a href="https://t.me/nkBaza" target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 text-[#F5E642] hover:underline font-['Oswald'] uppercase tracking-widest text-sm">
                                <Icon name="Send" size={16} />Telegram @NKBAZA
                              </a>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

      // ── РЕЗИДЕНТЫ ───────────────────────────────────────────────────
      case 'residents': return (
        <div className="animate-fade-in">
          <PageHeader top="Резиденты" sub="Креативные команды и проекты" />
          <div className="divide-y divide-[#3a3c42]">
            {residents.map((r, i) => (
              <div key={i} className="py-4 flex items-baseline gap-4 group">
                <span className="font-['Oswald'] text-3xl text-[#F5E642] w-10 shrink-0 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-['Oswald'] text-lg uppercase tracking-wide text-white group-hover:text-[#F5E642] transition-colors leading-tight">
                    {r.name}
                  </p>
                  <p className="text-sm text-[#999]">{r.field}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

      // ── ПРОСТРАНСТВА ────────────────────────────────────────────────
      case 'spaces': return (
        <div className="animate-fade-in">
          <PageHeader top="Пространства" sub="Залы и студии" />
          <div className="grid md:grid-cols-2 gap-px bg-[#3a3c42]">
            {spaces.map((s, i) => (
              <div key={i} className="bg-[#2d2f34] p-6 hover:bg-[#333640] transition-colors group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 border border-[#F5E642]/30 flex items-center justify-center group-hover:border-[#F5E642] transition-colors">
                    <Icon name={s.icon} size={20} className="text-[#F5E642]" />
                  </div>
                  <div>
                    <h3 className="font-['Oswald'] text-xl tracking-wide text-white uppercase">{s.name}</h3>
                    <p className="text-xs text-[#888]">{s.capacity}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.features.map((f, j) => (
                    <span key={j} className="text-xs border border-[#3a3c42] px-2 py-1 text-[#999]">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

      // ── БРОНИРОВАНИЕ ────────────────────────────────────────────────
      case 'booking': return <BookingForm spaces={spaces} date={date} setDate={setDate} />;

      // ── КОНТАКТЫ ────────────────────────────────────────────────────
      case 'contacts': return (
        <div className="animate-fade-in max-w-xl">
          <PageHeader top="Контакты" sub="Нижнекамск" />
          <div className="divide-y divide-[#3a3c42] border border-[#3a3c42]">
            {[
              { icon:'MapPin', label:'Адрес',     content:'г. Нижнекамск, ул. Лесная, 53' },
              { icon:'Phone',  label:'Телефон',   content:'+7 (8555) 32-38-48' },
              { icon:'Phone',  label:'Мобильный', content:'+7 (950) 317-13-77' },
              { icon:'Mail',   label:'Email',     content:'info@nk-baza.ru' },
              { icon:'Clock',  label:'Режим',     content:'Пн–Пт: 9:00–21:00  ·  Сб–Вс: 10:00–18:00' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-4 p-5">
                <Icon name={row.icon} size={18} className="text-[#F5E642] shrink-0" />
                <div>
                  <p className="text-[10px] text-[#777] uppercase tracking-[0.25em] font-['Oswald'] mb-0.5">{row.label}</p>
                  <p className="text-sm text-white">{row.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-px border border-[#3a3c42] p-5 flex items-center gap-4 bg-[#292b30]">
            <Icon name="Send" size={18} className="text-[#F5E642] shrink-0" />
            <div>
              <p className="text-[10px] text-[#777] uppercase tracking-[0.25em] font-['Oswald'] mb-1">Telegram</p>
              <a href="https://t.me/nkBaza" target="_blank" rel="noreferrer"
                className="text-[#F5E642] font-['Oswald'] text-sm uppercase tracking-widest hover:underline">
                @NKBAZA →
              </a>
            </div>
          </div>
        </div>
      );

      // ── О ЦЕНТРЕ ────────────────────────────────────────────────────
      case 'about': return (
        <div className="animate-fade-in max-w-2xl">
          <PageHeader top="О центре" sub="МАУ «Центр креативных индустрий «База»" />
          <div className="border border-[#3a3c42] p-7 bg-[#292b30] space-y-5">
            <p className="leading-relaxed text-[#ccc]">
              <span className="text-[#F5E642] font-bold">База</span> — современное пространство для развития
              творческих проектов и креативного предпринимательства в Нижнекамске.
            </p>
            <p className="text-sm text-[#999] leading-relaxed">
              Мы объединяем дизайнеров, художников, медиа-специалистов, IT-разработчиков и предпринимателей.
              База — экосистема для развития креативных индустрий Татарстана.
            </p>
            <div className="border-l-4 border-[#F5E642] pl-4 py-1 bg-[#F5E642]/5">
              <p className="font-['Oswald'] text-xl text-[#F5E642] tracking-wider">#НКБольшеЧемГород</p>
              <p className="font-['Oswald'] text-xl text-[#F5E642] tracking-wider">#АйдаНаБазу</p>
            </div>
            <div className="grid grid-cols-3 gap-px bg-[#3a3c42] mt-4">
              {[['16','Резидентов'],['200+','Событий в год'],['5','Пространств']].map(([n, l]) => (
                <div key={l} className="bg-[#2d2f34] p-5 text-center">
                  <p className="font-['Oswald'] text-5xl text-[#F5E642] leading-none">{n}</p>
                  <p className="text-xs text-[#777] uppercase tracking-widest mt-2">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

      // ── ГЛАВНАЯ ─────────────────────────────────────────────────────
      default: return (
        <div className="animate-fade-in">

          {/* Hero-афиша */}
          <div className="relative overflow-hidden mb-8 border border-[#3a3c42]" style={{background:'#292b30'}}>
            <div className="absolute top-0 right-0 w-64 h-full hatch-pattern opacity-60 pointer-events-none" />
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start gap-8">
              <div className="shrink-0">
                <img
                  src="https://cdn.poehali.dev/projects/3f3d9455-fca0-4e12-951d-4faa125851e6/bucket/77f2038a-8901-4074-b16b-507c855a5a37.png"
                  alt="БАЗА"
                  className="w-40 md:w-52"
                />
                <p className="font-['Oswald'] text-[10px] tracking-[0.25em] text-[#888] mt-2 uppercase">
                  Центр креативных индустрий
                </p>
              </div>
              <div>
                <h1 className="font-['Oswald'] text-5xl md:text-6xl leading-[0.95] tracking-wide uppercase">
                  <span className="text-[#F5E642]">Мастер‑классы</span><br />
                  <span className="text-white">и события</span><br />
                  <span className="text-[#F5E642]">недели</span>
                </h1>
                <div className="flex flex-wrap gap-3 mt-7">
                  <button onClick={() => go('events')}
                    className="bg-[#F5E642] text-[#2d2f34] font-['Oswald'] text-sm uppercase tracking-widest px-6 py-2.5 hover:bg-[#ffe818] transition-colors">
                    Все мероприятия
                  </button>
                  <button onClick={() => go('booking')}
                    className="border border-[#F5E642] text-[#F5E642] font-['Oswald'] text-sm uppercase tracking-widest px-6 py-2.5 hover:bg-[#F5E642]/10 transition-colors">
                    Записаться
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Бегущая строка */}
          <div className="border-y border-[#3a3c42] py-2.5 overflow-hidden bg-[#292b30] mb-8">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="font-['Oswald'] text-sm tracking-[0.25em] text-[#F5E642]/55 mx-8 uppercase">
                  БАЗА · НИЖНЕКАМСК · МАСТЕР-КЛАССЫ · ВОРКШОПЫ · СТУДИИ · НЕТВОРКИНГ ·
                </span>
              ))}
            </div>
          </div>

          {/* Карточки быстрого доступа */}
          <div className="grid md:grid-cols-3 gap-px bg-[#3a3c42]">
            {[
              { id:'events',    icon:'Calendar', title:'Мероприятия',  desc:'Мастер-классы, выставки, воркшопы' },
              { id:'spaces',    icon:'Building2',title:'Пространства', desc:'Коворкинг, студии, конференц-зал' },
              { id:'residents', icon:'Users',    title:'Резиденты',    desc:'16 творческих команд' },
            ].map(c => (
              <button key={c.id} onClick={() => go(c.id)}
                className="bg-[#2d2f34] p-7 text-left group hover:bg-[#333640] transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-full hatch-pattern opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none" />
                <div className="w-11 h-11 border border-[#3a3c42] flex items-center justify-center mb-5 group-hover:border-[#F5E642] transition-colors">
                  <Icon name={c.icon} size={22} className="text-[#F5E642]" />
                </div>
                <h3 className="font-['Oswald'] text-2xl tracking-wide uppercase mb-1 text-white group-hover:text-[#F5E642] transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-[#888]">{c.desc}</p>
                <p className="font-['Oswald'] text-sm text-[#F5E642] uppercase tracking-widest mt-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Открыть →
                </p>
              </button>
            ))}
          </div>

          {/* Нижняя полоска */}
          <div className="grid sm:grid-cols-2 gap-px bg-[#3a3c42] mt-px">
            <button onClick={() => go('contacts')} className="bg-[#2d2f34] p-5 flex items-center gap-3 hover:bg-[#333640] transition-colors text-left">
              <Icon name="MapPin" size={16} className="text-[#F5E642] shrink-0" />
              <p className="text-sm text-[#ccc]">г. Нижнекамск, ул. Лесная, 53</p>
            </button>
            <a href="tel:+79503171377" className="bg-[#2d2f34] p-5 flex items-center gap-3 hover:bg-[#333640] transition-colors">
              <Icon name="Phone" size={16} className="text-[#F5E642] shrink-0" />
              <p className="text-sm text-[#ccc]">+7 (950) 317‑13‑77</p>
            </a>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen" style={{background:'#2d2f34'}}>

      {/* Навигация */}
      <nav className="border-b border-[#3a3c42] sticky top-0 z-50" style={{background:'#242629'}}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <button onClick={() => go('main')}
              className="font-['Oswald'] text-2xl tracking-widest text-[#F5E642] hover:text-white transition-colors uppercase">
              БАЗА
            </button>
            <div className="hidden md:flex items-center">
              {navItems.slice(1).map((item, i) => (
                <button key={item.id} onClick={() => go(item.id)}
                  className={`px-4 h-14 font-['Oswald'] text-xs uppercase tracking-widest transition-colors
                    ${i < navItems.length - 2 ? 'border-r border-[#3a3c42]' : ''}
                    ${activeSection === item.id
                      ? 'text-[#F5E642] bg-[#F5E642]/8'
                      : 'text-[#888] hover:text-white hover:bg-[#2d2f34]'}`}>
                  {item.label}
                </button>
              ))}
            </div>
            <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(o => !o)}>
              <span className={`w-6 h-0.5 bg-[#ccc] transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-[#ccc] transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-[#ccc] transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-[#3a3c42] divide-y divide-[#3a3c42]" style={{background:'#242629'}}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => go(item.id)}
                className={`w-full text-left px-4 py-3 font-['Oswald'] text-sm uppercase tracking-widest transition-colors
                  ${activeSection === item.id ? 'text-[#F5E642]' : 'text-[#888]'}`}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Контент */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#3a3c42] mt-20" style={{background:'#242629'}}>
        <div className="max-w-5xl mx-auto px-4 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-['Oswald'] text-xl tracking-widest text-[#F5E642] uppercase">БАЗА</span>
          <p className="text-xs text-[#666]">© 2024 МАУ «Центр креативных индустрий «База»</p>
          <a href="https://t.me/nkBaza" target="_blank" rel="noreferrer"
            className="font-['Oswald'] text-xs uppercase tracking-widest text-[#F5E642] hover:underline">
            @NKBAZA →
          </a>
        </div>
      </footer>
    </div>
  );
}

const EVENTS_URL = 'https://functions.poehali.dev/69176b78-d673-4802-b7ae-5739d7147e4c';

interface BookingFormProps {
  spaces: { name: string }[];
  date: Date | undefined;
  setDate: (d: Date | undefined) => void;
}

function BookingForm({ spaces, date, setDate }: BookingFormProps) {
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [space, setSpace]     = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus]   = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const dateStr = date ? date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  const submit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch(`${EVENTS_URL}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, date: dateStr, space, comment }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputCls = "w-full bg-[#242629] border border-[#3a3c42] px-4 py-3 text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#F5E642] transition-colors";

  if (status === 'ok') return (
    <div className="animate-fade-in">
      <PageHeader top="Заявка принята!" sub="Бронирование" />
      <div className="border border-[#3a3c42] p-8 bg-[#292b30] text-center">
        <div className="w-16 h-16 border border-[#F5E642] flex items-center justify-center mx-auto mb-5">
          <Icon name="Check" size={28} className="text-[#F5E642]" />
        </div>
        <p className="font-['Oswald'] text-2xl text-white uppercase tracking-wide mb-2">Спасибо, {name}!</p>
        <p className="text-sm text-[#999]">Мы свяжемся с вами в ближайшее время по номеру <span className="text-white">{phone}</span></p>
        <button onClick={() => setStatus('idle')}
          className="mt-6 border border-[#3a3c42] px-5 py-2 text-[#888] font-['Oswald'] text-xs uppercase tracking-widest hover:border-[#F5E642] hover:text-white transition-colors">
          Отправить ещё
        </button>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in max-w-lg">
      <PageHeader top="Бронирование" sub="Оставьте заявку" />
      <div className="space-y-px">

        {/* Выбор даты */}
        <div className="border border-[#3a3c42] p-5 bg-[#292b30]">
          <p className="font-['Oswald'] text-[10px] text-[#777] uppercase tracking-[0.25em] mb-3">Дата</p>
          <Calendar mode="single" selected={date} onSelect={setDate}
            className="border border-[#3a3c42] rounded-none bg-transparent" />
          {dateStr && <p className="mt-2 text-xs text-[#F5E642] font-['Oswald'] tracking-wide">{dateStr}</p>}
        </div>

        {/* Поля */}
        <div className="border border-[#3a3c42] p-5 bg-[#292b30] space-y-3">
          <div>
            <p className="font-['Oswald'] text-[10px] text-[#777] uppercase tracking-[0.25em] mb-1.5">Ваше имя *</p>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Иван Иванов"
              className={inputCls} />
          </div>
          <div>
            <p className="font-['Oswald'] text-[10px] text-[#777] uppercase tracking-[0.25em] mb-1.5">Телефон *</p>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" type="tel"
              className={inputCls} />
          </div>
          <div>
            <p className="font-['Oswald'] text-[10px] text-[#777] uppercase tracking-[0.25em] mb-1.5">Пространство</p>
            <select value={space} onChange={e => setSpace(e.target.value)}
              className={`${inputCls} appearance-none cursor-pointer`}>
              <option value="">— не выбрано —</option>
              {spaces.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <p className="font-['Oswald'] text-[10px] text-[#777] uppercase tracking-[0.25em] mb-1.5">Комментарий</p>
            <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3}
              placeholder="Расскажите подробнее о вашем запросе..."
              className={`${inputCls} resize-none`} />
          </div>
        </div>

        {/* Кнопка */}
        <button onClick={submit} disabled={status === 'loading' || !name.trim() || !phone.trim()}
          className="w-full bg-[#F5E642] text-[#2d2f34] py-4 font-['Oswald'] text-base uppercase tracking-widest
            hover:bg-[#ffe818] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {status === 'loading' ? (
            <><Icon name="Loader" size={18} className="animate-spin" />Отправляем...</>
          ) : 'Отправить заявку →'}
        </button>

        {status === 'error' && (
          <p className="text-center text-sm text-red-400 pt-2">
            Ошибка отправки. Позвоните нам: <a href="tel:+79503171377" className="underline">+7 (950) 317‑13‑77</a>
          </p>
        )}
      </div>
    </div>
  );
}

const PageHeader = ({ top, sub }: { top: string; sub: string }) => (
  <div className="mb-10 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-48 h-full hatch-pattern opacity-40 pointer-events-none" />
    <p className="font-['Oswald'] text-xs text-[#F5E642] uppercase tracking-[0.3em] mb-1">{sub}</p>
    <h2 className="font-['Oswald'] text-5xl md:text-6xl text-white uppercase leading-none tracking-wide">{top}</h2>
    <div className="w-16 h-1 bg-[#F5E642] mt-4" />
  </div>
);