/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#8B4513', // Warm saddle brown - brown-700
        'primary-50': '#F5F0E8', // Light brown tint
        'primary-100': '#E8D5C4', // Lighter brown
        'primary-200': '#D4B896', // Medium light brown
        'primary-300': '#C19A68', // Medium brown
        'primary-400': '#A67C4A', // Darker medium brown
        'primary-500': '#8B4513', // Base saddle brown
        'primary-600': '#7A3D11', // Darker brown
        'primary-700': '#68350F', // Deep brown
        'primary-800': '#562D0D', // Very dark brown
        'primary-900': '#44250B', // Darkest brown

        // Secondary Colors
        'secondary': '#DAA520', // Rich goldenrod - yellow-600
        'secondary-50': '#FDF8E8', // Light goldenrod tint
        'secondary-100': '#F9EDCC', // Lighter goldenrod
        'secondary-200': '#F3D999', // Medium light goldenrod
        'secondary-300': '#EDC566', // Medium goldenrod
        'secondary-400': '#E7B133', // Darker medium goldenrod
        'secondary-500': '#DAA520', // Base goldenrod
        'secondary-600': '#C4941D', // Darker goldenrod
        'secondary-700': '#AE831A', // Deep goldenrod
        'secondary-800': '#987217', // Very dark goldenrod
        'secondary-900': '#826114', // Darkest goldenrod

        // Accent Colors
        'accent': '#FF6B35', // Vibrant coral-orange - orange-500
        'accent-50': '#FFF2ED', // Light coral tint
        'accent-100': '#FFE0D1', // Lighter coral
        'accent-200': '#FFBFA3', // Medium light coral
        'accent-300': '#FF9E75', // Medium coral
        'accent-400': '#FF8455', // Darker medium coral
        'accent-500': '#FF6B35', // Base coral-orange
        'accent-600': '#E55A2B', // Darker coral
        'accent-700': '#CC4A21', // Deep coral
        'accent-800': '#B33A17', // Very dark coral
        'accent-900': '#992A0D', // Darkest coral

        // Background Colors
        'background': '#FFF8DC', // Soft cornsilk - yellow-50
        'background-50': '#FFFEF9', // Lightest cornsilk
        'background-100': '#FFF8DC', // Base cornsilk
        'background-200': '#FFF2C7', // Slightly darker cornsilk
        'background-300': '#FFECB2', // Medium cornsilk
        'background-400': '#FFE69D', // Darker cornsilk
        'background-500': '#FFE088', // Deep cornsilk

        // Surface Colors
        'surface': '#F5F5DC', // Subtle beige - stone-100
        'surface-50': '#FAFAF7', // Lightest beige
        'surface-100': '#F5F5DC', // Base beige
        'surface-200': '#F0F0C7', // Slightly darker beige
        'surface-300': '#EBEBB2', // Medium beige
        'surface-400': '#E6E69D', // Darker beige
        'surface-500': '#E1E188', // Deep beige

        // Text Colors
        'text-primary': '#2F2F2F', // Deep charcoal - gray-800
        'text-secondary': '#696969', // Medium gray - gray-500
        'text-tertiary': '#9CA3AF', // Light gray - gray-400
        'text-inverse': '#FFFFFF', // White text

        // Status Colors
        'success': '#228B22', // Forest green - green-700
        'success-50': '#ECFDF5', // Light green tint
        'success-100': '#D1FAE5', // Lighter green
        'success-200': '#A7F3D0', // Medium light green
        'success-300': '#6EE7B7', // Medium green
        'success-400': '#34D399', // Darker medium green
        'success-500': '#10B981', // Base green
        'success-600': '#228B22', // Forest green
        'success-700': '#047857', // Deep green
        'success-800': '#065F46', // Very dark green
        'success-900': '#064E3B', // Darkest green

        'warning': '#FF8C00', // Warm orange - orange-600
        'warning-50': '#FFF7ED', // Light orange tint
        'warning-100': '#FFEDD5', // Lighter orange
        'warning-200': '#FED7AA', // Medium light orange
        'warning-300': '#FDBA74', // Medium orange
        'warning-400': '#FB923C', // Darker medium orange
        'warning-500': '#F97316', // Base orange
        'warning-600': '#FF8C00', // Warm orange
        'warning-700': '#C2410C', // Deep orange
        'warning-800': '#9A3412', // Very dark orange
        'warning-900': '#7C2D12', // Darkest orange

        'error': '#DC143C', // Rich crimson - red-600
        'error-50': '#FEF2F2', // Light red tint
        'error-100': '#FEE2E2', // Lighter red
        'error-200': '#FECACA', // Medium light red
        'error-300': '#FCA5A5', // Medium red
        'error-400': '#F87171', // Darker medium red
        'error-500': '#EF4444', // Base red
        'error-600': '#DC143C', // Rich crimson
        'error-700': '#B91C1C', // Deep red
        'error-800': '#991B1B', // Very dark red
        'error-900': '#7F1D1D', // Darkest red

        // Border Colors
        'border': '#E6D7C3', // Muted border tone - stone-300
        'border-light': '#F3F0E8', // Light border
        'border-dark': '#D4C5B1', // Dark border
      },
      fontFamily: {
        'heading': ['Comfortaa', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'warm': '0 2px 4px rgba(139, 69, 19, 0.15)',
        'warm-md': '0 4px 8px rgba(139, 69, 19, 0.15)',
        'warm-lg': '0 8px 16px rgba(139, 69, 19, 0.15)',
        'warm-xl': '0 12px 24px rgba(139, 69, 19, 0.15)',
      },
      transitionTimingFunction: {
        'natural': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '450': '450ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '200': '200',
        '250': '250',
        '300': '300',
        '400': '400',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'pulse-glow': 'pulse-glow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px #FF6B35' },
          '50%': { boxShadow: '0 0 20px #FF6B35, 0 0 30px #FF6B35' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}