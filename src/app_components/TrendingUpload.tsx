"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, LogOut, Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ADMIN_PASSWORD = "clutch2026";
const STORAGE_KEY = "clutch_trending_auth";

export default function TrendingUpload() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthenticated(localStorage.getItem(STORAGE_KEY) === "true");
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthenticated(false);
    setPassword("");
  };

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-trending-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trending_items")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: authenticated,
  });

  const handleFileSelect = (f: File) => {
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5MB.");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) {
      toast.error("Only JPG, PNG, WebP accepted.");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFileSelect(f);
  }, []);

  const clearForm = () => {
    setFile(null);
    setPreview(null);
    setTitle("");
    setSource("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image first");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      
      const { error: storageError } = await supabase.storage
        .from("trending-images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });
      if (storageError) throw storageError;

      const { data: urlData } = supabase.storage
        .from("trending-images")
        .getPublicUrl(fileName);

      const maxOrder = items.length > 0 ? Math.max(...items.map((i) => i.display_order)) + 1 : 0;

      const { error: dbError } = await supabase.from("trending_items").insert({
        image_url: urlData.publicUrl,
        title: title || null,
        source_attribution: source || null,
        display_order: maxOrder,
      });
      if (dbError) throw dbError;

      toast.success("Item added to trending!");
      clearForm();
      queryClient.invalidateQueries({ queryKey: ["admin-trending-items"] });
      queryClient.invalidateQueries({ queryKey: ["trending-items"] });
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    const { error } = await supabase
      .from("trending_items")
      .update({ is_active: !currentActive })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update");
    } else {
      queryClient.invalidateQueries({ queryKey: ["admin-trending-items"] });
      queryClient.invalidateQueries({ queryKey: ["trending-items"] });
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this item permanently?")) return;
    const { error } = await supabase.from("trending_items").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Item deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-trending-items"] });
      queryClient.invalidateQueries({ queryKey: ["trending-items"] });
    }
  };

  const reorder = async (id: string, direction: "up" | "down") => {
    const idx = items.findIndex((i) => i.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= items.length) return;

    const a = items[idx];
    const b = items[swapIdx];

    await Promise.all([
      supabase.from("trending_items").update({ display_order: b.display_order }).eq("id", a.id),
      supabase.from("trending_items").update({ display_order: a.display_order }).eq("id", b.id),
    ]);

    queryClient.invalidateQueries({ queryKey: ["admin-trending-items"] });
    queryClient.invalidateQueries({ queryKey: ["trending-items"] });
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#E9E4DE' }}>
        <div className="w-full max-w-sm p-8 rounded-lg" style={{ background: '#F5F2EE', border: '1px solid rgba(134,103,88,0.2)' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 300, color: '#291E15', marginBottom: '8px' }}>
            Clutch Admin
          </h1>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px', color: '#928377', marginBottom: '24px' }}>
            Enter password to manage trending items
          </p>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="mb-4"
          />
          <Button onClick={handleLogin} className="w-full" style={{ background: '#6B6B6B', color: '#fff' }}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#E9E4DE' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, color: '#291E15' }}>
              Trending Items
            </h1>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px', color: '#928377' }}>
              Upload and manage trending images
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>

        {/* Upload Section */}
        <div className="rounded-lg p-6 mb-8" style={{ background: '#F5F2EE', border: '1px solid rgba(134,103,88,0.15)' }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: 600, color: '#291E15', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Add New Item
          </h2>

          {/* Drag & Drop Zone */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors mb-4 ${dragOver ? 'border-[#866758]' : 'border-[rgba(134,103,88,0.3)]'}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? (
              <div className="relative inline-block">
                <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded" />
                <button
                  onClick={(e) => { e.stopPropagation(); clearForm(); }}
                  className="absolute -top-2 -right-2 rounded-full p-1"
                  style={{ background: '#6B6B6B', color: '#fff' }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Image className="w-10 h-10 mx-auto mb-3" style={{ color: '#928377' }} />
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', color: '#928377' }}>
                  Drag & drop an image or <span style={{ color: '#866758', fontWeight: 500 }}>click to browse</span>
                </p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', color: '#b5a99a', marginTop: '4px' }}>
                  JPG, PNG, WebP · Max 5MB
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', fontWeight: 500, color: '#928377', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Title (optional)
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                placeholder="e.g. Birkin 25 in Rose Sakura"
                className="mt-1"
              />
            </div>
            <div>
              <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', fontWeight: 500, color: '#928377', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Source (optional)
              </label>
              <Input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Via @fashionista"
                className="mt-1"
              />
            </div>
          </div>

          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full sm:w-auto"
            style={{ background: '#6B6B6B', color: '#fff' }}
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Uploading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4" /> Add to Trending
              </span>
            )}
          </Button>
        </div>

        {/* Current Items */}
        <div className="rounded-lg p-6" style={{ background: '#F5F2EE', border: '1px solid rgba(134,103,88,0.15)' }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: 600, color: '#291E15', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Current Items ({items.length})
          </h2>

          {isLoading ? (
            <p style={{ color: '#928377', fontSize: '14px' }}>Loading...</p>
          ) : items.length === 0 ? (
            <p style={{ color: '#928377', fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}>
              No items yet. Upload your first trending item above.
            </p>
          ) : (
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-lg"
                  style={{
                    background: item.is_active ? '#fff' : 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(134,103,88,0.1)',
                    opacity: item.is_active ? 1 : 0.5,
                  }}
                >
                  <img
                    src={item.image_url}
                    alt={item.title || "Trending item"}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px', fontWeight: 500, color: '#291E15' }}>
                      {item.title || "Untitled"}
                    </p>
                    {item.source_attribution && (
                      <p className="truncate" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', color: '#928377', fontStyle: 'italic' }}>
                        {item.source_attribution}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => reorder(item.id, "up")} disabled={idx === 0}>
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => reorder(item.id, "down")} disabled={idx === items.length - 1}>
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleActive(item.id, item.is_active)}>
                      {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => deleteItem(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
