// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
  colors: {
    brand: {
      500: '#cdb4db',
      400: '#ffc8dd',
      300: '#ffafcc',
      200: '#bde0fe',
      100: '#a2d2ff',
    },
  },
};

// 3. extend the theme
const theme = extendTheme(config);

export default theme;
