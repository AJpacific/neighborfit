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
        'primary': {
          DEFAULT: '#2D7D32', // green-800
          50: '#E8F5E8', // green-50
          100: '#C8E6C9', // green-100
          200: '#A5D6A7', // green-200
          300: '#81C784', // green-300
          400: '#66BB6A', // green-400
          500: '#4CAF50', // green-500
          600: '#43A047', // green-600
          700: '#388E3C', // green-700
          800: '#2E7D32', // green-800
          900: '#1B5E20', // green-900
          foreground: '#FFFFFF', // white
        },
        // Secondary Colors
        'secondary': {
          DEFAULT: '#FF8A65', // deep-orange-300
          50: '#FFF3E0', // orange-50
          100: '#FFE0B2', // orange-100
          200: '#FFCC80', // orange-200
          300: '#FFB74D', // orange-300
          400: '#FFA726', // orange-400
          500: '#FF9800', // orange-500
          600: '#FB8C00', // orange-600
          700: '#F57C00', // orange-700
          800: '#EF6C00', // orange-800
          900: '#E65100', // orange-900
          foreground: '#FFFFFF', // white
        },
        // Accent Colors
        'accent': {
          DEFAULT: '#1976D2', // blue-700
          50: '#E3F2FD', // blue-50
          100: '#BBDEFB', // blue-100
          200: '#90CAF9', // blue-200
          300: '#64B5F6', // blue-300
          400: '#42A5F5', // blue-400
          500: '#2196F3', // blue-500
          600: '#1E88E5', // blue-600
          700: '#1976D2', // blue-700
          800: '#1565C0', // blue-800
          900: '#0D47A1', // blue-900
          foreground: '#FFFFFF', // white
        },
        // Background Colors
        'background': {
          DEFAULT: '#FAFAFA', // gray-50
          secondary: '#F5F5F5', // gray-100
          tertiary: '#EEEEEE', // gray-200
        },
        // Surface Colors
        'surface': {
          DEFAULT: '#FFFFFF', // white
          secondary: '#F9F9F9', // gray-50
          tertiary: '#F5F5F5', // gray-100
        },
        // Text Colors
        'text': {
          primary: '#212121', // gray-800
          secondary: '#757575', // gray-600
          tertiary: '#9E9E9E', // gray-500
          disabled: '#BDBDBD', // gray-400
          inverse: '#FFFFFF', // white
        },
        // Status Colors
        'success': {
          DEFAULT: '#388E3C', // green-700
          50: '#E8F5E8', // green-50
          100: '#C8E6C9', // green-100
          200: '#A5D6A7', // green-200
          foreground: '#FFFFFF', // white
        },
        'warning': {
          DEFAULT: '#F57C00', // orange-700
          50: '#FFF8E1', // amber-50
          100: '#FFECB3', // amber-100
          200: '#FFE082', // amber-200
          foreground: '#FFFFFF', // white
        },
        'error': {
          DEFAULT: '#D32F2F', // red-700
          50: '#FFEBEE', // red-50
          100: '#FFCDD2', // red-100
          200: '#EF9A9A', // red-200
          foreground: '#FFFFFF', // white
        },
        // Border Colors
        'border': {
          DEFAULT: '#E0E0E0', // gray-300
          secondary: '#EEEEEE', // gray-200
          tertiary: '#F5F5F5', // gray-100
        },
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Source Sans Pro', 'system-ui', 'sans-serif'],
        'caption': ['Roboto', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'elevation-1': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'elevation-2': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'elevation-3': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'elevation-4': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'smooth': 'ease-out',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}