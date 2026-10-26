import { useState, useEffect } from 'react';
import { LayoutDashboard, Music, Plus, Radio, Code, Rocket, Container } from 'lucide-react';
import { Page, Track, Post } from './types';
import { mockTracks, mockPosts, defaultTemplate } from './data';
import Dashboard from './components/Dashboard';
import TracksList from './components/TracksList';
import AddTrack from './components/AddTrack';
import Posts from './components/Posts';
import TemplateEditor from './components/TemplateEditor';
import DeployGuide from './components/DeployGuide';
import DockerDeploy from './components/DockerDeploy';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          button_color: string;
          button_text_color: string;
        };
        initDataUnsafe?: {
          user?: {
            first_name: string;
            last_name?: string;
            username?: string;
          };
        };
      };
    };
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [tracks, setTracks] = useState<Track[]>(mockTracks);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [template, setTemplate] = useState(defaultTemplate);

  useEffect(() => {
    // Initialize Telegram Web App
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#0f0f14');
      tg.setBackgroundColor('#0f0f14');
    }
  }, []);

  const handleAddTrack = (track: Omit<Track, 'id'>) => {
    const newTrack: Track = {
      ...track,
      id: tracks.length > 0 ? Math.max(...tracks.map(t => t.id)) + 1 : 1
    };
    setTracks(prev => [...prev, newTrack]);
  };

  const handleDeleteTrack = (id: number) => {
    setTracks(prev => prev.filter(t => t.id !== id));
  };

  const handlePublishPost = (text: string) => {
    const newPost: Post = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      text,
      created_at: new Date().toISOString(),
      status: 'published'
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const handleSaveTemplate = (newTemplate: string) => {
    setTemplate(newTemplate);
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const navItems = [
    { id: 'dashboard' as Page, icon: LayoutDashboard, label: 'Главная' },
    { id: 'tracks' as Page, icon: Music, label: 'Треки' },
    { id: 'add-track' as Page, icon: Plus, label: 'Добавить' },
    { id: 'posts' as Page, icon: Radio, label: 'Посты' },
    { id: 'docker' as Page, icon: Container, label: 'Docker' },
    { id: 'deploy' as Page, icon: Rocket, label: 'Хостинг' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      {/* Main Content */}
      <main className="px-4 pt-4 pb-24 max-w-lg mx-auto">
        {currentPage === 'dashboard' && (
          <Dashboard tracks={tracks} onNavigate={navigateTo} />
        )}
        {currentPage === 'tracks' && (
          <TracksList 
            tracks={tracks} 
            onDelete={handleDeleteTrack}
            onAdd={() => navigateTo('add-track')}
          />
        )}
        {currentPage === 'add-track' && (
          <AddTrack 
            onBack={() => navigateTo('tracks')}
            onAdd={handleAddTrack}
          />
        )}
        {currentPage === 'posts' && (
          <Posts 
            posts={posts} 
            tracks={tracks}
            onPublish={handlePublishPost}
          />
        )}
        {currentPage === 'template' && (
          <TemplateEditor 
            template={template}
            onSave={handleSaveTemplate}
          />
        )}
        {currentPage === 'deploy' && (
          <DeployGuide />
        )}
        {currentPage === 'docker' && (
          <DockerDeploy />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0f0f14]/95 backdrop-blur-lg border-t border-gray-800/50 z-50">
        <div className="max-w-lg mx-auto px-2 py-2 flex items-center justify-around">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'text-purple-400' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-0 w-8 h-0.5 bg-purple-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default App;
