import { createTheme } from '@mui/material/styles'

import '@fontsource-variable/inter' // Adds font stylesheets

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#273239',
      paper: '#546F7A',
    },
  },
  typography: {
    // prettier-ignore
    fontFamily: [
      'Inter',
      'system-ui',
      'Avenir',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
})
