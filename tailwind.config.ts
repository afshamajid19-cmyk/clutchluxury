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
      },
    },
    extend: {
      fontFamily: {
        serif: ["'Playfair Display'", "'Cinzel'", "serif"],
        display: ["'Cinzel'", "'Playfair Display'", "serif"],
        sans: ["'Raleway'", "'Inter'", "system-ui", "sans-serif"],
      },
      spacing: {
        '13': '3.25rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '36': '9rem',
      },
      fontSize: {
        'hero': ['clamp(3.5rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
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
          soft: "hsl(var(--clutch-accent-soft))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        clutch: {
          bg: "hsl(var(--clutch-bg))",
          surface: "hsl(var(--clutch-surface))",
          elevated: "hsl(var(--clutch-elevated))",
          ink: "hsl(var(--clutch-ink))",
          muted: "hsl(var(--clutch-muted))",
          tertiary: "hsl(var(--clutch-tertiary))",
          accent: "hsl(var(--clutch-accent))",
          "accent-soft": "hsl(var(--clutch-accent-soft))",
          bronze: "hsl(var(--clutch-bronze))",
          border: "hsl(var(--clutch-border))",
        },
        taupe: {
          DEFAULT: "#8B7F74",
          light: "#A89B8E",
          dark: "#6B5E54",
          cream: "#F5EFE0",
          charcoal: "#3D3935",
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
        'taupe': '0 0 40px rgba(139, 127, 116, 0.4), inset 0 0 0 1px rgba(139, 127, 116, 0.6)',
        'taupe-soft': '0 0 30px rgba(139, 127, 116, 0.2)',
        'dramatic': '0 24px 64px -16px rgba(0, 0, 0, 0.85)',
        'cinematic': '0 16px 50px -12px rgba(0, 0, 0, 0.8), 0 0 60px -20px rgba(139, 127, 116, 0.2)',
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
          "0%": { opacity: "0", transform: "translateY(40px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-up": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 30px rgba(139, 127, 116, 0.3)" },
          "50%": { boxShadow: "0 0 50px rgba(139, 127, 116, 0.5)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-up": "scale-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
