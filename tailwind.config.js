/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite/**/*.js',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    
  ],
  darkMode: 'media',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        '95vh':'95vh',
        '85vh':'85vh',
        '612' :'38.313rem',
        'w' : '-webkit-fill-available'
      },
      zIndex: {
        '100':'100'
      },
      inset:{
        '35':'35%',
        '30':'30%'
      },
      start:{
        '30':'30%',
        '35':'35%',
        
      },
      colors: {
        'smoke': '#00000099',
      },
      borderWidth: {
        '1' : '1px'
      },
      width: {
        'w': '-webkit-fill-available',
        '17':'4.1rem',
        '57.5':'57.5rem'
      },
      padding: {
        '18': '4.4rem'
      }
      
      
    },
  },
  fontFamily: {
    'body': [
      'Inter', 
      'ui-sans-serif', 
      'system-ui', 
      '-apple-system', 
      'system-ui', 
      'Segoe UI', 
      'Roboto', 
      'Helvetica Neue', 
      'Arial', 
      'Noto Sans', 
      'sans-serif', 
      'Apple Color Emoji', 
      'Segoe UI Emoji', 
      'Segoe UI Symbol', 
      'Noto Color Emoji'
      ],
        'sans': [
      'Inter', 
      'ui-sans-serif', 
      'system-ui', 
      '-apple-system', 
      'system-ui', 
      'Segoe UI', 
      'Roboto', 
      'Helvetica Neue', 
      'Arial', 
      'Noto Sans', 
      'sans-serif', 
      'Apple Color Emoji', 
      'Segoe UI Emoji', 
      'Segoe UI Symbol', 
      'Noto Color Emoji'
    ]
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    }),
  ],
}

