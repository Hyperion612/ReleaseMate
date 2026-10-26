import { useState } from 'react';
import { ArrowLeft, Music, Check } from 'lucide-react';
import { Track } from '../types';

interface AddTrackProps {
  onBack: () => void;
  onAdd: (track: Omit<Track, 'id'>) => void;
}

export default function AddTrack({ onBack, onAdd }: AddTrackProps) {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'single' | 'EP' | 'Album' | 'LP'>('single');
  const [releaseDate, setReleaseDate] = useState('');
  const [label, setLabel] = useState('');
  const [link, setLink] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artist || !title || !releaseDate) return;
    
    onAdd({
      artist,
      title,
      type,
      release_date: releaseDate,
      label: label || null,
      link: link || null
    });
    
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setArtist('');
      setTitle('');
      setType('single');
      setReleaseDate('');
      setLabel('');
      setLink('');
    }, 2000);
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-800 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Добавить трек</h1>
          <p className="text-sm text-gray-400">Новый релиз в базу</p>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-2 p-4 bg-emerald-900/30 border border-emerald-700/30 rounded-xl">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-300 text-sm font-medium">Трек успешно добавлен!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Artist */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Артист *</label>
          <input
            type="text"
            value={artist}
            onChange={e => setArtist(e.target.value)}
            placeholder="Timur"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
            required
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Название *</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="./Hack"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Тип релиза</label>
          <div className="grid grid-cols-4 gap-2">
            {(['single', 'EP', 'Album', 'LP'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`py-2 text-sm font-medium rounded-xl transition-all ${
                  type === t
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-purple-500/30'
                }`}
              >
                {t === 'single' ? 'Single' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Release Date */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Дата релиза *</label>
          <input
            type="date"
            value={releaseDate}
            onChange={e => setReleaseDate(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
            required
          />
        </div>

        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Лейбл <span className="text-gray-500">(опционально)</span></label>
          <input
            type="text"
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder="TimurSounds"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Ссылка <span className="text-gray-500">(опционально)</span></label>
          <input
            type="url"
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder="https://band.link/..."
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!artist || !title || !releaseDate}
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Music className="w-4 h-4" />
          Добавить трек
        </button>
      </form>

      {/* Bot Command Format */}
      <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
        <p className="text-xs text-gray-400 mb-2 font-medium">💡 Эквивалентная команда бота:</p>
        <code className="text-xs text-purple-300 bg-gray-900/50 p-2 rounded-lg block overflow-x-auto">
          /addtrack {artist || 'Артист'} - {title || 'Название'} ({type}) | {releaseDate || 'ГГГГ-ММ-ДД'}{label ? ` | ${label}` : ''}{link ? ` | ${link}` : ''}
        </code>
      </div>
    </div>
  );
}
