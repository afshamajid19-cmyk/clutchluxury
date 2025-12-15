import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Item } from "@/hooks/useItems";

interface ItemCardProps {
  item: Item;
  onEnquire: (item: Item) => void;
}

const statusColors: Record<string, string> = {
  trending: "bg-accent/10 text-accent border-accent/20",
  available: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  sourced: "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<string, string> = {
  trending: "Trending",
  available: "Available",
  sourced: "Sourced",
};

export function ItemCard({ item, onEnquire }: ItemCardProps) {
  return (
    <div className="group bg-card rounded-lg border border-border overflow-hidden luxury-shadow hover:luxury-shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="aspect-square bg-secondary/50 relative overflow-hidden">
        {item.hero_image_url ? (
          <img
            src={item.hero_image_url}
            alt={`${item.brand} ${item.item_name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/40">
            <ShoppingBag className="h-12 w-12 mb-2" strokeWidth={1} />
            <span className="text-xs tracking-widest uppercase">{item.brand}</span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-block px-3 py-1 text-xs font-medium tracking-wide rounded-full border ${
              statusColors[item.availability_status] || statusColors.available
            }`}
          >
            {statusLabels[item.availability_status] || "Available"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="text-xs text-accent font-medium tracking-widest uppercase mb-1">
          {item.brand}
        </div>
        <h3 className="font-serif text-lg font-medium text-foreground mb-1 line-clamp-1">
          {item.item_name}
        </h3>
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">
          {item.category}
        </p>

        {item.price_hint && (
          <p className="text-sm text-muted-foreground mb-4">
            {item.price_hint}
          </p>
        )}

        <Button
          variant="outline"
          size="sm"
          className="w-full border-foreground/10 hover:bg-foreground hover:text-background transition-all"
          onClick={() => onEnquire(item)}
        >
          Enquire
        </Button>
      </div>
    </div>
  );
}
