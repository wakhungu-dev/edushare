import { supabase } from './client';
import { UserStats, PlatformStats } from './types';

export const statsService = {
  // Get platform stats
  async getPlatformStats(): Promise<PlatformStats> {
    const [
      { count: totalResources },
      { count: totalUsers },
      { data: downloadsData },
      { data: viewsData }
    ] = await Promise.all([
      supabase.from('resources').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('resources').select('downloads_count'),
      supabase.from('resources').select('views_count')
    ]);

    const totalDownloads = downloadsData?.reduce((sum, resource) => sum + (resource.downloads_count || 0), 0) || 0;
    const totalViews = viewsData?.reduce((sum, resource) => sum + (resource.views_count || 0), 0) || 0;

    return {
      totalResources: totalResources || 0,
      totalUsers: totalUsers || 0,
      totalDownloads,
      totalViews
    };
  },

  // Get user stats
  async getUserStats(userId: string): Promise<{ data: UserStats | null; error: any }> {
    const [
      { count: totalResources },
      { data: downloadsData },
      { data: userProfile },
      { count: collectionsCount },
      { count: favoritesCount }
    ] = await Promise.all([
      supabase.from('resources').select('*', { count: 'exact', head: true }).eq('author_id', userId),
      supabase.from('resources').select('downloads_count').eq('author_id', userId),
      supabase.from('profiles').select('karma_points').eq('id', userId).single(),
      supabase.from('collections').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('resource_likes').select('*', { count: 'exact', head: true }).eq('user_id', userId)
    ]);

    const totalDownloads = downloadsData?.reduce((sum, resource) => sum + (resource.downloads_count || 0), 0) || 0;

    return {
      data: {
        total_resources: totalResources || 0,
        total_downloads: totalDownloads,
        karma_points: userProfile?.karma_points || 0,
        collections_count: collectionsCount || 0,
        favorites_count: favoritesCount || 0
      },
      error: null
    };
  }
};