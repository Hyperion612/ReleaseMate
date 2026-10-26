import { Track, Post } from './types';

export const mockTracks: Track[] = [
  {
    id: 1,
    artist: 'Timur',
    title: './Hack',
    type: 'EP',
    release_date: '2026-07-09',
    label: 'TimurSounds',
    link: 'https://band.link/hackworld'
  },
  {
    id: 2,
    artist: 'Timur',
    title: 'Neon Dreams',
    type: 'single',
    release_date: '2026-08-15',
    label: 'TimurSounds',
    link: 'https://band.link/neondreams'
  },
  {
    id: 3,
    artist: 'Timur',
    title: 'Midnight Protocol',
    type: 'Album',
    release_date: '2026-09-01',
    label: 'TimurSounds',
    link: null
  },
  {
    id: 4,
    artist: 'Timur',
    title: 'Digital Sunrise',
    type: 'single',
    release_date: '2026-06-20',
    label: null,
    link: 'https://band.link/digitalrise'
  },
  {
    id: 5,
    artist: 'Timur',
    title: 'Echoes',
    type: 'single',
    release_date: '2025-10-26',
    label: 'TimurSounds',
    link: 'https://band.link/echoes'
  }
];

export const mockPosts: Post[] = [
  {
    id: 1,
    text: '🎵 Новый релиз уже скоро! Готовьтесь к чему-то особенному.',
    created_at: '2026-10-25T14:30:00',
    status: 'published'
  },
  {
    id: 2,
    text: '🔥 Скоро новый EP! Следите за обновлениями.',
    created_at: '2026-10-24T10:15:00',
    status: 'published'
  },
  {
    id: 3,
    text: '📢 Анонс: альбом в разработке...',
    created_at: '2026-10-26T09:00:00',
    status: 'draft'
  }
];

export const defaultTemplate = `📅 *{{ today }}* | {{ now }}

{{ text }}

{% if next_track %}
──────────────
🚀 *Ближайший релиз:*
🎵 {{ next_track.artist }} - {{ next_track.title }}{% if next_track.type %} ({{ next_track.type }}){% endif %}
🗓 {{ next_track.release_date }}{% if next_track.label %}
🎧 {{ next_track.label }}{% endif %}{% if next_track.link %}
🔗 {{ next_track.link }}{% endif %}
⏳ Через {{ days_left }} дн.
{% endif %}
{% if anniversaries %}
──────────────
🎂 *Сегодня годовщины:*
{% for tr, years in anniversaries %}
• {{ tr.artist }} - {{ tr.title }}{% if tr.type %} ({{ tr.type }}){% endif %} — {{ years }} {{ 'год' if years==1 else 'года' if years<5 else 'лет' }}
{% endfor %}
{% endif %}`;

export const templateVariables = [
  { name: '{{ today }}', description: 'Сегодняшняя дата' },
  { name: '{{ now }}', description: 'Текущее время' },
  { name: '{{ text }}', description: 'Твой текст новости' },
  { name: '{{ next_track.artist }}', description: 'Артист ближайшего релиза' },
  { name: '{{ next_track.title }}', description: 'Название трека' },
  { name: '{{ next_track.type }}', description: 'Тип (EP/Single/Album)' },
  { name: '{{ next_track.release_date }}', description: 'Дата релиза' },
  { name: '{{ next_track.label }}', description: 'Лейбл' },
  { name: '{{ next_track.link }}', description: 'Ссылка' },
  { name: '{{ days_left }}', description: 'Дней до релиза' },
  { name: '{{ anniversaries }}', description: 'Список годовщин' },
];
