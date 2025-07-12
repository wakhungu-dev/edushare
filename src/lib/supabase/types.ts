export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  karma_points: number;
  user_type: 'teen' | 'university';
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  content_url: string;
  thumbnail_url?: string;
  category_id: string;
  author_id: string;
  tags: string[];
  likes_count: number;
  views_count: number;
  downloads_count: number;
  is_featured: boolean;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  parent_id?: string;
  created_at: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  user_id: string;
  is_public: boolean;
  resource_count: number;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  total_resources: number;
  total_downloads: number;
  karma_points: number;
  collections_count: number;
  favorites_count: number;
}