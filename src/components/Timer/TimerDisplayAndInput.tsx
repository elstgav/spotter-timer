import { CircularInput } from '$src/components/CircularInput'
import { useTimer } from '$src/hooks/useTimer'
import { msToDurationString } from '$src/lib/string-helpers'
import { Box, Button, InputBase, Typography } from '@mui/material'
import clsx from 'clsx'
import {
  AriaAttributes,
  ComponentProps,
  FormEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from 'react'
import styles from './TimerDisplayAndInput.module.scss'

import { durationStringToMilliseconds } from '$src/lib/datetime-helpers'
import InputMask from 'react-input-mask'

export interface TimerInputProps extends AriaAttributes {
  className?: string
  timer: ReturnType<typeof useTimer>
}

export const TimerDisplayAndInput = ({ className, timer, ...props }: TimerInputProps) => {
  const durationRef = useRef<HTMLInputElement>(null)
  const [isEditingDuration, setIsEditingDuration] = useState(false)

  const timeLeftString = msToDurationString(timer.remainingTime)

  const onCircularInputChange: ComponentProps<typeof CircularInput>['onChange'] = (percent) => {
    timer.dispatch({ type: 'CHANGE', remainingTime: timer.duration * percent })
  }

  const onShowDurationInput = () => {
    setIsEditingDuration(true)
    timer.dispatch({ type: 'PAUSE' })
  }

  const closeDurationInput = () => {
    setIsEditingDuration(false)
  }

  const onDurationInputKeyUp: KeyboardEventHandler<HTMLInputElement> = ({ key }) => {
    switch (key) {
      case 'Escape':
        return closeDurationInput()
    }
  }

  const onDurationInputSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const newDuration = durationStringToMilliseconds(durationRef.current?.value ?? '')

    timer.dispatch({ type: 'CHANGE', duration: newDuration, remainingTime: newDuration })

    closeDurationInput()
  }

  return (
    <CircularInput
      className={clsx(className, styles.remainingTimeInput)}
      onChange={onCircularInputChange}
      value={timer.remainingTime / timer.duration}
      aria-label="Remaining Time"
      aria-valuetext={timeLeftString}
      displayValue={
        <Box className={styles.timerDisplayAndInput}>
          {isEditingDuration ? (
            <form className={styles.durationForm} onSubmit={onDurationInputSubmit}>
              <InputMask
                inputRef={durationRef}
                className={styles.durationInput}
                mask="99:99"
                maskPlaceholder="00:00"
                name="duration"
                aria-label="Set Timer Duration"
                onKeyUp={onDurationInputKeyUp}
                onBlur={closeDurationInput}
              >
                <InputBase
                  autoFocus
                  fullWidth={false}
                  inputProps={{
                    size: 5,
                  }}
                />
              </InputMask>
            </form>
          ) : (
            <>
              <Button
                className={styles.showDurationInputButton}
                variant="contained"
                color="primary"
                onClick={onShowDurationInput}
              >
                Set Timer
              </Button>
              <Typography
                className={clsx(styles.timerValue, timer.isDone && styles.timerDone)}
                role="timer"
                {...props}
              >
                {timer.isDone ? 'Done!' : timeLeftString}
              </Typography>
            </>
          )}
        </Box>
      }
    />
  )
}
