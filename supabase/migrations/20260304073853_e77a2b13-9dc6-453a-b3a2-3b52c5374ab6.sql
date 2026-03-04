-- Allow public insert, update, delete on trending_items (admin managed via passcode in app)
CREATE POLICY "Anyone can insert trending items"
ON public.trending_items
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update trending items"
ON public.trending_items
FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can delete trending items"
ON public.trending_items
FOR DELETE
USING (true);