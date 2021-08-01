module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'cust-purple': '#3639A6',
        'cust-cyan': '#72E2EE',
        'cust-red': '#F54646',
        'text-primary': '#191D33',
        'light-pink': '#FEDCF7',
        'text-secondary': '#606375',
        'light-purple': '#868AD8',
        'more-light-purple': '#DADBF6',
        'bg-purple': '#EFF0FC',
        'cust-yellow': '#FFE37D'
      },
      boxShadow: {
        'purple': '0px 10px 0px #868AD7',
        'purple-btn': '0px 10px 0px #2B2E8C',
        'red': '0px 10px 0px #E01C1C',
        'quiz-card': '0px 12px 0px #D3DCFB',
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
  plugins: [],
}
