import type { Config } from "tailwindcss";

/**
 * Tokens Luma Leads — source de vérité : DESIGN.md (étape 4).
 * Aucun hex ne doit apparaître dans les composants : utiliser les noms sémantiques.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        // ——— Palette Luma (sémantique) ———
        navy: {
          DEFAULT: "#1B3A5C",
          deep: "#16304C",
          tint: "#E4EAF1",
        },
        gold: {
          DEFAULT: "#C9A84C",
          deep: "#8F7330",
          tint: "#F5EBCF",
        },
        cream: "#F5F0E8",
        paper: "#FFFFFF",
        ink: {
          DEFAULT: "#0F1B2D",
          muted: "#5B6675",
        },
        line: "#E3DDD2",
        danger: "#B4443E",
        // Statuts : fond (bg) + texte (fg), toujours texte + couleur, jamais couleur seule
        status: {
          neutral: { bg: "#EEEBE5", fg: "#5B6675" },
          navy: { bg: "#E4EAF1", fg: "#1B3A5C" },
          amber: { bg: "#F1E7D3", fg: "#7A5A1E" },
          green: { bg: "#DCEBE2", fg: "#1F5A3C" },
          teal: { bg: "#DCE8EA", fg: "#1F5058" },
          red: { bg: "#F0DEDC", fg: "#8A2E29" },
        },
        // ——— Mapping shadcn/ui → tokens Luma (variables HSL dans globals.css) ———
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      // Échelle tierce majeure (1,25) — rien au-dessus de 39px sur un dashboard
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["20px", { lineHeight: "28px" }],
        xl: ["25px", { lineHeight: "32px" }],
        "2xl": ["31px", { lineHeight: "36px" }],
        "3xl": ["39px", { lineHeight: "44px" }],
      },
      // Grille 8px ; 4 et 12 réservés à l'intérieur des pastilles/cellules
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
        "8": "32px",
        "12": "48px",
        "16": "64px",
        row: "44px",
        sidebar: "224px",
        bottomnav: "56px",
      },
      // Radius plafonné à 8px ; pastilles en full
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "6px",
        md: "6px",
        lg: "8px",
        xl: "8px",
        "2xl": "8px",
        full: "9999px",
      },
      // Aucune ombre par défaut ; une seule pour ce qui flotte
      boxShadow: {
        none: "none",
        elevated: "0 8px 24px -8px rgb(15 27 45 / 0.18)",
      },
      transitionDuration: {
        micro: "120ms",
        standard: "240ms",
        reveal: "400ms",
      },
      transitionTimingFunction: {
        luma: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        content: "1440px",
      },
      letterSpacing: {
        label: "0.04em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
