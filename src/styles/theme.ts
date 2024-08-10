import { createTheme } from '@mui/material/styles'

import '@fontsource-variable/inter' // Adds font stylesheets
import tokens from './design-tokens.module.scss'

const stripUnit = (str: unknown) => Number.parseInt(str as string, 10)

export const theme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: tokens.textColor,
    },
    background: {
      default: tokens.surfaceColorDarkest,
      paper: tokens.surfaceColor,
    },

    primary: {
      main: tokens.surfaceColorDarkest,
    },

    secondary: {
      main: tokens.textColor,
    },
  },
  shape: {
    borderRadius: stripUnit(tokens.borderRadius),
  },
  typography: {
    fontFamily: tokens.fontFamily,
    fontSize: stripUnit(tokens.fontSizeBase),

    fontWeightRegular: tokens.fontWeightRegular,
    fontWeightMedium: tokens.fontWeightMedium,

    h1: {
      fontSize: tokens.h1FontSize,
      fontWeight: tokens.h1FontWeight,
    },
    h2: {
      fontSize: tokens.h2FontSize,
      fontWeight: tokens.h2FontWeight,
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontWeight: tokens.fontWeightRegular,
          textTransform: 'initial',
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: tokens.iconButtonTextColor,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '1.1em',
        },
      },
    },
  },
})
