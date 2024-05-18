import { red } from '@mui/material/colors';
import { createTheme, ThemeOptions } from '@mui/material/styles';

// Define the theme options
const themeOptions: ThemeOptions = {
  palette: {
    primary: { main: '#0280BE' },
    secondary: {
      main: '#0280BE',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
};

// Create a custom theme for this app
const theme = createTheme(themeOptions);

export default theme;
