import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "'Playfair Display'", "serif"],
        display: ["'Playfair Display'", "serif"],
        "serif-italic": ["'Cormorant Garamond'", "serif"],
        sans: ["'Montserrat'", "system-ui", "sans-serif"],
      },
      spacing: {
        '13': '3.25rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '32': '8rem',
        '36': '9rem',
      },
      fontSize: {
        'hero': ['clamp(3rem, 7vw, 5.5rem)', { lineHeight: '1.1', letterSpacing: '0.05em' }],
        'hero-mobile': ['clamp(2.25rem, 10vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '0.03em' }],
        'display': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '0.03em' }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand Colors
        ivory: {
          DEFAULT: "#E9EADE",
        },
        taupe: {
          DEFAULT: "#866758",
        },
        sage: {
          DEFAULT: "#928377",
        },
        charcoal: {
          DEFAULT: "#565250",
        },
        espresso: {
          DEFAULT: "#291E15",
        },
        clutch: {
          ivory: "hsl(var(--clutch-ivory))",
          taupe: "hsl(var(--clutch-taupe))",
          sage: "hsl(var(--clutch-sage))",
          charcoal: "hsl(var(--clutch-charcoal))",
          espresso: "hsl(var(--clutch-espresso))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 1px)",
        sm: "calc(var(--radius) - 2px)",
      },
      boxShadow: {
        'sage': '0 0 40px rgba(146, 131, 119, 0.4)',
        'sage-soft': '0 0 30px rgba(146, 131, 119, 0.2)',
        'luxury': '0 10px 40px rgba(0, 0, 0, 0.4)',
        'luxury-lg': '0 20px 60px rgba(0, 0, 0, 0.5)',
        'hover-lift': '0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(146, 131, 119, 0.15)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-up": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 30px rgba(146, 131, 119, 0.25)" },
          "50%": { boxShadow: "0 0 50px rgba(146, 131, 119, 0.4)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scroll-float": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "fade-in": "fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "scale-up": "scale-up 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scroll-float": "scroll-float 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;