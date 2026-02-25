import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/69176b78-d673-4802-b7ae-5739d7147e4c';

interface Event {
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
  sort_order: number;
}

const EMPTY_EVENT: Omit<Event, 'id'> = {
  title: '',
  date_text: '',
  time_text: '',
  category: '',
  description: '',
  image: '',
  location: 'Лесная, 53',
  price: 'Бесплатно',
  status: 'upcoming',
  contact: '+79503171377',
  sort_order: 0,
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [tokenInput, setTokenInput] = useState('');
  const [authed, setAuthed] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>(EMPTY_EVENT);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchEvents = async (t: string) => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { headers: { 'X-Admin-Token': t } });
      const data = await res.json();
      setEvents(data);
      setAuthed(true);
      localStorage.setItem('admin_token', t);
    } catch {
      toast({ title: 'Ошибка загрузки', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchEvents(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount

  const handleLogin = () => {
    setToken(tokenInput);
    fetchEvents(tokenInput);
  };

  const handleCreate = async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
      body: JSON.stringify(newEvent),
    });
    if (res.status === 201) {
      toast({ title: 'Мероприятие добавлено' });
      setNewEvent(EMPTY_EVENT);
      setDialogOpen(false);
      fetchEvents(token);
    } else {
      toast({ title: 'Ошибка', variant: 'destructive' });
    }
  };

  const handleUpdate = async () => {
    if (!editEvent) return;
    const res = await fetch(`${API_URL}/events/${editEvent.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
      body: JSON.stringify(editEvent),
    });
    if (res.ok) {
      toast({ title: 'Сохранено' });
      setEditDialogOpen(false);
      fetchEvents(token);
    } else {
      toast({ title: 'Ошибка', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить мероприятие?')) return;
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Token': token },
    });
    if (res.ok) {
      toast({ title: 'Удалено' });
      fetchEvents(token);
    } else {
      toast({ title: 'Ошибка', variant: 'destructive' });
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm border-accent/20">
          <CardHeader>
            <CardTitle className="text-center">Вход в админку</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Введите пароль"
              value={tokenInput}
              onChange={e => setTokenInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
            <Button className="w-full" onClick={handleLogin} disabled={loading}>
              {loading ? 'Загрузка...' : 'Войти'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-accent">Управление мероприятиями</h1>
            <p className="text-muted-foreground mt-1">БАЗА — Центр креативных индустрий</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
              <Icon name="ArrowLeft" size={16} className="mr-1" /> На сайт
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Icon name="Plus" size={16} className="mr-1" /> Добавить
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Новое мероприятие</DialogTitle>
                </DialogHeader>
                <EventForm data={newEvent} onChange={setNewEvent} onSave={handleCreate} saveLabel="Добавить" />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Загрузка...</div>
        ) : (
          <div className="space-y-3">
            {events.map(ev => (
              <Card key={ev.id} className="border-accent/20">
                <CardContent className="p-4">
                  <div className="flex gap-4 items-start">
                    {ev.image && (
                      <img src={ev.image} alt={ev.title} className="w-20 h-16 object-cover rounded flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold">{ev.title}</div>
                          <div className="text-sm text-muted-foreground mt-0.5">
                            {ev.date_text}{ev.time_text ? ` • ${ev.time_text}` : ''} • {ev.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge variant={ev.status === 'upcoming' ? 'default' : 'secondary'}>
                            {ev.status === 'upcoming' ? 'Предстоит' : 'Прошло'}
                          </Badge>
                          <Badge variant="outline">{ev.price}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Dialog open={editDialogOpen && editEvent?.id === ev.id} onOpenChange={open => { setEditDialogOpen(open); if (open) setEditEvent(ev); }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditEvent({ ...ev })}>
                            <Icon name="Pencil" size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Редактировать</DialogTitle>
                          </DialogHeader>
                          {editEvent && (
                            <EventForm data={editEvent} onChange={(d: Event) => setEditEvent(d)} onSave={handleUpdate} saveLabel="Сохранить" />
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(ev.id)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {events.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">Мероприятий пока нет</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type EventFormData = Omit<Event, 'id'> | Event;

function EventForm({ data, onChange, onSave, saveLabel }: {
  data: EventFormData;
  onChange: (d: EventFormData) => void;
  onSave: () => void;
  saveLabel: string;
}) {
  const set = (field: string, value: string | number) => onChange({ ...data, [field]: value });

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium mb-1 block">Название *</label>
        <Input value={data.title} onChange={e => set('title', e.target.value)} placeholder="Мастер-класс по керамике" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium mb-1 block">Дата</label>
          <Input value={data.date_text} onChange={e => set('date_text', e.target.value)} placeholder="15 марта" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Время</label>
          <Input value={data.time_text} onChange={e => set('time_text', e.target.value)} placeholder="18:00" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium mb-1 block">Категория</label>
          <Input value={data.category} onChange={e => set('category', e.target.value)} placeholder="Творчество" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Цена</label>
          <Input value={data.price} onChange={e => set('price', e.target.value)} placeholder="Бесплатно" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Место</label>
        <Input value={data.location} onChange={e => set('location', e.target.value)} placeholder="Лесная, 53" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Контакт для записи</label>
        <Input value={data.contact} onChange={e => set('contact', e.target.value)} placeholder="+79503171377" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Описание</label>
        <Textarea value={data.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Краткое описание мероприятия" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Ссылка на фото</label>
        <Input value={data.image} onChange={e => set('image', e.target.value)} placeholder="https://..." />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Статус</label>
        <Select value={data.status} onValueChange={v => set('status', v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Предстоит</SelectItem>
            <SelectItem value="past">Прошло</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Порядок (чем меньше — тем выше)</label>
        <Input type="number" value={data.sort_order} onChange={e => set('sort_order', Number(e.target.value))} />
      </div>
      <Button className="w-full" onClick={onSave}>{saveLabel}</Button>
    </div>
  );
}