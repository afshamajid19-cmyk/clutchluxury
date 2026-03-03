import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import TrendingUpload from "./pages/TrendingUpload";
import NotFound from "./pages/NotFound";
import HermesLeatherTypes from "./pages/guides/HermesLeatherTypes";
import HermesColorGuide from "./pages/guides/HermesColorGuide";
import HermesDateStamps from "./pages/guides/HermesDateStamps";
import QuotaVsNonQuotaBags from "./pages/guides/QuotaVsNonQuotaBags";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/trending-upload" element={<TrendingUpload />} />
            <Route path="/guides/hermes-leather-types" element={<HermesLeatherTypes />} />
            <Route path="/guides/hermes-color-guide" element={<HermesColorGuide />} />
            <Route path="/guides/hermes-date-stamps" element={<HermesDateStamps />} />
            <Route path="/guides/quota-vs-non-quota-bags" element={<QuotaVsNonQuotaBags />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
