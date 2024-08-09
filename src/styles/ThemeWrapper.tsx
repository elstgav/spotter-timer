import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { PropsWithChildren } from 'react'
import { theme } from 'styles/theme'

export const ThemeWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
    </ThemeProvider>
  )
}
