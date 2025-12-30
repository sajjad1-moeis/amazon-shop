/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-iran-sans)", "sans-serif"],
      },
      screens: {
        xs: "390px",
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1350px",
        "2xl": "1499px",
        "max-sm": {
          max: "575px",
        },
        "max-md": {
          max: "767px",
        },
        "max-lg": {
          max: "1023px",
        },
        "max-xl": {
          max: "1207px",
        },
        "max-2xl": {
          max: "1443px",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "16px",
        },
        screens: {
          sm: "576px",
          md: "768px",
          lg: "1024px",
          xl: "1350px",
          "2xl": "1500px",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        dark: {
          header: "#202020",
          title: "#B3B3FF",
          box: "#373737",
          text: "#A7A4A4",
          bg: "#262626",
          titre: "#D2D2D2",
          field: "#484848",
          stroke: "#686869",
          primary: "#3F51B5",
          green: "#426F5B",
          blue: "#4F5F70",
          yellow: "#71653E",
          "gray-primary": "#494B56",
        },
        red: {
          400: "#F98080",
          500: "#F05252",
        },
        gray: {
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
        },

        yellow: {
          400: "#FFCD38",
          500: "#F9CE2E",
          600: "#D19D00",
          700: "#9D7600",
        },
        neutral: {
          100: "#E8E8E8",
          300: "#A1A1A1",
          400: "#636363",
          800: "#212121",
        },
        warning: {
          400: "#FFCD38",
          500: "#FFA726",
          600: "#d19d00",
        },
        info: {
          200: "#ADD3F2",
          500: "#2196F3",
        },
        green: {
          200: "#BCF0DA",
          500: "#23A26D",
          600: "#057A55",
        },
        titre: "#2D323A",
        caption: "#888A8C",
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
          50: "#EDEFF7",
          100: "#DBDEEF",
          200: "#B6BCDF",
          300: "#8995D6",
          400: "#6171C8",
          500: "#0B2A9C",
          600: "#324191",
          700: "#26316D",
          800: "#1C2247",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          700: "#9D7600",
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
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      spacing: {
        4.5: "18px",
        22: "88px",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
