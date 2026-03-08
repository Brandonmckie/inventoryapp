-- Create the 'products' table (or alter if exists)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  brand TEXT,
  "modelNumber" TEXT,
  color TEXT,
  size TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  "costPrice" NUMERIC NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  threshold INTEGER NOT NULL DEFAULT 5,
  "imageUrl" TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'activities' table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL,
  item TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  user_id UUID REFERENCES auth.users(id), -- Nullable initially if tracking system-wide activity
  note TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- If you ran the old permissive script, drop those old policies first to avoid conflicts:
DROP POLICY IF EXISTS "Allow authenticated full access to products" ON products;
DROP POLICY IF EXISTS "Allow authenticated full access to activities" ON activities;

-- Add the user_id column if the table was already created before we added it:
ALTER TABLE products ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Create policies (Multi-tenant setup: Users can only see their own rows)
CREATE POLICY "Allow users to read and write own products" 
ON products FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Allow users to read and write own activities" 
ON activities FOR ALL TO authenticated USING (auth.uid() = user_id);
