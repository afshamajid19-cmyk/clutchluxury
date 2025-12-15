import { useState } from "react";
import { useItems, type Item } from "@/hooks/useItems";
import { ItemCard } from "./ItemCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TrendingItemsProps {
  onEnquire: (item: Item) => void;
}

const availabilityOptions = [
  { value: "all", label: "All Items" },
  { value: "trending", label: "Trending" },
  { value: "available", label: "Available" },
  { value: "sourced", label: "Recently Sourced" },
];

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "Bag", label: "Bags" },
  { value: "Watch", label: "Watches" },
  { value: "Shoes", label: "Shoes" },
  { value: "Accessories", label: "Accessories" },
  { value: "RTW", label: "Ready-to-Wear" },
];

export function TrendingItems({ onEnquire }: TrendingItemsProps) {
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: items, isLoading } = useItems({
    availability_status: availabilityFilter,
    category: categoryFilter,
  });

  return (
    <section id="trending" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Curated Selection
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Explore our collection of sought-after pieces
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-transparent border-border/50 focus:ring-accent text-sm">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {availabilityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-sm">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-transparent border-border/50 focus:ring-accent text-sm">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-sm">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-secondary/30 animate-pulse"
              />
            ))}
          </div>
        ) : items && items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} onEnquire={onEnquire} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm">No items match your current filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
