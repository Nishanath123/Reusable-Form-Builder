/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
// Tailwind CSS Styles (global.css or inside a Tailwind config file)
const inputStyle = "w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-400";
const buttonStyle = "w-full p-2 text-white rounded hover:opacity-80";

export { inputStyle, buttonStyle };
