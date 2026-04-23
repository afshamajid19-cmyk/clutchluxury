import { MessageCircle, Instagram, ExternalLink } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { HomepageSettings } from "@/lib/server/homepage";

function LinktreeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.953 15.066l-.038.001a.75.75 0 0 1-.076-1.498l4.132-.32V7.877L8.283 11.66a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.719-3.718v5.375l4.132.32a.75.75 0 0 1-.114 1.498l-4.018-.311v5.426a.75.75 0 0 1-1.5 0v-5.426l-4.018.311-.033.001z" />
    </svg>
  );
}

const contactLinks = [
  { key: "whatsapp_link", label: "WhatsApp", Icon: MessageCircle, isImage: false },
  { key: "instagram_url", label: "Instagram", Icon: Instagram, isImage: false },
  { key: "threads_url", label: "Threads", Icon: null, isImage: true, imageSrc: "/images/threads-logo-brown.png" },
  { key: "linktree_url", label: "Linktree", Icon: ExternalLink, isImage: false },
] as const;

export function Contact({
  settings: initialSettings,
}: {
  settings?: HomepageSettings | null;
}) {
  const { data: settingsFromQuery } = useSettings();
  const settings = initialSettings ?? settingsFromQuery;
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="contact" className="py-24 sm:py-40 md:py-56 relative" style={{ background: '#E9E4DE' }}>
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(146,131,119,0.25), transparent)' }} />
      
      <div ref={ref} className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`scroll-reveal ${isVisible ? 'revealed' : ''}`}>
            <p className="section-overline mb-5">Connect</p>
            <h2 className="section-title mb-12">Get in Touch</h2>
            <div className={`section-divider mb-12 divider-reveal ${isVisible ? 'revealed' : ''}`} />
          </div>
          <p 
            className={`mb-5 scroll-reveal ${isVisible ? 'revealed' : ''}`}
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: '15px',
              lineHeight: 1.9,
              color: '#565250',
              transitionDelay: '0.15s',
            }}
          >
            Get in touch for sourcing requests, inquiries, or to share your wishlist
          </p>
          <div className="mb-14 sm:mb-20" />

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10 scroll-reveal ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '0.3s' }}>
            {contactLinks.map((item) => {
              const { key, label, Icon } = item;
              const url = settings?.[key as keyof typeof settings];
              if (!url) return null;
              
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center gap-4 sm:gap-6 py-8 sm:py-14 px-4 sm:px-8 rounded-lg transition-all duration-[400ms] cursor-pointer reveal-child"
                  style={{
                    background: '#F5F2EE',
                    border: '1px solid rgba(134,103,88,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.borderColor = 'rgba(134,103,88,0.4)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(134,103,88,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#F5F2EE';
                    e.currentTarget.style.borderColor = 'rgba(134,103,88,0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="relative">
                    {item.isImage ? (
                      <img 
                        src={item.imageSrc} 
                        alt={item.label}
                        className="h-10 w-10 sm:h-[52px] sm:w-[52px] transition-all duration-[400ms] relative z-10 group-hover:scale-110 rounded-full object-cover"
                      />
                    ) : item.Icon ? (
                      <item.Icon 
                        className="h-10 w-10 sm:h-[52px] sm:w-[52px] transition-all duration-[400ms] relative z-10 group-hover:scale-110 group-hover:-translate-y-1" 
                        style={{ color: '#866758' }}
                      />
                    ) : null}
                  </div>
                  
                  <span 
                    className="uppercase transition-colors duration-[400ms]"
                    style={{ 
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                      fontSize: '10px',
                      letterSpacing: '0.18em', 
                      color: '#291E15'
                    }}
                  >
                    {label}
                  </span>
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
