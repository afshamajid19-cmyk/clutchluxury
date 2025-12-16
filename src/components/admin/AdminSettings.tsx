import { useState, useEffect } from "react";
import { Save, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { useToast } from "@/hooks/use-toast";

export function AdminSettings() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    whatsapp_link: "",
    whatsapp_number: "",
    instagram_url: "",
    threads_url: "",
    linktree_url: "",
    brand_name: "",
    disclaimer_text: "",
    items_sheet_url: "",
    requests_webhook_url: "",
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        whatsapp_link: settings.whatsapp_link || "",
        whatsapp_number: settings.whatsapp_number || "",
        instagram_url: settings.instagram_url || "",
        threads_url: settings.threads_url || "",
        linktree_url: settings.linktree_url || "",
        brand_name: settings.brand_name || "",
        disclaimer_text: settings.disclaimer_text || "",
        items_sheet_url: settings.items_sheet_url || "",
        requests_webhook_url: settings.requests_webhook_url || "",
      });
    }
  }, [settings]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync(formData);
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-8">
      {/* Social Links */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-1">Social & Contact Links</h3>
          <p className="text-sm text-muted-foreground">
            These links are used across the site for contact buttons.
          </p>
        </div>

        <div className="grid gap-5">
          <div className="space-y-2">
            <Label htmlFor="whatsapp_link">WhatsApp Link</Label>
            <Input
              id="whatsapp_link"
              placeholder="https://wa.me/971..."
              value={formData.whatsapp_link}
              onChange={(e) => handleChange("whatsapp_link", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Full WhatsApp URL (e.g., https://wa.me/971501234567)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp_number">WhatsApp Number (Display)</Label>
            <Input
              id="whatsapp_number"
              placeholder="+971 50 123 4567"
              value={formData.whatsapp_number}
              onChange={(e) => handleChange("whatsapp_number", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram_url">Instagram URL</Label>
            <Input
              id="instagram_url"
              placeholder="https://instagram.com/..."
              value={formData.instagram_url}
              onChange={(e) => handleChange("instagram_url", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="threads_url">Threads URL</Label>
            <Input
              id="threads_url"
              placeholder="https://threads.net/..."
              value={formData.threads_url}
              onChange={(e) => handleChange("threads_url", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linktree_url">Linktree URL (Optional)</Label>
            <Input
              id="linktree_url"
              placeholder="https://linktr.ee/..."
              value={formData.linktree_url}
              onChange={(e) => handleChange("linktree_url", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className="space-y-6 pt-6 border-t border-border">
        <div>
          <h3 className="text-lg font-medium mb-1">Branding</h3>
          <p className="text-sm text-muted-foreground">
            Brand name and legal text.
          </p>
        </div>

        <div className="grid gap-5">
          <div className="space-y-2">
            <Label htmlFor="brand_name">Brand Name</Label>
            <Input
              id="brand_name"
              placeholder="Clutch – Luxury Sourcing"
              value={formData.brand_name}
              onChange={(e) => handleChange("brand_name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="disclaimer_text">Footer Disclaimer</Label>
            <Textarea
              id="disclaimer_text"
              placeholder="Legal disclaimer text..."
              value={formData.disclaimer_text}
              onChange={(e) => handleChange("disclaimer_text", e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Advanced / Integration */}
      <div className="space-y-6 pt-6 border-t border-border">
        <div>
          <h3 className="text-lg font-medium mb-1">Integrations (Optional)</h3>
          <p className="text-sm text-muted-foreground">
            Connect external data sources and webhooks.
          </p>
        </div>

        <div className="grid gap-5">
          <div className="space-y-2">
            <Label htmlFor="items_sheet_url" className="flex items-center gap-2">
              Google Sheets URL for Items
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </Label>
            <Input
              id="items_sheet_url"
              placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
              value={formData.items_sheet_url}
              onChange={(e) => handleChange("items_sheet_url", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Published CSV URL. Expected columns: brand, item_name, category, availability_status, hero_image_url, enquiry_enabled
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requests_webhook_url">Requests Webhook URL</Label>
            <Input
              id="requests_webhook_url"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={formData.requests_webhook_url}
              onChange={(e) => handleChange("requests_webhook_url", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              POST endpoint for new request notifications (e.g., Google Apps Script web app)
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-6 border-t border-border">
        <Button
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="w-full sm:w-auto"
        >
          <Save className="h-4 w-4 mr-2" />
          {updateSettings.isPending ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
