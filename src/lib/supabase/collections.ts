import { supabase } from './client';
import { Collection } from './types';

export const collectionService = {
  // Get user collections
  async getUserCollections(userId: string) {
    const { data, error } = await supabase
      .from('collections')
      .select(`
        *,
        collection_resources(count)
      `)
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    return { data, error };
  },

  // Get public collections
  async getPublicCollections(limit = 12) {
    const { data, error } = await supabase
      .from('collections')
      .select(`
        *,
        profiles(full_name, avatar_url),
        collection_resources(count)
      `)
      .eq('is_public', true)
      .order('updated_at', { ascending: false })
      .limit(limit);

    return { data, error };
  },

  // Create new collection
  async createCollection(collection: Omit<Collection, 'id' | 'created_at' | 'updated_at' | 'resource_count'>) {
    const { data, error } = await supabase
      .from('collections')
      .insert(collection)
      .select()
      .single();

    return { data, error };
  },

  // Add resource to collection
  async addResourceToCollection(collectionId: string, resourceId: string) {
    const { error } = await supabase
      .from('collection_resources')
      .insert({
        collection_id: collectionId,
        resource_id: resourceId
      });

    return { error };
  },

  // Remove resource from collection
  async removeResourceFromCollection(collectionId: string, resourceId: string) {
    const { error } = await supabase
      .from('collection_resources')
      .delete()
      .eq('collection_id', collectionId)
      .eq('resource_id', resourceId);

    return { error };
  }
};