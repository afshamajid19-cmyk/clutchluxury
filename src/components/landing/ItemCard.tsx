import { forwardRef } from "react";
import type { Item } from "@/hooks/useItems";

interface ItemCardProps {
  item: Item;
  onEnquire: (item: Item) => void;
}

const statusColors: Record<string, string> = {
  trending: "bg-foreground/90 text-background",
  available: "bg-secondary text-foreground/80",
  sourced: "bg-muted text-muted-foreground",
};

const statusLabels: Record<string, string> = {
  trending: "Trending",
  available: "Available",
  sourced: "Recently Sourced",
};

export const ItemCard = forwardRef<HTMLDivElement, ItemCardProps>(
  function ItemCard({ item, onEnquire }, ref) {
    return (
      <div
        ref={ref}
        className="group bg-card border border-border overflow-hidden hover-lift luxury-shadow hover:luxury-shadow-lg"
      >
        {/* Image */}
        <div className="aspect-[4/5] bg-secondary relative overflow-hidden">
          {item.hero_image_url ? (
            <img
              src={item.hero_image_url}
              alt={`${item.brand} ${item.item_name}`}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-card to-secondary border border-border">
              {/* Monogram placeholder */}
              <span className="font-serif text-5xl text-muted-foreground/15 tracking-tight">
                {item.brand.charAt(0)}
              </span>
              <span className="text-[10px] tracking-luxury uppercase text-muted-foreground/30 mt-2">
                {item.brand}
              </span>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-block px-3 py-1.5 text-[10px] font-medium tracking-editorial uppercase ${
                statusColors[item.availability_status] || statusColors.available
              }`}
            >
              {statusLabels[item.availability_status] || "Available"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Brand */}
          <div className="text-[10px] text-accent font-medium tracking-luxury uppercase mb-2">
            {item.brand}
          </div>

          {/* Item name */}
          <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1 line-clamp-1">
            {item.item_name}
          </h3>

          {/* Category */}
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">
            {item.category}
          </p>

          {item.price_hint && (
            <p className="text-sm text-muted-foreground mb-4 italic">
              {item.price_hint}
            </p>
          )}

          {/* Enquire button - minimal text style */}
          <button
            onClick={() => onEnquire(item)}
            className="text-sm text-foreground font-medium tracking-wide hover:text-accent transition-colors duration-300 underline underline-offset-4 decoration-border hover:decoration-accent"
          >
            Enquire
          </button>
        </div>
      </div>
    );
  }
);
