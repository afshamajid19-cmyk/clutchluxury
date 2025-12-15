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
    <section id="trending" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
            Trending & Available
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Explore our curated selection of sought-after pieces
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {availabilityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-secondary/50 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : items && items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} onEnquire={onEnquire} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>No items match your current filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
