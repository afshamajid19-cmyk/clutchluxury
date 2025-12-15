-- Create settings table for site configuration
CREATE TABLE public.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Create items table for luxury products
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  brand TEXT NOT NULL,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  availability_status TEXT NOT NULL DEFAULT 'available',
  price_hint TEXT,
  hero_image_url TEXT,
  gallery_urls TEXT[],
  enquiry_enabled BOOLEAN DEFAULT true
);

-- Create requests table for client inquiries
CREATE TABLE public.requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  location TEXT NOT NULL,
  request_type TEXT NOT NULL,
  brand TEXT NOT NULL,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  specs TEXT,
  budget_min NUMERIC,
  budget_max NUMERIC,
  currency TEXT DEFAULT 'AED',
  urgency TEXT NOT NULL,
  reference_links TEXT[],
  consent BOOLEAN NOT NULL DEFAULT false,
  status TEXT DEFAULT 'new',
  internal_notes TEXT,
  item_id UUID REFERENCES public.items(id)
);

-- Enable RLS on all tables
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;

-- Settings: Public read access (for site config)
CREATE POLICY "Settings are publicly readable"
ON public.settings FOR SELECT
TO anon, authenticated
USING (true);

-- Items: Public read access (for displaying products)
CREATE POLICY "Items are publicly readable"
ON public.items FOR SELECT
TO anon, authenticated
USING (true);

-- Requests: Public insert (for form submissions)
CREATE POLICY "Anyone can submit requests"
ON public.requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Seed settings with default values
INSERT INTO public.settings (key, value) VALUES
('brand_name', 'Clutch – Luxury Sourcing'),
('whatsapp_number', '+971501234567'),
('whatsapp_link', 'https://wa.me/971501234567'),
('instagram_url', 'https://instagram.com/clutchsourcing'),
('threads_url', 'https://threads.net/@clutchsourcing'),
('linktree_url', 'https://linktr.ee/clutchsourcing'),
('disclaimer_text', 'Clutch is an independent luxury sourcing platform. We are in no way affiliated with any of the brands we source.');

-- Seed sample items
INSERT INTO public.items (brand, item_name, category, description, availability_status, price_hint, hero_image_url) VALUES
('Hermès', 'Birkin 25', 'Bag', 'The iconic Birkin in Togo leather, Gold hardware', 'trending', 'From AED 85,000', null),
('Chanel', 'Classic Flap Medium', 'Bag', 'Caviar leather, Gold hardware, Black', 'trending', 'From AED 35,000', null),
('Rolex', 'Daytona Cosmograph', 'Watch', 'Oystersteel, Ceramic bezel, White dial', 'available', 'Market Price', null),
('Louis Vuitton', 'Capucines MM', 'Bag', 'Taurillon leather, Gold hardware', 'available', 'From AED 22,000', null),
('Bottega Veneta', 'Jodie Intrecciato', 'Bag', 'Nappa leather, Knotted handle', 'sourced', 'From AED 14,000', null),
('Cartier', 'Panthère de Cartier', 'Watch', 'Yellow gold, Diamond bezel', 'sourced', 'Price on Request', null);