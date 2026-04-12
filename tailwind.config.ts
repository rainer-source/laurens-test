import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:    '#F9F0EB',
        blush:    '#F0E4DC',
        linen:    '#D9C9BF',
        petal:    '#E8D5C8',
        clay:     '#C4A090',
        sienna:   '#A68272',
        rosewood: '#8B6F5E',
        mahogany: '#6B4035',
        espresso: '#4A2E22',
        bark:     '#2C1610',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        dancing:   ['var(--font-dancing)', 'cursive'],
        jost:      ['var(--font-jost)', 'sans-serif'],
        sans:      ['var(--font-jost)', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
      },
    },
  },
  plugins: [],
}

export default config
