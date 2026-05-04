-- Base Schema for Vattam Hyperlocal Platform

-- 1. Waitlist Table
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial categories
INSERT INTO categories (name, icon, description) VALUES
('Plumber', 'Wrench', 'Leaking pipes or new installations'),
('Electrician', 'Zap', 'Wiring, repairs, and installations'),
('AC Repair', 'AirVent', 'Cooling solutions for your home'),
('Cleaning', 'Sparkles', 'Deep clean for a fresh space'),
('Sadhya Cook', 'UtensilsCrossed', 'Authentic Kerala feasts at home');

-- 3. Providers Table
CREATE TABLE providers (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  bio TEXT,
  location_lat FLOAT,
  location_lng FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Provider Services (Mapping providers to categories)
CREATE TABLE provider_services (
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, category_id)
);

-- 5. Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES auth.users(id),
  category_id UUID REFERENCES categories(id),
  provider_id UUID REFERENCES providers(id),
  status TEXT DEFAULT 'pending', -- pending, assigned, completed, cancelled
  scheduled_at TIMESTAMP WITH TIME ZONE,
  problem_description TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) Policies
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can join waitlist" ON waitlist FOR INSERT WITH CHECK (true);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);

-- Add more policies as needed for Phase 1
