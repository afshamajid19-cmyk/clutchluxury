import { MessageCircle, Instagram } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

function ThreadsIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V11.5h4.25v.568c0 2.408.541 4.365 1.607 5.818 1.025 1.396 2.612 2.132 4.722 2.19l.065.001c2.149 0 3.746-.745 4.746-2.216 1.044-1.537 1.573-3.538 1.573-5.949v-.452h4.25v.608c0 3.399-.85 6.153-2.527 8.181-1.847 2.234-4.574 3.414-8.108 3.508l-.192.003-.2-.001zM5.75 9.5v-.932c0-2.408.541-4.365 1.607-5.818C8.382 1.354 9.969.618 12.079.56l.065-.001c2.149 0 3.746.745 4.746 2.216 1.044 1.537 1.573 3.538 1.573 5.949v.776h-4.25v-.932c0-1.636-.31-2.912-.922-3.793-.524-.755-1.304-1.157-2.257-1.165l-.066-.001c-1.012.031-1.79.446-2.313 1.235-.598.902-.905 2.163-.905 3.744V9.5H5.75z" />
    </svg>
  );
}

export function Contact() {
  const { data: settings } = useSettings();

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground mb-4">
            Reach out through your preferred channel.
          </p>
          <p className="text-xs text-muted-foreground/60 tracking-wide mb-12">
            We typically respond within a few hours.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={settings?.whatsapp_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 bg-card border border-border/50 hover:border-accent transition-all duration-300 luxury-shadow hover-lift"
            >
              <MessageCircle className="h-6 w-6 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              <span className="text-sm font-medium tracking-wide">WhatsApp</span>
            </a>
            
            <a
              href={settings?.instagram_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 bg-card border border-border/50 hover:border-accent transition-all duration-300 luxury-shadow hover-lift"
            >
              <Instagram className="h-6 w-6 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              <span className="text-sm font-medium tracking-wide">Instagram</span>
            </a>
            
            <a
              href={settings?.threads_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 bg-card border border-border/50 hover:border-accent transition-all duration-300 luxury-shadow hover-lift"
            >
              <div className="text-muted-foreground group-hover:text-accent transition-colors duration-300">
                <ThreadsIcon />
              </div>
              <span className="text-sm font-medium tracking-wide">Threads</span>
            </a>
          </div>

          {settings?.linktree_url && (
            <a
              href={settings.linktree_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 underline underline-offset-4"
            >
              View all links
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
