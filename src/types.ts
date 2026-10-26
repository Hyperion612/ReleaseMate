export interface Track {
  id: number;
  artist: string;
  title: string;
  type: 'single' | 'EP' | 'Album' | 'LP';
  release_date: string;
  label: string | null;
  link: string | null;
}

export interface Post {
  id: number;
  text: string;
  created_at: string;
  status: 'draft' | 'published';
}

export interface Template {
  content: string;
  variables: string[];
}

export type Page = 'dashboard' | 'tracks' | 'add-track' | 'posts' | 'template' | 'deploy';
