import { forwardRef } from "react";
import type { Item } from "@/hooks/useItems";

interface ItemCardProps {
  item: Item;
  onEnquire: (item: Item) => void;
}

const statusColors: Record<string, string> = {
  trending: "bg-sage text-espresso",
  available: "bg-charcoal/50 text-ivory/80",
  sourced: "bg-charcoal/30 text-ivory/60",
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
        className="group bg-card border border-sage/20 overflow-hidden hover-lift luxury-shadow hover:shadow-luxury-lg transition-all duration-400"
      >
        {/* Image */}
        <div className="aspect-[4/5] bg-charcoal/20 relative overflow-hidden">
          {item.hero_image_url ? (
            <img
              src={item.hero_image_url}
              alt={`${item.brand} ${item.item_name}`}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-charcoal/30 to-espresso border border-sage/10">
              <span className="font-display text-5xl text-sage/20 tracking-tight">
                {item.brand.charAt(0)}
              </span>
              <span className="text-[10px] tracking-luxury uppercase text-sage/30 mt-2 font-sans">
                {item.brand}
              </span>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-block px-3 py-1.5 text-[10px] font-sans font-medium tracking-wide-custom uppercase ${
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
          <div className="text-[10px] text-taupe font-sans font-medium tracking-luxury uppercase mb-2">
            {item.brand}
          </div>

          {/* Item name */}
          <h3 className="font-serif text-xl md:text-2xl text-ivory mb-1 line-clamp-1">
            {item.item_name}
          </h3>

          {/* Category */}
          <p className="text-xs text-sage/70 uppercase tracking-wide font-sans mb-4">
            {item.category}
          </p>

          {item.price_hint && (
            <p className="text-sm text-sage/60 mb-4 font-serif italic">
              {item.price_hint}
            </p>
          )}

          {/* Enquire button */}
          <button
            onClick={() => onEnquire(item)}
            className="text-sm text-ivory font-sans font-medium tracking-wide hover:text-sage transition-colors duration-400 underline underline-offset-4 decoration-sage/30 hover:decoration-sage"
          >
            Enquire
          </button>
        </div>
      </div>
    );
  }
);