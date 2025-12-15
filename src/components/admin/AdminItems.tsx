import { useState } from "react";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAllItems, type Item } from "@/hooks/useItems";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  trending: "bg-accent/10 text-accent border-accent/20",
  available: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  sourced: "bg-muted text-muted-foreground border-border",
};

const defaultItem = {
  brand: "",
  item_name: "",
  category: "Bag",
  description: "",
  availability_status: "available",
  price_hint: "",
  hero_image_url: "",
  enquiry_enabled: true,
};

export function AdminItems() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState(defaultItem);
  const [isSaving, setIsSaving] = useState(false);

  const { data: items, isLoading } = useAllItems();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const filteredItems = items?.filter((item) => {
    const matchesSearch =
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.availability_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormData(defaultItem);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: Item) => {
    setEditingItem(item);
    setFormData({
      brand: item.brand,
      item_name: item.item_name,
      category: item.category,
      description: item.description || "",
      availability_status: item.availability_status,
      price_hint: item.price_hint || "",
      hero_image_url: item.hero_image_url || "",
      enquiry_enabled: item.enquiry_enabled ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.brand || !formData.item_name) {
      toast({
        title: "Missing fields",
        description: "Brand and item name are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      if (editingItem) {
        const { error } = await supabase
          .from("items")
          .update({
            brand: formData.brand,
            item_name: formData.item_name,
            category: formData.category,
            description: formData.description || null,
            availability_status: formData.availability_status,
            price_hint: formData.price_hint || null,
            hero_image_url: formData.hero_image_url || null,
            enquiry_enabled: formData.enquiry_enabled,
          })
          .eq("id", editingItem.id);

        if (error) throw error;
        toast({ title: "Item updated" });
      } else {
        const { error } = await supabase.from("items").insert({
          brand: formData.brand,
          item_name: formData.item_name,
          category: formData.category,
          description: formData.description || null,
          availability_status: formData.availability_status,
          price_hint: formData.price_hint || null,
          hero_image_url: formData.hero_image_url || null,
          enquiry_enabled: formData.enquiry_enabled,
        });

        if (error) throw error;
        toast({ title: "Item created" });
      }

      queryClient.invalidateQueries({ queryKey: ["all-items"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save item.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: Item) => {
    if (!confirm(`Delete "${item.brand} – ${item.item_name}"?`)) return;

    try {
      const { error } = await supabase.from("items").delete().eq("id", item.id);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["all-items"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({ title: "Item deleted" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete item.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="trending">Trending</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="sourced">Sourced</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif">
                {editingItem ? "Edit Item" : "Add New Item"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Brand *</Label>
                  <Input
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    placeholder="e.g. Hermès"
                  />
                </div>
                <div>
                  <Label>Item Name *</Label>
                  <Input
                    value={formData.item_name}
                    onChange={(e) =>
                      setFormData({ ...formData, item_name: e.target.value })
                    }
                    placeholder="e.g. Birkin 25"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(val) =>
                      setFormData({ ...formData, category: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bag">Bag</SelectItem>
                      <SelectItem value="Watch">Watch</SelectItem>
                      <SelectItem value="Shoes">Shoes</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="RTW">RTW</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Availability</Label>
                  <Select
                    value={formData.availability_status}
                    onValueChange={(val) =>
                      setFormData({ ...formData, availability_status: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="sourced">Sourced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description..."
                  rows={2}
                />
              </div>

              <div>
                <Label>Price Hint</Label>
                <Input
                  value={formData.price_hint}
                  onChange={(e) =>
                    setFormData({ ...formData, price_hint: e.target.value })
                  }
                  placeholder="e.g. From AED 85,000"
                />
              </div>

              <div>
                <Label>Hero Image URL</Label>
                <Input
                  value={formData.hero_image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, hero_image_url: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Enquiries</Label>
                  <p className="text-xs text-muted-foreground">
                    Show this item on the website
                  </p>
                </div>
                <Switch
                  checked={formData.enquiry_enabled}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, enquiry_enabled: checked })
                  }
                />
              </div>

              <Button
                className="w-full"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : editingItem ? "Update Item" : "Create Item"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">
          Loading items...
        </div>
      ) : filteredItems && filteredItems.length > 0 ? (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand / Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Enabled</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <span className="font-medium">{item.brand}</span>
                      <span className="text-muted-foreground"> – </span>
                      <span className="text-muted-foreground">
                        {item.item_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{item.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusColors[item.availability_status]}
                    >
                      {item.availability_status.charAt(0).toUpperCase() +
                        item.availability_status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.price_hint || "–"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        item.enquiry_enabled ? "bg-emerald-500" : "bg-muted-foreground"
                      }`}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No items found.
        </div>
      )}
    </div>
  );
}
