import { useTimer } from '$src/hooks/useTimer'
import { ONE_MINUTE } from '$src/lib/datetime-helpers'
import { Pause, PlayArrow } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { Button, Card, CardContent, IconButton, Typography } from '@mui/material'
import { useId } from 'react'
import styles from './Timer.module.scss'
import { TimerDisplayAndInput, TimerInputProps } from './TimerDisplayAndInput'

export interface TimerProps {
  /** @default 'Timer' */
  title?: string
  onClose?: () => void
}

export const Timer = ({ onClose, title = 'Timer' }: TimerProps) => {
  const titleId = useId()
  const {
    duration,
    setDuration,
    isRunning,
    setIsRunning,
    isDone,
    remainingTime,
    setRemainingTime,
    addTime,
    resetTimer,
  } = useTimer()

  const onCloseClick = () => onClose?.()

  const onDurationChangeStart = () => {
    setIsRunning(false)
  }

  const onDurationChange: TimerInputProps['onDurationChange'] = (newDuration) => {
    setDuration(newDuration)
    setRemainingTime(newDuration)
  }

  const onRemainingTimeChange: TimerInputProps['onRemainingTimeChange'] = (newRemainingTime) => {
    setRemainingTime(newRemainingTime)
  }

  const onAddMinuteClick = () => addTime(ONE_MINUTE)
  const onPlayPauseClick = () => setIsRunning((prevState) => !prevState)
  const onResetClick = resetTimer

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
          duration={duration}
          isDone={isDone}
          remainingTime={remainingTime}
          aria-labelledby={titleId}
          onDurationChangeStart={onDurationChangeStart}
          onDurationChange={onDurationChange}
          onRemainingTimeChange={onRemainingTimeChange}
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
          aria-label={isRunning ? 'Pause' : 'Play'}
          onClick={onPlayPauseClick}
        >
          {isRunning ? <Pause /> : <PlayArrow />}
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
