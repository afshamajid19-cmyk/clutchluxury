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
  company: z.string().max(0).optional(), // Honeypot
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

  // Handle prefill from item enquiry
  useEffect(() => {
    if (prefilledItem) {
      form.setValue("brand", prefilledItem.brand);
      form.setValue("item_name", prefilledItem.item_name);
      form.setValue("category", prefilledItem.category);
      
      // Scroll to form
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [prefilledItem, form]);

  const onSubmit = async (data: FormData) => {
    // Rate limiting - prevent submissions within 10 seconds
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      toast({
        title: "Please wait",
        description: "You can submit another request in a few seconds.",
        variant: "destructive",
      });
      return;
    }

    // Honeypot check
    if (data.company) {
      // Silently fail for bots
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
      <section id="request" className="py-20 md:py-28" ref={formRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-accent" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4">
              Request Received
            </h2>
            <p className="text-muted-foreground mb-6">
              Our team will respond shortly.
            </p>

            {submittedData && (
              <div className="bg-secondary/50 rounded-lg p-4 mb-8 text-left text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Item:</span>{" "}
                  {submittedData.brand} – {submittedData.item_name}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Timeline:</span>{" "}
                  {submittedData.urgency}
                </p>
              </div>
            )}

            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-background"
              onClick={() => {
                if (settings?.whatsapp_link) {
                  window.open(settings.whatsapp_link, "_blank");
                }
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Message us on WhatsApp (fastest)
            </Button>

            <Button
              variant="ghost"
              className="mt-4 text-muted-foreground"
              onClick={() => {
                setIsSuccess(false);
                setSubmittedData(null);
                form.reset();
              }}
            >
              Submit another request
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="py-20 md:py-28" ref={formRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-4">
              Request an Item
            </h2>
            <p className="text-muted-foreground">
              Tell us what you're looking for and we'll get back to you with
              options.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 bg-card border border-border rounded-lg p-6 md:p-8 luxury-shadow"
            >
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="company"
                className="absolute -left-[9999px]"
                tabIndex={-1}
                autoComplete="off"
                {...form.register("company")}
              />

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+971 50 123 4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (City/Country) *</FormLabel>
                      <FormControl>
                        <Input placeholder="Dubai, UAE" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Request Details */}
              <div className="pt-4 border-t border-border">
                <FormField
                  control={form.control}
                  name="request_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Request Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {requestTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Hermès" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="item_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name / Model *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Birkin 25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeline *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {urgencyOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="specs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specifications (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Size, colour, hardware, material..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Budget */}
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="budget_min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Min</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget_max"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Max</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AED">AED</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="reference_links"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference Links (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste URLs, one per line"
                        className="resize-none"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Consent */}
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal text-muted-foreground">
                        I consent to be contacted by Clutch regarding my request.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-foreground text-background hover:bg-foreground/90"
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
