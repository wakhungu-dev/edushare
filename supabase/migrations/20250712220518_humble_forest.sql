/*
  # Initial EduShare Hub Database Schema

  1. New Tables
    - `profiles` - User profiles with karma system
    - `categories` - Resource categories with hierarchical structure
    - `resources` - Learning resources with metadata
    - `collections` - User-created resource collections
    - `collection_resources` - Many-to-many relationship for collections
    - `resource_likes` - User likes for resources
    - `resource_views` - Track resource views
    - `comments` - Resource comments and discussions
    - `tags` - Resource tagging system

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure user data access

  3. Functions
    - Auto-update karma points
    - Increment view counters
    - Search functionality
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  karma_points integer DEFAULT 0,
  user_type text CHECK (user_type IN ('teen', 'university')) DEFAULT 'university',
  bio text,
  location text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  icon text DEFAULT 'folder',
  color text DEFAULT '#3B82F6',
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content_url text NOT NULL,
  thumbnail_url text,
  file_size bigint,
  file_type text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  tags text[] DEFAULT '{}',
  likes_count integer DEFAULT 0,
  views_count integer DEFAULT 0,
  downloads_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  status text CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create collections table
CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  is_public boolean DEFAULT false,
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create collection_resources junction table
CREATE TABLE IF NOT EXISTS collection_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid REFERENCES collections(id) ON DELETE CASCADE,
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE,
  added_at timestamptz DEFAULT now(),
  UNIQUE(collection_id, resource_id)
);

-- Create resource_likes table
CREATE TABLE IF NOT EXISTS resource_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(resource_id, user_id)
);

-- Create resource_views table
CREATE TABLE IF NOT EXISTS resource_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  ip_address inet,
  user_agent text,
  viewed_at timestamptz DEFAULT now()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES resources(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_edited boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Categories policies (public read)
CREATE POLICY "Anyone can read categories"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- Resources policies
CREATE POLICY "Anyone can read approved resources"
  ON resources FOR SELECT
  TO authenticated
  USING (status = 'approved');

CREATE POLICY "Users can read own resources"
  ON resources FOR SELECT
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Users can insert own resources"
  ON resources FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own resources"
  ON resources FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own resources"
  ON resources FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Collections policies
CREATE POLICY "Users can read public collections"
  ON collections FOR SELECT
  TO authenticated
  USING (is_public = true);

CREATE POLICY "Users can read own collections"
  ON collections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own collections"
  ON collections FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Collection resources policies
CREATE POLICY "Users can read collection resources for accessible collections"
  ON collection_resources FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM collections 
      WHERE collections.id = collection_resources.collection_id 
      AND (collections.is_public = true OR collections.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage own collection resources"
  ON collection_resources FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM collections 
      WHERE collections.id = collection_resources.collection_id 
      AND collections.user_id = auth.uid()
    )
  );

-- Resource likes policies
CREATE POLICY "Users can read all likes"
  ON resource_likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own likes"
  ON resource_likes FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Resource views policies
CREATE POLICY "Users can read all views"
  ON resource_views FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert views"
  ON resource_views FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Comments policies
CREATE POLICY "Users can read all comments"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Tags policies
CREATE POLICY "Anyone can read tags"
  ON tags FOR SELECT
  TO authenticated
  USING (true);

-- Functions
CREATE OR REPLACE FUNCTION increment_views(resource_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE resources 
  SET views_count = views_count + 1,
      updated_at = now()
  WHERE id = resource_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_likes_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE resources 
    SET likes_count = likes_count + 1,
        updated_at = now()
    WHERE id = NEW.resource_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE resources 
    SET likes_count = likes_count - 1,
        updated_at = now()
    WHERE id = OLD.resource_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_karma_points()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Add karma for new resource
    UPDATE profiles 
    SET karma_points = karma_points + 10
    WHERE id = NEW.author_id;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
    -- Add karma when resource is approved
    IF NEW.status = 'approved' THEN
      UPDATE profiles 
      SET karma_points = karma_points + 25
      WHERE id = NEW.author_id;
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
CREATE TRIGGER update_likes_count_trigger
  AFTER INSERT OR DELETE ON resource_likes
  FOR EACH ROW EXECUTE FUNCTION update_likes_count();

CREATE TRIGGER update_karma_points_trigger
  AFTER INSERT OR UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_karma_points();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category_id);
CREATE INDEX IF NOT EXISTS idx_resources_author ON resources(author_id);
CREATE INDEX IF NOT EXISTS idx_resources_status ON resources(status);
CREATE INDEX IF NOT EXISTS idx_resources_created_at ON resources(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resources_likes_count ON resources(likes_count DESC);
CREATE INDEX IF NOT EXISTS idx_resources_views_count ON resources(views_count DESC);
CREATE INDEX IF NOT EXISTS idx_resources_tags ON resources USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_collection_resources_collection ON collection_resources(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_resources_resource ON collection_resources(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_likes_resource ON resource_likes(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_likes_user ON resource_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_resource ON comments(resource_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id);