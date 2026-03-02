
-- Create trending_items table for manually curated trending content
CREATE TABLE public.trending_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  source_attribution TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.trending_items ENABLE ROW LEVEL SECURITY;

-- Public read access for active items
CREATE POLICY "Trending items are publicly readable"
ON public.trending_items
FOR SELECT
USING (true);

-- Create storage bucket for trending images
INSERT INTO storage.buckets (id, name, public) VALUES ('trending-images', 'trending-images', true);

-- Public read access for trending images
CREATE POLICY "Trending images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'trending-images');

-- Allow authenticated uploads (admin)
CREATE POLICY "Anyone can upload trending images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'trending-images');

CREATE POLICY "Anyone can update trending images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'trending-images');

CREATE POLICY "Anyone can delete trending images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'trending-images');
