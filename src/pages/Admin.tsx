import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminRequests } from "@/components/admin/AdminRequests";
import { AdminItems } from "@/components/admin/AdminItems";
import { AdminSettings } from "@/components/admin/AdminSettings";

const ADMIN_PASSCODE = "clutch2024";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = sessionStorage.getItem("clutch_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
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
            <h1 className="font-serif text-2xl text-foreground mb-2">
              Admin Access
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter the admin passcode to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="text-center text-lg tracking-widest h-12"
            />
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
            <Button type="submit" className="w-full h-11">
              Access Dashboard
            </Button>
          </form>

          <Button
            variant="ghost"
            className="w-full mt-4 text-muted-foreground"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to site
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <span className="font-serif text-xl tracking-wide">CLUTCH</span>
              <span className="text-[10px] tracking-editorial uppercase text-muted-foreground bg-secondary px-2.5 py-1 rounded-sm">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-muted-foreground"
              >
                View Site
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="requests" className="space-y-8">
          <TabsList className="grid w-full max-w-lg grid-cols-3 h-11">
            <TabsTrigger value="requests" className="text-sm">Requests</TabsTrigger>
            <TabsTrigger value="items" className="text-sm">Items</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <AdminRequests />
          </TabsContent>

          <TabsContent value="items">
            <AdminItems />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
