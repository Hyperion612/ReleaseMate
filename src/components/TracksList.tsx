import { Music, Trash2, ExternalLink, Calendar, Filter } from 'lucide-react';
import { Track } from '../types';
import { format, parseISO, isFuture, isPast } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';

interface TracksListProps {
  tracks: Track[];
  onDelete: (id: number) => void;
  onAdd: () => void;
}

type FilterType = 'all' | 'upcoming' | 'past';

export default function TracksList({ tracks, onDelete, onAdd }: TracksListProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const filteredTracks = tracks.filter(t => {
    if (filter === 'upcoming') return isFuture(parseISO(t.release_date));
    if (filter === 'past') return isPast(parseISO(t.release_date));
    return true;
  });

  const sortedTracks = [...filteredTracks].sort((a, b) => 
    parseISO(b.release_date).getTime() - parseISO(a.release_date).getTime()
  );

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Треки</h1>
          <p className="text-sm text-gray-400">{tracks.length} треков в базе</p>
        </div>
        <button 
          onClick={onAdd}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          + Добавить
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        {(['all', 'upcoming', 'past'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === f 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {f === 'all' ? 'Все' : f === 'upcoming' ? 'Скоро' : 'Прошедшие'}
          </button>
        ))}
      </div>

      {/* Track List */}
      <div className="space-y-2">
        {sortedTracks.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">Нет треков</p>
          </div>
        ) : (
          sortedTracks.map(track => (
            <div key={track.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500 font-mono">#{track.id}</span>
                    {track.type !== 'single' && (
                      <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded">
                        {track.type}
                      </span>
                    )}
                    {isFuture(parseISO(track.release_date)) && (
                      <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded">
                        Скоро
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold">
                    {track.artist} — {track.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {format(parseISO(track.release_date), 'd MMM yyyy', { locale: ru })}
                    </span>
                    {track.label && (
                      <span className="text-xs text-gray-400">🎧 {track.label}</span>
                    )}
                  </div>
                  {track.link && (
                    <a 
                      href={track.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Ссылка
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setConfirmDelete(track.id)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Delete confirmation */}
              {confirmDelete === track.id && (
                <div className="mt-3 pt-3 border-t border-gray-700/50 flex items-center justify-between">
                  <span className="text-xs text-red-400">Удалить трек?</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded-lg"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={() => { onDelete(track.id); setConfirmDelete(null); }}
                      className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
