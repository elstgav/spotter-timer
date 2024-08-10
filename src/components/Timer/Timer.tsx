import { useTimer } from '$src/hooks/useTimer'
import { ONE_MINUTE } from '$src/lib/datetime-helpers'
import { Pause, PlayArrow } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { Button, Card, CardContent, IconButton, Typography } from '@mui/material'
import { useId } from 'react'
import styles from './Timer.module.scss'
import { TimerDisplayAndInput } from './TimerDisplayAndInput'

export interface TimerProps {
  /** @default 'Timer' */
  title?: string
  onClose?: () => void
}

export const Timer = ({ onClose, title = 'Timer' }: TimerProps) => {
  const titleId = useId()
  const timer = useTimer()

  const onCloseClick = () => onClose?.()

  const onAddMinuteClick = () =>
    timer.dispatch({
      type: 'CHANGE',
      duration: timer.duration + ONE_MINUTE,
      remainingTime: timer.remainingTime + ONE_MINUTE,
    })

  const onPlayPauseClick = () => timer.dispatch({ type: !timer.isRunning ? 'PLAY' : 'PAUSE' })
  const onResetClick = () => timer.dispatch({ type: 'RESET' })

  return (
    <Card component="section" className={styles.timerCard} aria-labelledby={titleId}>
      <CardContent className={styles.title}>
        <Typography id={titleId} variant="h2" className={styles.titleText}>
          {title}
        </Typography>
        <IconButton
          className={styles.close}
          aria-label="close"
          edge="end"
          onClick={onCloseClick}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </CardContent>
      <CardContent className={styles.body}>
        <TimerDisplayAndInput
          className={styles.timerInput}
          aria-labelledby={titleId}
          timer={timer}
        />

        <Button
          className={styles.addButton}
          variant="text"
          color="secondary"
          onClick={onAddMinuteClick}
        >
          +1:00
        </Button>

        <Button
          variant="contained"
          className={styles.playPauseButton}
          aria-label={timer.isRunning ? 'Pause' : 'Play'}
          onClick={onPlayPauseClick}
        >
          {timer.isRunning ? <Pause /> : <PlayArrow />}
        </Button>

        <Button
          className={styles.resetButton}
          variant="text"
          color="secondary"
          onClick={onResetClick}
        >
          Reset
        </Button>
      </CardContent>
    </Card>
  )
}
