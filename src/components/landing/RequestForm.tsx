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
      <section id="request" className="py-32 md:py-40 relative" ref={formRef} style={{ background: '#E9E4DE' }}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-lg mx-auto text-center">
            {/* Success icon */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-10" style={{ border: '2px solid rgba(134,103,88,0.5)' }}>
              <Check className="h-8 w-8" style={{ color: '#866758' }} />
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl text-taupe-gradient mb-4 uppercase">
              Request Received
            </h2>
            <p className="mb-10 font-light" style={{ color: '#565250' }}>
              Our concierge will respond shortly.
            </p>

            {submittedData && (
              <div className="p-8 mb-12 text-left text-sm" style={{ background: '#F5F2EE', border: '1px solid rgba(134,103,88,0.15)' }}>
                <div className="space-y-3">
                  <p style={{ color: '#565250' }}>
                    <span style={{ color: '#291E15' }} className="font-medium">Item:</span>{" "}
                    {submittedData.brand} — {submittedData.item_name}
                  </p>
                  <p style={{ color: '#565250' }}>
                    <span style={{ color: '#291E15' }} className="font-medium">Timeline:</span>{" "}
                    {submittedData.urgency}
                  </p>
                </div>
              </div>
            )}

            <Button
              size="lg"
              className="mb-6"
              style={{ background: '#6B6B6B', color: '#FFFFFF' }}
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
                className="text-sm transition-colors duration-500 border-b pb-0.5"
                style={{ color: '#866758', borderColor: 'rgba(134,103,88,0.3)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#6b5345'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#866758'; }}
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
    <section id="request" className="py-32 md:py-44 relative" ref={formRef} style={{ background: '#E9E4DE' }}>
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
            <p className="text-[15px] font-light" style={{ color: '#565250' }}>
              Share your wishlist and our concierge will respond with options.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative rounded-lg"
              style={{
                background: '#F5F2EE',
                border: '1px solid rgba(134,103,88,0.15)',
                padding: '60px',
                boxShadow: '0 20px 60px rgba(41,30,21,0.08)'
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

              {/* Contact Info */}
              <div className="mb-8">
                <h3 className="text-xs tracking-editorial uppercase mb-6" style={{ color: '#928377' }}>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" className="h-12" style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }} {...field} />
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
                        <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>WhatsApp *</FormLabel>
                        <FormControl>
                          <Input placeholder="+971 50 123 4567" className="h-12" style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }} {...field} />
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
                        <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Email (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" className="h-12" style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }} {...field} />
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
                        <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="Dubai, UAE" className="h-12" style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }} {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Request Details */}
              <div className="mb-8 pt-8" style={{ borderTop: '1px solid rgba(134,103,88,0.15)' }}>
                <h3 className="text-xs tracking-editorial uppercase mb-6" style={{ color: '#928377' }}>
                  Request Details
                </h3>
                
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="request_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Request Type *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12" style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }}>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.2)' }}>
                            {requestTypes.map((type) => (
                              <SelectItem key={type} value={type} style={{ color: '#291E15' }}>
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
                          <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Brand *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Hermès" className="h-12" style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }} {...field} />
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
                          <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Item / Model *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Birkin 25" className="h-12" style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }} {...field} />
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
                          <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Category *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12" style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }}>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.2)' }}>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat} style={{ color: '#291E15' }}>
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
                          <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Timeline *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12" style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }}>
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.2)' }}>
                              {urgencyOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value} style={{ color: '#291E15' }}>
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
                        <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Specifications (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Size, colour, hardware, material..."
                            className="resize-none min-h-[100px]"
                            style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }}
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
              <div className="mb-8 pt-8" style={{ borderTop: '1px solid rgba(134,103,88,0.15)' }}>
                <h3 className="text-xs tracking-editorial uppercase mb-6" style={{ color: '#928377' }}>
                  Budget (optional)
                </h3>
                <div className="grid grid-cols-3 gap-5">
                  <FormField
                    control={form.control}
                    name="budget_min"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Min</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" className="h-12" style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }} {...field} />
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
                        <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Max</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" className="h-12" style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }} {...field} />
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
                        <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Currency</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12" style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }}>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.2)' }}>
                            <SelectItem value="AED" style={{ color: '#291E15' }}>AED</SelectItem>
                            <SelectItem value="USD" style={{ color: '#291E15' }}>USD</SelectItem>
                            <SelectItem value="EUR" style={{ color: '#291E15' }}>EUR</SelectItem>
                            <SelectItem value="GBP" style={{ color: '#291E15' }}>GBP</SelectItem>
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
                      <FormLabel className="text-xs font-medium tracking-wide" style={{ color: '#565250' }}>Reference Links (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste URLs, one per line"
                          className="resize-none min-h-[80px]"
                          style={{ background: '#FFFFFF', border: '1px solid rgba(134,103,88,0.25)', color: '#291E15' }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Consent */}
              <div className="mb-8 pt-8" style={{ borderTop: '1px solid rgba(134,103,88,0.15)' }}>
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          style={{ borderColor: 'rgba(134,103,88,0.4)' }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal" style={{ color: '#565250' }}>
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
                size="lg"
                className="w-full h-[60px] text-[14px] uppercase font-semibold rounded-sm"
                style={{
                  background: '#6B6B6B',
                  color: '#FFFFFF',
                  letterSpacing: '2.5px',
                }}
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
