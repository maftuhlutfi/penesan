module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'cust-purple': '#F54646',
        'cust-cyan': '#72E2EE',
        'cust-red': '#F54646',
        'text-primary': '#191D33',
        'light-pink': '#FEDCF7',
        'text-secondary': '#606375',
        'light-purple': '#868AD8',
        'more-light-purple': '#FCEEEC',
        'bg-purple': '#FFF8F8',
        'cust-yellow': '#FFE37D'
      },
      boxShadow: {
        'purple': '0px 10px 0px #E01C1C',
        'purple-btn': '0px 10px 0px #E01C1C',
        'red': '0px 10px 0px #E01C1C',
        'quiz-card': '0px 12px 0px #FBD3D3',
        'green': '0px 10px 0px #0C9C6C'
      }
    },
    fontFamily: {
      'sans': ['Poppins']
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
