/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:    '#010810',
        deep:   '#020d1a',
        abyss:  '#000508',
        mid:    '#041e3a',
        surf:   '#0a4f6e',
        lite:   '#1a8fa8',
        foam:   '#c8eef7',
        biolum: '#00f5d4',
        gold:   '#d4a847',
      },
      fontFamily: {
        serif: ['Cormorant Garamond','Georgia','serif'],
        mono:  ['Space Mono','monospace'],
      },
    },
  },
  plugins: [],
};
