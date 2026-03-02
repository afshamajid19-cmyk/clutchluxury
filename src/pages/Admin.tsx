import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowLeft, Upload, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminRequests } from "@/components/admin/AdminRequests";
import { AdminItems } from "@/components/admin/AdminItems";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const ADMIN_PASSCODE = "clutch2024";

function AdminTrending() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [attribution, setAttribution] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: items, isLoading } = useQuery({
    queryKey: ["admin-trending-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_items")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("trending-images")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("trending-images")
        .getPublicUrl(fileName);

      const maxOrder = items?.reduce((max, i) => Math.max(max, i.display_order), 0) ?? 0;

      const { error: insertError } = await supabase.from("trending_items").insert({
        image_url: urlData.publicUrl,
        title: title || null,
        source_attribution: attribution || null,
        display_order: maxOrder + 1,
      });
      if (insertError) throw insertError;

      toast.success("Trending item added");
      setTitle("");
      setAttribution("");
      queryClient.invalidateQueries({ queryKey: ["admin-trending-items"] });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("trending_items").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-trending-items"] }),
  });

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("trending_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Item deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-trending-items"] });
    },
  });

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg border border-border bg-card">
        <h3 className="font-serif text-lg mb-4">Add Trending Item</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Source attribution (optional)" value={attribution} onChange={(e) => setAttribution(e.target.value)} />
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {isLoading && <p className="text-muted-foreground text-sm">Loading...</p>}
        {items?.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <img
              src={item.image_url}
              alt={item.title || "Trending item"}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.title || "Untitled"}</p>
              {item.source_attribution && (
                <p className="text-xs text-muted-foreground">{item.source_attribution}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleActive.mutate({ id: item.id, is_active: !item.is_active })}
            >
              {item.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteItem.mutate(item.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = sessionStorage.getItem("clutch_admin_auth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem("clutch_admin_auth", "true");
      setError("");
    } else {
      setError("Invalid passcode");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("clutch_admin_auth");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-secondary rounded-sm flex items-center justify-center mx-auto mb-4">
              <Lock className="h-5 w-5 text-foreground" />
            </div>
            <h1 className="font-serif text-2xl text-foreground mb-2">Admin Access</h1>
            <p className="text-sm text-muted-foreground">Enter the admin passcode to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="password" placeholder="Passcode" value={passcode} onChange={(e) => setPasscode(e.target.value)} className="text-center text-lg tracking-widest h-12" />
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            <Button type="submit" className="w-full h-11">Access Dashboard</Button>
          </form>
          <Button variant="ghost" className="w-full mt-4 text-muted-foreground" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />Back to site
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <span className="font-serif text-xl tracking-wide">CLUTCH</span>
              <span className="text-[10px] tracking-editorial uppercase text-muted-foreground bg-secondary px-2.5 py-1 rounded-sm">Admin</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-muted-foreground">View Site</Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="requests" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-4 h-11">
            <TabsTrigger value="requests" className="text-sm">Requests</TabsTrigger>
            <TabsTrigger value="items" className="text-sm">Items</TabsTrigger>
            <TabsTrigger value="trending" className="text-sm">Trending</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="requests"><AdminRequests /></TabsContent>
          <TabsContent value="items"><AdminItems /></TabsContent>
          <TabsContent value="trending"><AdminTrending /></TabsContent>
          <TabsContent value="settings"><AdminSettings /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
