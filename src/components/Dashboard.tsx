import { Music, Calendar, Clock, TrendingUp, Disc3, Radio } from 'lucide-react';
import { Track } from '../types';
import { format, differenceInDays, isPast, isFuture, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DashboardProps {
  tracks: Track[];
  onNavigate: (page: 'tracks' | 'add-track' | 'posts') => void;
}

export default function Dashboard({ tracks, onNavigate }: DashboardProps) {
  const today = new Date();
  const upcomingTracks = tracks.filter(t => isFuture(parseISO(t.release_date)));
  const pastTracks = tracks.filter(t => isPast(parseISO(t.release_date)));
  const nextRelease = upcomingTracks.sort((a, b) => 
    parseISO(a.release_date).getTime() - parseISO(b.release_date).getTime()
  )[0];
  
  const daysUntilNext = nextRelease 
    ? differenceInDays(parseISO(nextRelease.release_date), today) 
    : null;

  const anniversaries = tracks.filter(t => {
    const d = parseISO(t.release_date);
    return d.getMonth() === today.getMonth() && 
           d.getDate() === today.getDate() && 
           d.getFullYear() < today.getFullYear();
  });

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 p-6 text-white shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Disc3 className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-sm font-medium text-purple-200">TimurSounds</span>
          </div>
          <h1 className="text-2xl font-bold">ReleaseMate</h1>
          <p className="text-purple-200 text-sm mt-1">Панель управления музыкальным каналом</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <Music className="w-4 h-4" />
            <span className="text-xs font-medium">Всего треков</span>
          </div>
          <p className="text-2xl font-bold text-white">{tracks.length}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium">Скоро</span>
          </div>
          <p className="text-2xl font-bold text-white">{upcomingTracks.length}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Radio className="w-4 h-4" />
            <span className="text-xs font-medium">Выпущено</span>
          </div>
          <p className="text-2xl font-bold text-white">{pastTracks.length}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 text-rose-400 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-medium">Годовщины</span>
          </div>
          <p className="text-2xl font-bold text-white">{anniversaries.length}</p>
        </div>
      </div>

      {/* Next Release */}
      {nextRelease && (
        <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-xl p-5 border border-emerald-700/30">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">Ближайший релиз</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            {nextRelease.artist} — {nextRelease.title}
          </h3>
          {nextRelease.type !== 'single' && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">
              {nextRelease.type}
            </span>
          )}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {format(parseISO(nextRelease.release_date), 'd MMMM yyyy', { locale: ru })}
            </span>
            {daysUntilNext !== null && (
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm font-semibold rounded-full">
                через {daysUntilNext} {daysUntilNext === 1 ? 'день' : daysUntilNext < 5 ? 'дня' : 'дней'}
              </span>
            )}
          </div>
          {nextRelease.label && (
            <p className="text-xs text-gray-400 mt-2">🎧 {nextRelease.label}</p>
          )}
          {nextRelease.link && (
            <a href={nextRelease.link} className="text-xs text-purple-400 hover:text-purple-300 mt-1 block">
              🔗 {nextRelease.link}
            </a>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Быстрые действия</h2>
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => onNavigate('add-track')}
            className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-purple-500/50 hover:bg-purple-900/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Music className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs text-gray-300 text-center">Добавить трек</span>
          </button>
          <button 
            onClick={() => onNavigate('tracks')}
            className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-emerald-500/50 hover:bg-emerald-900/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Disc3 className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs text-gray-300 text-center">Все треки</span>
          </button>
          <button 
            onClick={() => onNavigate('posts')}
            className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-amber-500/50 hover:bg-amber-900/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Radio className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xs text-gray-300 text-center">Посты</span>
          </button>
        </div>
      </div>

      {/* Recent Tracks */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Последние треки</h2>
        <div className="space-y-2">
          {tracks.slice(0, 4).map(track => (
            <div key={track.id} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isFuture(parseISO(track.release_date)) 
                  ? 'bg-purple-500/20' 
                  : 'bg-gray-700/50'
              }`}>
                <Music className={`w-4 h-4 ${
                  isFuture(parseISO(track.release_date)) ? 'text-purple-400' : 'text-gray-500'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {track.artist} — {track.title}
                </p>
                <p className="text-xs text-gray-500">
                  {format(parseISO(track.release_date), 'd MMM yyyy', { locale: ru })}
                  {track.type !== 'single' && ` • ${track.type}`}
                </p>
              </div>
              {isFuture(parseISO(track.release_date)) && (
                <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">
                  {differenceInDays(parseISO(track.release_date), today)}д
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
