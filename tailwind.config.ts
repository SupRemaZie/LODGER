// tailwind.config.ts
import type { Config } from "tailwindcss"
import forms from "@tailwindcss/forms"           // ✅ ESM (évite require)
import { heroui } from "@heroui/react"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", // ✅ nécessaire
    ],
    darkMode: "class",
    theme: {
        extend: {
            gridTemplateColumns: {
                13: "repeat(13, minmax(0, 1fr))",
            },
            colors: {
                blue: {
                    400: "#2589FE",
                    500: "#0070F3",
                    600: "#2F6FEB",
                },
                dashboard: "#FAFAFA",
                "dashboard-separator": "#E3E3E3",

                // ✅ ta palette primaire (tu peux ajouter d’autres nuances)
                primary: {
                    50:  "#E6F0EF",
                    100: "#02504D",    // <- ta couleur utilisée dans tes classes
                    200: "#014D4A",
                    DEFAULT: "#02504D" // utile pour les classes `text-primary`, etc.
                },
            },

            // ⚠️ en v4, place bien keyframes dans `extend`
            keyframes: {
                shimmer: { "100%": { transform: "translateX(100%)" } },
            },
        },
    },

    // ✅ HeroUI + forms (assure-toi d’avoir @tailwindcss/forms >= 0.6)
    plugins: [
        forms(),
        heroui({
            // (optionnel mais pratique) on aligne le thème HeroUI sur ta couleur
            themes: {
                light: {
                    colors: {
                        primary: {
                            DEFAULT: "#02504D",
                        },
                    },
                },
                dark: {
                    colors: {
                        primary: {
                            DEFAULT: "#02504D",
                        },
                    },
                },
            },
        }),
    ],
}
export default config
