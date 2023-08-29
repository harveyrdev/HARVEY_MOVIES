/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend:    
    {
     
    }, 
    fontFamily:{
        sans:['Poppins', 'sans-serif']
      },
  },
  plugins: [ require('flowbite/plugin')],
};
