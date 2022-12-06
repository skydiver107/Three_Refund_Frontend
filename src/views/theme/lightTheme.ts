import { createTheme, responsiveFontSizes } from "@mui/material";

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    ss: true;
    xs: true;
    ts: true,
    sm: true;
    tm: true;
    md: true;
    td: true;
    lg: true;
    tg: true;
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
      main: string,
      paper: string,
      contrast: string,
      grey: string,
      bright: string,
      common: string,
      border: string
    }
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      ss: 360,
      xs: 480,
      ts: 560,
      sm: 768,
      tm: 896,
      md: 1024,
      td: 1280,
      lg: 1366,
      tg: 1440,
      xl: 1600,
      sl: 1800
    }
  },
  components: {

  },
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    h1: {
      lineHeight: 1,
    },
    h2: {
      fontSize: `4rem`, // 64
      fontWeight: 700,
      lineHeight: 1,
      '@media (min-width: 360px)': {
        fontSize: '3.25rem',
      },
      '@media (min-width: 480px)': {
        fontSize: '3.5rem',
      },
      '@media (min-width: 768px)': {
        fontSize: '4rem',
      },
      '@media (min-width: 1024px)': {
        fontSize: '4rem',
      },
      '@media (min-width: 1366px)': {
        fontSize: '4rem',
      },
      '@media (min-width: 1440px)': {
        fontSize: '4rem',
      },
      '@media (min-width: 1600px)': {
        fontSize: '4rem',
      },
      '@media (min-width: 1800px)': {
        fontSize: '4rem',
      },
    },
    h3: {
      lineHeight: 1
    },
    h4: {
      fontSize: `2.75rem`, // 42
      lineHeight: 1,
      '@media (min-width: 360px)': {
        fontSize: '2.25rem',
      },
      '@media (min-width: 480px)': {
        fontSize: '2.25rem',
      },
      '@media (min-width: 768px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width: 896px)': {
        fontSize: '2.75rem',
      },
      '@media (min-width: 1024px)': {
        fontSize: '2.75rem',
      },
      '@media (min-width: 1280px)': {
        fontSize: '2.75rem',
      },
      '@media (min-width: 1366px)': {
        fontSize: '2.75rem',
      },
      '@media (min-width: 1440px)': {
        fontSize: '2.75rem',
      },
      '@media (min-width: 1600px)': {
        fontSize: '2.75rem',
      },
      '@media (min-width: 1800px)': {
        fontSize: '2.75rem',
      },
    },
    h5: {
      lineHeight: 1
    },
    h6: {
      lineHeight: 1
    },
    subtitle1: {
      fontSize: `1.75rem`, // 28
      lineHeight: 1,
      '@media (min-width: 360px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width: 480px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width: 768px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width: 1024px)': {
        fontSize: '1.75rem',
      },
      '@media (min-width: 1366px)': {
        fontSize: '1.75rem',
      },
      '@media (min-width: 1440px)': {
        fontSize: '1.75rem',
      },
      '@media (min-width: 1600px)': {
        fontSize: '1.75rem',
      },
      '@media (min-width: 1800px)': {
        fontSize: '1.75rem',
      },
    },
    subtitle2: {
      fontSize: `1.5rem`, // 24
      lineHeight: 1,
      '@media (min-width: 360px)': {
        fontSize: '1rem',
      },
      '@media (min-width: 480px)': {
        fontSize: '1rem',
      },
      '@media (min-width: 768px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width: 896px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width: 1024px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width: 1366px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width: 1440px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width: 1600px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width: 1800px)': {
        fontSize: '1.5rem',
      },
    },
    body1: {
      fontSize: `1.25rem`, // 20
      '@media (min-width: 360px)': {
        fontSize: '0.875rem',
      },
      '@media (min-width: 480px)': {
        fontSize: '0.875rem',
      },
      '@media (min-width: 768px)': {
        fontSize: '1rem',
      },
      '@media (min-width: 1024px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width: 1366px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width: 1440px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width: 1600px)': {
        fontSize: '1.25rem',
      },
      '@media (min-width: 1800px)': {
        fontSize: '1.25rem',
      },
    },
    body2: {
      fontSize: `0.875rem`, // 14
      lineHeight: 1,
      '@media (min-width: 360px)': {
        fontSize: '0.7rem',
      },
      '@media (min-width: 480px)': {
        fontSize: '0.7rem',
      },
      '@media (min-width: 768px)': {
        fontSize: '0.75rem',
      },
      '@media (min-width: 1024px)': {
        fontSize: '0.875rem',
      },
      '@media (min-width: 1366px)': {
        fontSize: '0.875rem',
      },
      '@media (min-width: 1440px)': {
        fontSize: '0.875rem',
      },
      '@media (min-width: 1600px)': {
        fontSize: '0.875rem',
      },
      '@media (min-width: 1800px)': {
        fontSize: '0.875rem',
      },
    }
  },
  palette: {
    text: {
      primary: `#0D0D0D`
    },
    background: {
      default: `#FFFFFF`,
      paper: `#A58BE4`
    },
    neutral: {
      main: '#000000',
      paper: `#1E1E1E`,
      grey: `#6B6B6B`,
      contrast: `#0D0D0D`,
      bright: `#FFFFFF`,
      common: `#F0F6F6`,
      border: `#FFFFFF`
    },
  },
});

// const lightTheme = responsiveFontSizes(theme, { factor: 3 });
export default theme;
