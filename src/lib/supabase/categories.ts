import { supabase } from './client';
import { Category } from './types';

export const categoryService = {
  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    return { data, error };
  },

  // Get categories with resource count
  async getCategoriesWithCount() {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        resources(count)
      `)
      .order('name');

    return { data, error };
  },

  // Get category by ID
  async getCategoryById(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  },

  // Create new category
  async createCategory(category: Omit<Category, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single();

    return { data, error };
  }
};