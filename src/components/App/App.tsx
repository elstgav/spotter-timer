import { Timer } from '$src/components/Timer'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { main } from './App.module.scss'

export const App = () => {
  const [open, setOpen] = useState(true)

  const onTimerOpenClick = () => setOpen(true)

  return (
    <Box className={main} component="main">
      {open ? (
        <Timer onClose={() => setOpen(false)} />
      ) : (
        <Button variant="outlined" color="secondary" onClick={onTimerOpenClick}>
          Create Timer
        </Button>
      )}
    </Box>
  )
}
