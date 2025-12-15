import { useState } from "react";
import { format } from "date-fns";
import { Search, Filter, X } from "lucide-react";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useRequests, useUpdateRequest, type Request } from "@/hooks/useRequests";
import { useToast } from "@/hooks/use-toast";

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "in_progress", label: "In Progress" },
  { value: "quoted", label: "Quoted" },
  { value: "closed", label: "Closed" },
];

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "Bag", label: "Bag" },
  { value: "Watch", label: "Watch" },
  { value: "Shoes", label: "Shoes" },
  { value: "Accessories", label: "Accessories" },
  { value: "RTW", label: "RTW" },
  { value: "Other", label: "Other" },
];

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  in_progress: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  quoted: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  closed: "bg-muted text-muted-foreground border-border",
};

export function AdminRequests() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchBrand, setSearchBrand] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [editedNotes, setEditedNotes] = useState("");

  const { data: requests, isLoading } = useRequests({
    status: statusFilter,
    category: categoryFilter,
    brand: searchBrand,
  });

  const updateRequest = useUpdateRequest();
  const { toast } = useToast();

  const openDetail = (request: Request) => {
    setSelectedRequest(request);
    setEditedStatus(request.status || "new");
    setEditedNotes(request.internal_notes || "");
  };

  const closeDetail = () => {
    setSelectedRequest(null);
  };

  const handleSave = async () => {
    if (!selectedRequest) return;

    try {
      await updateRequest.mutateAsync({
        id: selectedRequest.id,
        updates: {
          status: editedStatus,
          internal_notes: editedNotes,
        },
      });
      toast({
        title: "Request updated",
        description: "Changes saved successfully.",
      });
      closeDetail();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update request.",
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
            placeholder="Search by brand..."
            value={searchBrand}
            onChange={(e) => setSearchBrand(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">
          Loading requests...
        </div>
      ) : requests && requests.length > 0 ? (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand / Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow
                  key={request.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => openDetail(request)}
                >
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(request.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="font-medium">
                    {request.full_name}
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="text-sm font-medium">{request.brand}</span>
                      <span className="text-muted-foreground"> – </span>
                      <span className="text-sm text-muted-foreground">
                        {request.item_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{request.category}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {request.location}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusColors[request.status || "new"]}
                    >
                      {request.status === "in_progress"
                        ? "In Progress"
                        : (request.status || "New").charAt(0).toUpperCase() +
                          (request.status || "new").slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No requests found.
        </div>
      )}

      {/* Detail Sheet */}
      <Sheet open={!!selectedRequest} onOpenChange={(open) => !open && closeDetail()}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif">Request Details</SheetTitle>
          </SheetHeader>

          {selectedRequest && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Date</p>
                  <p className="font-medium">
                    {format(new Date(selectedRequest.created_at), "MMM d, yyyy h:mm a")}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Request Type</p>
                  <p className="font-medium">{selectedRequest.request_type}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-4">
                <h3 className="font-medium">Contact</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Name</p>
                    <p className="font-medium">{selectedRequest.full_name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">WhatsApp</p>
                    <p className="font-medium">{selectedRequest.whatsapp}</p>
                  </div>
                  {selectedRequest.email && (
                    <div>
                      <p className="text-muted-foreground mb-1">Email</p>
                      <p className="font-medium">{selectedRequest.email}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground mb-1">Location</p>
                    <p className="font-medium">{selectedRequest.location}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-4">
                <h3 className="font-medium">Item Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Brand</p>
                    <p className="font-medium">{selectedRequest.brand}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Item</p>
                    <p className="font-medium">{selectedRequest.item_name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Category</p>
                    <p className="font-medium">{selectedRequest.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Urgency</p>
                    <p className="font-medium">{selectedRequest.urgency}</p>
                  </div>
                </div>

                {selectedRequest.specs && (
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-1">Specifications</p>
                    <p className="font-medium">{selectedRequest.specs}</p>
                  </div>
                )}

                {(selectedRequest.budget_min || selectedRequest.budget_max) && (
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-1">Budget</p>
                    <p className="font-medium">
                      {selectedRequest.budget_min && `${selectedRequest.currency} ${selectedRequest.budget_min}`}
                      {selectedRequest.budget_min && selectedRequest.budget_max && " – "}
                      {selectedRequest.budget_max && `${selectedRequest.currency} ${selectedRequest.budget_max}`}
                    </p>
                  </div>
                )}

                {selectedRequest.reference_links && selectedRequest.reference_links.length > 0 && (
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-1">Reference Links</p>
                    <div className="space-y-1">
                      {selectedRequest.reference_links.map((link, i) => (
                        <a
                          key={i}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-accent hover:underline truncate"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border space-y-4">
                <h3 className="font-medium">Management</h3>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Status
                  </label>
                  <Select value={editedStatus} onValueChange={setEditedStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="quoted">Quoted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Internal Notes
                  </label>
                  <Textarea
                    value={editedNotes}
                    onChange={(e) => setEditedNotes(e.target.value)}
                    placeholder="Add internal notes..."
                    rows={4}
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleSave}
                  disabled={updateRequest.isPending}
                >
                  {updateRequest.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
