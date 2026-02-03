import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useSettings } from "@/hooks/useSettings";
import { useToast } from "@/hooks/use-toast";
import type { Item } from "@/hooks/useItems";

const formSchema = z.object({
  full_name: z.string().min(2, "Name is required").max(100),
  whatsapp: z.string().min(8, "Valid WhatsApp number required").max(20),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  location: z.string().min(2, "Location is required").max(100),
  request_type: z.string().min(1, "Please select a request type"),
  brand: z.string().min(1, "Brand is required").max(100),
  item_name: z.string().min(1, "Item name is required").max(200),
  category: z.string().min(1, "Please select a category"),
  specs: z.string().max(1000).optional(),
  budget_min: z.string().optional(),
  budget_max: z.string().optional(),
  currency: z.string().default("AED"),
  urgency: z.string().min(1, "Please select a timeline"),
  reference_links: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to be contacted",
  }),
  company: z.string().max(0).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface RequestFormProps {
  prefilledItem?: Item | null;
  onClearPrefill?: () => void;
}

const requestTypes = [
  "Sourcing",
  "Wishlist",
  "Price Check",
  "Availability Check",
  "Concierge",
  "Other",
];

const categories = ["Bag", "Shoes", "Accessories", "Watch", "RTW", "Other"];

const urgencyOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-2-weeks", label: "1–2 weeks" },
  { value: "1-month", label: "1 month" },
  { value: "flexible", label: "Flexible" },
];

