/*
  # Seed Initial Data for EduShare Hub

  1. Categories
    - Programming & Computer Science
    - Mathematics & Statistics
    - Science & Engineering
    - Design & Arts
    - Business & Economics
    - Languages & Literature
    - Psychology & Social Sciences

  2. Sample Tags
    - Common educational tags

  3. Sample Data
    - Demo resources for testing
*/

-- Insert categories
INSERT INTO categories (id, name, description, icon, color, sort_order) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Programming', 'Software development, coding, and computer science', 'computer', '#3B82F6', 1),
  ('550e8400-e29b-41d4-a716-446655440002', 'Mathematics', 'Math, statistics, and quantitative analysis', 'school', '#10B981', 2),
  ('550e8400-e29b-41d4-a716-446655440003', 'Science', 'Physics, chemistry, biology, and natural sciences', 'science', '#8B5CF6', 3),
  ('550e8400-e29b-41d4-a716-446655440004', 'Design', 'UI/UX, graphic design, and creative arts', 'palette', '#F59E0B', 4),
  ('550e8400-e29b-41d4-a716-446655440005', 'Business', 'Economics, management, and entrepreneurship', 'business', '#EF4444', 5),
  ('550e8400-e29b-41d4-a716-446655440006', 'Languages', 'Literature, linguistics, and foreign languages', 'language', '#06B6D4', 6),
  ('550e8400-e29b-41d4-a716-446655440007', 'Psychology', 'Psychology, sociology, and behavioral sciences', 'psychology', '#EC4899', 7),
  ('550e8400-e29b-41d4-a716-446655440008', 'Engineering', 'Mechanical, electrical, and civil engineering', 'engineering', '#84CC16', 8)
ON CONFLICT (id) DO NOTHING;

-- Insert subcategories
INSERT INTO categories (name, description, icon, color, parent_id, sort_order) VALUES
  ('Web Development', 'HTML, CSS, JavaScript, React, Vue, Angular', 'computer', '#3B82F6', '550e8400-e29b-41d4-a716-446655440001', 1),
  ('Data Science', 'Python, R, machine learning, data analysis', 'computer', '#3B82F6', '550e8400-e29b-41d4-a716-446655440001', 2),
  ('Mobile Development', 'iOS, Android, React Native, Flutter', 'computer', '#3B82F6', '550e8400-e29b-41d4-a716-446655440001', 3),
  ('Calculus', 'Differential and integral calculus', 'school', '#10B981', '550e8400-e29b-41d4-a716-446655440002', 1),
  ('Statistics', 'Probability, statistical analysis, hypothesis testing', 'school', '#10B981', '550e8400-e29b-41d4-a716-446655440002', 2),
  ('Physics', 'Classical mechanics, quantum physics, thermodynamics', 'science', '#8B5CF6', '550e8400-e29b-41d4-a716-446655440003', 1),
  ('Chemistry', 'Organic, inorganic, and physical chemistry', 'science', '#8B5CF6', '550e8400-e29b-41d4-a716-446655440003', 2),
  ('UI Design', 'User interface design principles and tools', 'palette', '#F59E0B', '550e8400-e29b-41d4-a716-446655440004', 1),
  ('UX Research', 'User experience research and testing', 'palette', '#F59E0B', '550e8400-e29b-41d4-a716-446655440004', 2)
ON CONFLICT (name) DO NOTHING;

-- Insert common tags
INSERT INTO tags (name, usage_count) VALUES
  ('beginner', 0),
  ('intermediate', 0),
  ('advanced', 0),
  ('tutorial', 0),
  ('guide', 0),
  ('reference', 0),
  ('examples', 0),
  ('practice', 0),
  ('theory', 0),
  ('practical', 0),
  ('study-notes', 0),
  ('cheat-sheet', 0),
  ('textbook', 0),
  ('video', 0),
  ('pdf', 0),
  ('interactive', 0),
  ('free', 0),
  ('premium', 0),
  ('university', 0),
  ('high-school', 0)
ON CONFLICT (name) DO NOTHING;