import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function TrendingNow() {
  const { data: items } = useQuery({
    queryKey: ["trending-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_items")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  if (!items || items.length === 0) return null;

  return (
    <section id="trending-now" className="py-40 md:py-56 relative" style={{ background: '#E9E4DE' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(146,131,119,0.25), transparent)' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 md:mb-28">
          <p className="section-overline mb-5">What's Hot</p>
          <h2 className="section-title mb-12">Trending Now</h2>
          <div className="section-divider" />
          <p
            className="max-w-md mx-auto mt-10"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: '16px',
              lineHeight: 1.9,
              color: '#928377',
            }}
          >
            Trending in luxury right now
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="group rounded-lg overflow-hidden transition-all duration-[400ms] hover:-translate-y-2"
              style={{
                background: '#F5F2EE',
                border: '1px solid rgba(134,103,88,0.15)',
              }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title || "Trending luxury item"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {(item.title || item.source_attribution) && (
                <div className="p-5">
                  {item.title && (
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 500,
                        fontSize: '13px',
                        color: '#291E15',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {item.title}
                    </p>
                  )}
                  {item.source_attribution && (
                    <p
                      className="mt-2"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 300,
                        fontSize: '11px',
                        color: '#928377',
                        fontStyle: 'italic',
                      }}
                    >
                      {item.source_attribution}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
