import { MessageCircle, Instagram, ExternalLink } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.332-3.022.88-.73 2.088-1.146 3.396-1.17.96-.018 1.86.124 2.688.424-.036-1.092-.252-1.949-.648-2.566-.516-.803-1.349-1.21-2.476-1.21h-.07c-.789.01-1.448.248-1.96.706l-1.394-1.499c.814-.754 1.876-1.152 3.157-1.183h.098c1.664 0 2.97.59 3.882 1.752.794 1.012 1.22 2.39 1.266 4.098l.008.426c1.075.594 1.942 1.398 2.529 2.378.907 1.516 1.108 3.36.564 5.196C21.218 21.38 18.788 23.98 14.41 24h-.014l-.21-.001zM9.69 17.631c.063 1.15 1.17 1.905 2.813 1.817 1.135-.063 1.99-.483 2.54-1.247.376-.524.64-1.185.793-1.96a7.776 7.776 0 00-2.105-.288c-2.166.04-3.963.86-4.04 1.678z" />
    </svg>
  );
}

function LinktreeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
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

export function Contact() {
  const { data: settings } = useSettings();

  return (
    <section id="contact" className="py-40 md:py-56 relative" style={{ background: '#E9E4DE' }}>
      {/* Section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(146,131,119,0.25), transparent)' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-overline mb-5">
            Connect
          </p>
          <h2 className="section-title mb-12">
            Get in Touch
          </h2>
          <div className="section-divider mb-12" />
          <p 
            className="mb-5"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: '16px',
              lineHeight: 1.9,
              color: '#565250' 
            }}
          >
            Get in touch for sourcing requests, inquiries, or to share your wishlist
          </p>
          <p 
            className="mb-20 uppercase"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: '#928377', 
            }}
          >
            We typically respond within a few hours.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {contactLinks.map(({ key, label, Icon }) => {
              const url = settings?.[key as keyof typeof settings];
              if (!url) return null;
              
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center gap-6 py-14 px-8 rounded-lg transition-all duration-[400ms] cursor-pointer"
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
                        className="h-[52px] w-[52px] transition-all duration-[400ms] relative z-10 group-hover:scale-110 rounded-full object-cover"
                      />
                    ) : item.Icon ? (
                      <item.Icon 
                        className="h-[52px] w-[52px] transition-all duration-[400ms] relative z-10 group-hover:scale-110" 
                        style={{ color: '#866758' }}
                      />
                    ) : null}
                  </div>
                  
                  <span 
                    className="uppercase transition-colors duration-[400ms]"
                    style={{ 
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                      fontSize: '11px',
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

          <p 
            className="mt-14"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: '13px',
              color: '#928377' 
            }}
          >
            We typically respond within a few hours
          </p>
        </div>
      </div>
    </section>
  );
}
