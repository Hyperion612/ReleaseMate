import { useState } from 'react';
import { Send, FileText, Check, Clock, Eye } from 'lucide-react';
import { Post, Track } from '../types';
import { format, parseISO, differenceInDays, isFuture } from 'date-fns';
import { ru } from 'date-fns/locale';

interface PostsProps {
  posts: Post[];
  tracks: Track[];
  onPublish: (text: string) => void;
}

export default function Posts({ posts, tracks, onPublish }: PostsProps) {
  const [text, setText] = useState('');
  const [preview, setPreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [published, setPublished] = useState(false);

  const today = new Date();
  const nextTrack = tracks
    .filter(t => isFuture(parseISO(t.release_date)))
    .sort((a, b) => parseISO(a.release_date).getTime() - parseISO(b.release_date).getTime())[0];

  const daysLeft = nextTrack ? differenceInDays(parseISO(nextTrack.release_date), today) : null;

  const generatePreview = () => {
    let result = `📅 ${format(today, 'dd.MM.yyyy')} | ${format(today, 'HH:mm')}\n\n`;
    result += text + '\n\n';
    
    if (nextTrack) {
      result += '──────────────\n';
      result += `🚀 *Ближайший релиз:*\n`;
      result += `🎵 ${nextTrack.artist} - ${nextTrack.title}`;
      if (nextTrack.type !== 'single') result += ` (${nextTrack.type})`;
      result += `\n🗓 ${nextTrack.release_date}`;
      if (nextTrack.label) result += `\n🎧 ${nextTrack.label}`;
      if (nextTrack.link) result += `\n🔗 ${nextTrack.link}`;
      result += `\n⏳ Через ${daysLeft} дн.\n`;
    }

    const anniversaries = tracks.filter(t => {
      const d = parseISO(t.release_date);
      return d.getMonth() === today.getMonth() && 
             d.getDate() === today.getDate() && 
             d.getFullYear() < today.getFullYear();
    });

    if (anniversaries.length > 0) {
      result += '──────────────\n';
      result += '🎂 *Сегодня годовщины:*\n';
      anniversaries.forEach(t => {
        const years = today.getFullYear() - parseISO(t.release_date).getFullYear();
        result += `• ${t.artist} - ${t.title}`;
        if (t.type !== 'single') result += ` (${t.type})`;
        result += ` — ${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}\n`;
      });
    }

    setPreview(result);
    setShowPreview(true);
  };

  const handlePublish = () => {
    onPublish(text);
    setPublished(true);
    setText('');
    setShowPreview(false);
    setTimeout(() => setPublished(false), 3000);
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Посты</h1>
        <p className="text-sm text-gray-400">Создание и публикация в канал</p>
      </div>

      {published && (
        <div className="flex items-center gap-2 p-4 bg-emerald-900/30 border border-emerald-700/30 rounded-xl">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-300 text-sm font-medium">Опубликовано в канал!</span>
        </div>
      )}

      {/* Post Creator */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-white">Новый пост</span>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Текст новости или анонса..."
          rows={4}
          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none"
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={generatePreview}
            disabled={!text}
            className="flex-1 py-2.5 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Превью
          </button>
          <button
            onClick={handlePublish}
            disabled={!text}
            className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-800 disabled:text-gray-600 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Опубликовать
          </button>
        </div>
      </div>

      {/* Preview */}
      {showPreview && preview && (
        <div className="bg-gray-800/50 rounded-xl p-4 border border-purple-700/30">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Превью поста</span>
          </div>
          <pre className="text-sm text-gray-200 whitespace-pre-wrap font-sans bg-gray-900/50 p-3 rounded-lg">
            {preview}
          </pre>
          <button
            onClick={() => setShowPreview(false)}
            className="mt-3 text-xs text-gray-500 hover:text-gray-300"
          >
            Закрыть превью
          </button>
        </div>
      )}

      {/* Post History */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">История постов</h2>
        <div className="space-y-2">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/30">
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${
                  post.status === 'published' 
                    ? 'bg-emerald-500/20 text-emerald-300' 
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {post.status === 'published' ? (
                    <><Check className="w-3 h-3" /> Опубликовано</>
                  ) : (
                    <><Clock className="w-3 h-3" /> Черновик</>
                  )}
                </span>
                <span className="text-xs text-gray-500">
                  {format(parseISO(post.created_at), 'd MMM, HH:mm', { locale: ru })}
                </span>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">{post.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
