/** @type {import('tailwindcss').Config} */
export default  {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"], // Include all JSX files
  theme: {
    extend: {
      fontFamily: {
        devonshire: ["Devonshire", "cursive"], // Add custom font
      },
    },
  },
  plugins: [],
};

