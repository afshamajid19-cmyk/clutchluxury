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
    <section id="contact" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground mb-10">
            Reach out through your preferred channel. We typically respond
            within a few hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href={settings?.whatsapp_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-background border border-border rounded-lg hover:border-accent transition-colors luxury-shadow"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
            <a
              href={settings?.instagram_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-background border border-border rounded-lg hover:border-accent transition-colors luxury-shadow"
            >
              <Instagram className="h-5 w-5" />
              <span className="text-sm font-medium">Instagram</span>
            </a>
            <a
              href={settings?.threads_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-background border border-border rounded-lg hover:border-accent transition-colors luxury-shadow"
            >
              <ThreadsIcon />
              <span className="text-sm font-medium">Threads</span>
            </a>
          </div>

          {settings?.linktree_url && (
            <a
              href={settings.linktree_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              View all links
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
