import { createTheme, responsiveFontSizes } from "@mui/material";

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    ss: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    sl: true;
  }
  interface Palette {
    neutral: {
      main: string,
      paper: string,
      contrast: string,
      grey: string,
      bright: string,
      common: string,
      border: string
    }
  }
  interface PaletteOptions {
    neutral?: {
      main: string, // 1 line
      paper: string, // 3 lines
      contrast: string, //1 star
      grey: string, // 2 starts
      bright: string, // 3 stars
      common: string,
      border: string
    }
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      ss: 360,
      xs: 481,
      sm: 769,
      md: 1025,
      lg: 1367,
      xl: 1601,
      sl: 1801
    }
  },
  components: {

  },
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    h1: {

    },
    h2: {
      fontSize: `4rem`, // 64
      fontWeight: 700
    },
    h3: {

    },
    h4: {
      fontSize: `2.75rem` // 42
    },
    h5: {

    },
    h6: {

    },
    subtitle1: {
      fontSize: `1.75rem` // 28
    },
    subtitle2: {
      fontSize: `1.5rem` // 24
    },
    body1: {
      fontSize: `1.25rem`, // 20
    },
    body2: {
      fontSize: `0.875hrem` // 14
    }
  },
  palette: {
    mode: `dark`,
    text: {
      primary: `#3C0000`, // 2 lines
    },
    background: {
      default: `#FFFFFF`,
      paper: `#A58BE4`
    },
    neutral: {
      main: '#FFFFFF',
      paper: `#1E1E1E`,
      grey: `#6B6B6B`,
      contrast: `#ED3D61`,
      bright: `#FFFFFF`,
      common: `#FFFFFF`,
      border: `#FFFFFF`
    },
  },
});

const lightTheme = responsiveFontSizes(theme, { factor: 3 });
export default lightTheme;
