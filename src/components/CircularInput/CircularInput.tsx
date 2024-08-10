import { Box } from '@mui/material'
import { clsx } from 'clsx'
import { ComponentProps, ReactNode } from 'react'
import {
  CircularProgress,
  CircularThumb,
  CircularTrack,
  CircularInput as OriginalCircularInput,
} from 'react-circular-input'
import styles from './CircularInput.module.scss'

export interface CircularInputProps extends ComponentProps<typeof OriginalCircularInput> {
  displayValue?: ReactNode
}

// @ts-expect-error Suppress defaultProps warning
delete CircularTrack.defaultProps
// @ts-expect-error Suppress defaultProps warning
delete CircularProgress.defaultProps

const trackDefaults = {
  fill: 'none',
  strokeLinecap: 'round',
} as const satisfies JSX.IntrinsicElements['circle']

export const CircularInput = ({ className, displayValue, ...props }: CircularInputProps) => {
  return (
    <Box className={clsx(className, styles.wrapper)}>
      <OriginalCircularInput
        className={styles.svg}
        {...props}
        radius={76}
        aria-valuenow={props.value * 100}
        aria-valuemin={props['aria-valuemin'] ?? 0}
        aria-valuemax={props['aria-valuemax'] ?? 100}
        aria-orientation="vertical" // up/down = increase/decrease value
      >
        <CircularTrack className={styles.track} {...trackDefaults} />
        <CircularProgress className={styles.progress} {...trackDefaults} />
        <CircularThumb
          className={styles.thumb}
          r=".6em" // Unfortunately the thumb size isn’t easy to change with CSS; hardcoding here
        />
      </OriginalCircularInput>
      <Box className={styles.displayValue}>{displayValue}</Box>
    </Box>
  )
}
