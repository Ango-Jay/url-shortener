/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ink: "#090040",
        lightPurple: "#b030b0",
        darkPurple: "#202040",
        surface: "#ffffff",
        night: "#0c0630",
        nightRaised: "#160d45",
        nightBorder: "#2a2160",
      },
      fontFamily: {
        display: ['"Inter"', "system-ui", "sans-serif"],
        heading: ['"Sora"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
