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
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V11.5h4.25v.568c0 2.408.541 4.365 1.607 5.818 1.025 1.396 2.612 2.132 4.722 2.19l.065.001c2.149 0 3.746-.745 4.746-2.216 1.044-1.537 1.573-3.538 1.573-5.949v-.452h4.25v.608c0 3.399-.85 6.153-2.527 8.181-1.847 2.234-4.574 3.414-8.108 3.508l-.192.003-.2-.001zM5.75 9.5v-.932c0-2.408.541-4.365 1.607-5.818C8.382 1.354 9.969.618 12.079.56l.065-.001c2.149 0 3.746.745 4.746 2.216 1.044 1.537 1.573 3.538 1.573 5.949v.776h-4.25v-.932c0-1.636-.31-2.912-.922-3.793-.524-.755-1.304-1.157-2.257-1.165l-.066-.001c-1.012.031-1.79.446-2.313 1.235-.598.902-.905 2.163-.905 3.744V9.5H5.75z" />
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
  { key: "whatsapp_link", label: "WhatsApp", Icon: MessageCircle },
  { key: "instagram_url", label: "Instagram", Icon: Instagram },
  { key: "threads_url", label: "Threads", Icon: ThreadsIcon },
  { key: "linktree_url", label: "Linktree", Icon: ExternalLink },
] as const;

export function Contact() {
  const { data: settings } = useSettings();

  return (
    <section id="contact" className="py-32 md:py-44 relative">
      {/* Spotlight effect - TAUPE tinted */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-taupe-DEFAULT/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-overline mb-5">
            Connect
          </p>
          <h2 className="section-title">
            Get in Touch
          </h2>
          <div className="section-divider mb-10" />
          <p 
            className="text-[15px] mb-4 font-light"
            style={{ color: 'rgba(245,239,224,0.7)' }}
          >
            Reach out through your preferred channel.
          </p>
          <p 
            className="text-[13px] mb-16"
            style={{ color: 'rgba(245,239,224,0.5)', letterSpacing: '1px' }}
          >
            We typically respond within a few hours.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {contactLinks.map(({ key, label, Icon }) => {
              const url = settings?.[key as keyof typeof settings];
              if (!url) return null;
              
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center gap-5 py-12 px-8 rounded-lg transition-all duration-500 cursor-pointer"
                  style={{
                    background: 'rgba(36,30,26,0.4)',
                    border: '1px solid rgba(139,127,116,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(36,30,26,0.7)';
                    e.currentTarget.style.borderColor = 'rgba(139,127,116,0.5)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(139,127,116,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(36,30,26,0.4)';
                    e.currentTarget.style.borderColor = 'rgba(139,127,116,0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Icon with subtle ring */}
                  <div className="relative">
                    <div 
                      className="absolute inset-0 rounded-full scale-[2] transition-all duration-500 group-hover:scale-[2.5]"
                      style={{ 
                        background: 'rgba(139,127,116,0.1)',
                        width: '80px',
                        height: '80px',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                    <Icon 
                      className="h-[52px] w-[52px] transition-all duration-500 relative z-10 group-hover:scale-110" 
                      style={{ color: '#8B7F74' }}
                    />
                  </div>
                  
                  <span 
                    className="text-[13px] font-medium uppercase transition-colors duration-500"
                    style={{ 
                      letterSpacing: '2px', 
                      color: '#F5EFE0'
                    }}
                  >
                    {label}
                  </span>
                </a>
              );
            })}
          </div>

          <p 
            className="mt-12 text-[13px]"
            style={{ color: 'rgba(245,239,224,0.5)' }}
          >
            We typically respond within a few hours
          </p>
        </div>
      </div>
    </section>
  );
}
