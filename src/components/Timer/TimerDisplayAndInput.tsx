import { CircularInput } from '$src/components/CircularInput'
import { TimerHookValues } from '$src/hooks/useTimer'
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

export interface TimerInputProps
  extends Pick<TimerHookValues, 'duration' | 'remainingTime' | 'isDone'>,
    AriaAttributes {
  className?: string
  onRemainingTimeChange?: (value: number) => void
  onDurationChangeStart?: () => void
  onDurationChange?: (
    /** new duration in milliseconds */
    newDuration: number,
  ) => void
}

export const TimerDisplayAndInput = ({
  className,
  duration,
  remainingTime,
  isDone,
  onRemainingTimeChange,
  onDurationChangeStart,
  onDurationChange,
  ...props
}: TimerInputProps) => {
  const durationRef = useRef<HTMLInputElement>(null)
  const [isEditingDuration, setIsEditingDuration] = useState(false)

  const timeLeftString = msToDurationString(remainingTime)

  const onCircularInputChange: ComponentProps<typeof CircularInput>['onChange'] = (percent) => {
    onRemainingTimeChange?.(duration * percent)
  }

  const onShowDurationInputClick = () => {
    setIsEditingDuration(true)
    onDurationChangeStart?.()
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
    onDurationChange?.(durationStringToMilliseconds(durationRef.current?.value ?? ''))
    closeDurationInput()
  }

  return (
    <CircularInput
      className={clsx(className, styles.remainingTimeInput)}
      onChange={onCircularInputChange}
      value={remainingTime / duration}
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
                onClick={onShowDurationInputClick}
              >
                Set Timer
              </Button>
              <Typography
                className={clsx(styles.timerValue, isDone && styles.timerDone)}
                role="timer"
                {...props}
              >
                {isDone ? 'Done!' : timeLeftString}
              </Typography>
            </>
          )}
        </Box>
      }
    />
  )
}