export function RequestForm({ prefilledItem, onClearPrefill }: RequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    brand: string;
    item_name: string;
    urgency: string;
  } | null>(null);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  const { data: settings } = useSettings();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      whatsapp: "",
      email: "",
      location: "",
      request_type: "",
      brand: "",
      item_name: "",
      category: "",
      specs: "",
      budget_min: "",
      budget_max: "",
      currency: "AED",
      urgency: "",
      reference_links: "",
      consent: false,
      company: "",
    },
  });

  useEffect(() => {
    if (prefilledItem) {
      form.setValue("brand", prefilledItem.brand);
      form.setValue("item_name", prefilledItem.item_name);
      form.setValue("category", prefilledItem.category);
      
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [prefilledItem, form]);

  const onSubmit = async (data: FormData) => {
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      toast({
        title: "Please wait",
        description: "You can submit another request in a few seconds.",
        variant: "destructive",
      });
      return;
    }

    if (data.company) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("requests").insert({
        full_name: data.full_name.trim(),
        whatsapp: data.whatsapp.trim(),
        email: data.email?.trim() || null,
        location: data.location.trim(),
        request_type: data.request_type,
        brand: data.brand.trim(),
        item_name: data.item_name.trim(),
        category: data.category,
        specs: data.specs?.trim() || null,
        budget_min: data.budget_min ? parseFloat(data.budget_min) : null,
        budget_max: data.budget_max ? parseFloat(data.budget_max) : null,
        currency: data.currency,
        urgency: data.urgency,
        reference_links: data.reference_links
          ? data.reference_links.split("\n").filter(Boolean)
          : null,
        consent: data.consent,
        item_id: prefilledItem?.id || null,
      });

      if (error) throw error;

      setLastSubmitTime(now);
      setSubmittedData({
        brand: data.brand,
        item_name: data.item_name,
        urgency: urgencyOptions.find((o) => o.value === data.urgency)?.label || data.urgency,
      });
      setIsSuccess(true);
      onClearPrefill?.();
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="request" className="py-32 md:py-40 relative" ref={formRef}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-taupe-DEFAULT/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-lg mx-auto text-center">
            {/* Success icon */}
            <div className="w-20 h-20 border-2 border-taupe-DEFAULT/60 rounded-full flex items-center justify-center mx-auto mb-10 taupe-glow-soft">
              <Check className="h-8 w-8 text-taupe-light" />
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl text-taupe-gradient mb-4 uppercase">
              Request Received
            </h2>
            <p className="text-muted-foreground mb-10 font-light">
              Our concierge will respond shortly.
            </p>

            {submittedData && (
              <div className="bg-clutch-surface/50 border border-taupe-DEFAULT/20 p-8 mb-12 text-left text-sm backdrop-blur-sm">
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    <span className="text-taupe-light font-medium">Item:</span>{" "}
                    {submittedData.brand} — {submittedData.item_name}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-taupe-light font-medium">Timeline:</span>{" "}
                    {submittedData.urgency}
                  </p>
                </div>
              </div>
            )}

            <Button
              variant="royal"
              size="lg"
              className="mb-6"
              onClick={() => {
                if (settings?.whatsapp_link) {
                  window.open(settings.whatsapp_link, "_blank");
                }
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Message Us on WhatsApp
            </Button>

            <div>
              <button
                className="text-sm text-taupe-DEFAULT/70 hover:text-taupe-light transition-colors duration-500 border-b border-taupe-DEFAULT/30 hover:border-taupe-DEFAULT pb-0.5"
                onClick={() => {
                  setIsSuccess(false);
                  setSubmittedData(null);
                  form.reset();
                }}
              >
                Submit another request
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="py-32 md:py-44 relative" ref={formRef} style={{ background: '#1F1A16' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-taupe-DEFAULT/5 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-16">
            <p className="section-overline mb-5">
              Start Here
            </p>
            <h2 className="section-title">
              Private Client Request
            </h2>
            <div className="section-divider mb-10" />
            <p className="text-[15px] font-light" style={{ color: 'rgba(245,239,224,0.6)' }}>
              Share your wishlist and our concierge will respond with options.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative rounded-lg"
              style={{
                background: 'rgba(36,30,26,0.6)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(139,127,116,0.2)',
                padding: '60px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
              }}
            >
              {/* Honeypot field */}
              <input
                type="text"
                name="company"
                className="absolute -left-[9999px]"
                tabIndex={-1}
                autoComplete="off"
                {...form.register("company")}
              />

              {/* Contact Info - Two columns on desktop */}
              <div className="mb-8">
                <h3 className="text-xs text-muted-foreground tracking-editorial uppercase mb-6">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-wide">Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" className="bg-transparent border-border/50 focus-visible:ring-accent h-12" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-wide">WhatsApp *</FormLabel>
                        <FormControl>
                          <Input placeholder="+971 50 123 4567" className="bg-transparent border-border/50 focus-visible:ring-accent h-12" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-wide">Email (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" className="bg-transparent border-border/50 focus-visible:ring-accent h-12" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-wide">Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="Dubai, UAE" className="bg-transparent border-border/50 focus-visible:ring-accent h-12" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Request Details */}
              <div className="mb-8 pt-8 border-t border-border/50">
                <h3 className="text-xs text-muted-foreground tracking-editorial uppercase mb-6">
                  Request Details
                </h3>
                
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="request_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-wide">Request Type *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-transparent border-border/50 focus:ring-accent h-12">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border">
                            {requestTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium tracking-wide">Brand *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Hermès" className="bg-transparent border-border/50 focus-visible:ring-accent h-12" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="item_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium tracking-wide">Item / Model *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Birkin 25" className="bg-transparent border-border/50 focus-visible:ring-accent h-12" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium tracking-wide">Category *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-transparent border-border/50 focus:ring-accent h-12">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-border">
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium tracking-wide">Timeline *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-transparent border-border/50 focus:ring-accent h-12">
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-border">
                              {urgencyOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="specs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-wide">Specifications (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Size, colour, hardware, material..."
                            className="bg-transparent border-border/50 focus-visible:ring-accent resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="mb-8 pt-8 border-t border-border/50">
                <h3 className="text-xs text-muted-foreground tracking-editorial uppercase mb-6">
                  Budget (optional)
                </h3>
                <div className="grid grid-cols-3 gap-5">
                  <FormField
                    control={form.control}
                    name="budget_min"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-wide">Min</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" className="bg-transparent border-border/50 focus-visible:ring-accent h-12" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budget_max"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-wide">Max</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" className="bg-transparent border-border/50 focus-visible:ring-accent h-12" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-wide">Currency</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-transparent border-border/50 focus:ring-accent h-12">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="AED">AED</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Reference links */}
              <div className="mb-8">
                <FormField
                  control={form.control}
                  name="reference_links"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium tracking-wide">Reference Links (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste URLs, one per line"
                          className="bg-transparent border-border/50 focus-visible:ring-accent resize-none min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Consent */}
              <div className="mb-8 pt-8 border-t border-border/50">
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-border/50 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal text-muted-foreground">
                          I consent to be contacted by Clutch regarding my request.
                        </FormLabel>
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                variant="premium"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
