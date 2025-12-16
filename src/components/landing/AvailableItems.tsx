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

interface AvailableItemsProps {
  onEnquire: (item: Item) => void;
}

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "Bag", label: "Bags" },
  { value: "Watch", label: "Watches" },
  { value: "Shoes", label: "Shoes" },
  { value: "Accessories", label: "Accessories" },
  { value: "RTW", label: "Ready-to-Wear" },
];

const statusOptions = [
  { value: "all", label: "All Items" },
  { value: "available", label: "Available" },
  { value: "sourced", label: "Recently Sourced" },
];

export function AvailableItems({ onEnquire }: AvailableItemsProps) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch non-trending items
  const { data: items, isLoading } = useItems({
    availability_status: statusFilter === "all" ? undefined : statusFilter,
    category: categoryFilter,
  });

  // Filter out trending items (they're shown in the carousel)
  const filteredItems = items?.filter(item => 
    statusFilter === "all" 
      ? item.availability_status !== "trending"
      : true
  );

  if (!filteredItems || filteredItems.length === 0) {
    if (isLoading) {
      return (
        <section className="py-20 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Available Items
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] bg-muted/50 animate-pulse"
                />
              ))}
            </div>
          </div>
        </section>
      );
    }
    return null;
  }

  return (
    <section className="py-20 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-luxury uppercase text-muted-foreground mb-4">
            Browse Collection
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Available Items
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Ready to source or recently acquired pieces
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[160px] bg-background border-border text-sm h-11">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-sm">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[160px] bg-background border-border text-sm h-11">
              <SelectValue placeholder="Category" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onEnquire={onEnquire} />
          ))}
        </div>
      </div>
    </section>
  );
}
