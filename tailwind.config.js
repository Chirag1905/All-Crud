/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-color-gray": "#f7fafc", // You can replace this with your desired color
      },
      spacing: {
        "10vw": "10vw",
        "15vw": "15vw",
      },
    },
  },              
  plugins: [],
};
