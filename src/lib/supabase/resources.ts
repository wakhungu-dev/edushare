import { supabase } from './client';
import { Resource } from './types';

export const resourceService = {
  // Get all resources with pagination
  async getResources(page = 1, limit = 12, filters?: {
    category?: string;
    search?: string;
    tags?: string[];
    sortBy?: 'created_at' | 'likes_count' | 'views_count' | 'downloads_count';
    sortOrder?: 'asc' | 'desc';
  }) {
    let query = supabase
      .from('resources')
      .select(`
        *,
        categories(name, icon, color),
        profiles(full_name, avatar_url)
      `)
      .eq('status', 'approved')
      .range((page - 1) * limit, page * limit - 1);

    if (filters?.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters?.tags && filters.tags.length > 0) {
      query = query.contains('tags', filters.tags);
    }

    if (filters?.sortBy) {
      query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error, count } = await query;
    return { data, error, count };
  },

  // Get trending resources
  async getTrendingResources(limit = 8) {
    const { data, error } = await supabase
      .from('resources')
      .select(`
        *,
        categories(name, icon, color),
        profiles(full_name, avatar_url)
      `)
      .eq('status', 'approved')
      .order('views_count', { ascending: false })
      .order('likes_count', { ascending: false })
      .limit(limit);

    return { data, error };
  },

  // Get resource by ID
  async getResourceById(id: string) {
    const { data, error } = await supabase
      .from('resources')
      .select(`
        *,
        categories(name, icon, color),
        profiles(full_name, avatar_url, karma_points)
      `)
      .eq('id', id)
      .single();

    return { data, error };
  },

  // Create new resource
  async createResource(resource: Omit<Resource, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'views_count' | 'downloads_count'>) {
    const { data, error } = await supabase
      .from('resources')
      .insert(resource)
      .select()
      .single();

    return { data, error };
  },

  // Update resource
  async updateResource(id: string, updates: Partial<Resource>) {
    const { data, error } = await supabase
      .from('resources')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Delete resource
  async deleteResource(id: string) {
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id);

    return { error };
  },

  // Increment view count
  async incrementViews(id: string) {
    const { error } = await supabase.rpc('increment_views', { resource_id: id });
    return { error };
  },

  // Toggle like
  async toggleLike(resourceId: string, userId: string) {
    const { data: existingLike } = await supabase
      .from('resource_likes')
      .select('id')
      .eq('resource_id', resourceId)
      .eq('user_id', userId)
      .single();

    if (existingLike) {
      // Unlike
      const { error } = await supabase
        .from('resource_likes')
        .delete()
        .eq('resource_id', resourceId)
        .eq('user_id', userId);
      return { isLiked: false, error };
    } else {
      // Like
      const { error } = await supabase
        .from('resource_likes')
        .insert({ resource_id: resourceId, user_id: userId });
      return { isLiked: true, error };
    }
  }
};