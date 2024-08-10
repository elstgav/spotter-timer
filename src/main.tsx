import { App } from '$src/components/App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeWrapper } from './styles/ThemeWrapper'

const root = document.getElementById('root')

if (!root) throw new Error('Unable to find required #root element')

createRoot(root).render(
  <StrictMode>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </StrictMode>,
)
