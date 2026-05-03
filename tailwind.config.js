/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        secondary: "#F97316",
        darkBg: "#0B1120",
        cardBg: "rgba(15, 23, 42, 0.6)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hoora-blue': 'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(30,58,138,0.9))',
        'hoora-purple': 'linear-gradient(135deg, rgba(168,85,247,0.9), rgba(88,28,135,0.9))',
        'hoora-green': 'linear-gradient(135deg, rgba(34,197,94,0.9), rgba(20,83,45,0.9))',
        'hoora-pink': 'linear-gradient(135deg, rgba(236,72,153,0.9), rgba(131,24,67,0.9))',
        'hoora-orange': 'linear-gradient(135deg, rgba(249,115,22,0.9), rgba(124,45,18,0.9))',
        'hoora-red': 'linear-gradient(135deg, rgba(239,68,68,0.9), rgba(127,29,29,0.9))',
        'hoora-teal': 'linear-gradient(135deg, rgba(20,184,166,0.9), rgba(19,78,74,0.9))',
        'hoora-indigo': 'linear-gradient(135deg, rgba(99,102,241,0.9), rgba(49,46,129,0.9))',
      }
    },
  },
  plugins: [],
}
