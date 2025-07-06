import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
// import type { StyleFunctionProps } from './theme-tools'; 

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: 'var(--font-geist-sans)',
    body: 'var(--font-geist-sans)',
  },
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    modes: {
      teen: {
        primary: '#9B59B6',
        secondary: '#1ABC9C',
        accent: '#E74C3C',
        background: '#F8F9FA',
        surface: '#FFFFFF',
        text: '#2C3E50',
      },
      university: {
        primary: '#3498DB',
        secondary: '#2ECC71',
        accent: '#F39C12',
        background: '#FAFBFC',
        surface: '#FFFFFF',
        text: '#34495E',
      }
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
      variants: {
        solid: {
          borderRadius: 'lg',
          fontWeight: 'semibold',
        },
        ghost: {
          borderRadius: 'lg',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          border: '1px solid',
          borderColor: 'gray.200',
          _dark: {
            borderColor: 'gray.700',
          },
        },
      },
    },
    Badge: {
      variants: {
        subtle: {
          borderRadius: 'full',
          px: 3,
          py: 1,
          fontSize: 'xs',
          fontWeight: 'medium',
        },
      },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
});