import { ONE_MINUTE, ONE_SECOND } from '$src/lib/datetime-helpers'
import { useCallback, useEffect, useState } from 'react'

export interface TimerHookOptions {
  /** Timer duration, in milliseconds */
  duration?: number
}

export type TimerHookValues = ReturnType<typeof useTimer>

export const useTimer = ({ duration: defaultDuration = ONE_MINUTE }: TimerHookOptions = {}) => {
  const [duration, setDuration] = useState(defaultDuration)
  const [isRunning, setIsRunning] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [remainingTime, setRemainingTime] = useState(duration)

  const addTime = useCallback((milliseconds: number) => {
    setDuration((prevDuration) => prevDuration + milliseconds)
    setRemainingTime((prevRemaining) => prevRemaining + milliseconds)
  }, [])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setIsDone(false)
    setRemainingTime(duration)
  }, [duration])

  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(function onTick() {
      setRemainingTime((prevTime) => prevTime - ONE_SECOND)
    }, ONE_SECOND)

    return () => clearTimeout(timer)
  }, [isRunning])

  useEffect(() => {
    const remainingSeconds = Math.floor(remainingTime / ONE_SECOND)

    if (remainingSeconds > 0) {
      setIsDone(false)
      return
    }

    if (!isRunning) return

    setIsRunning(false)
    setIsDone(true)
    setRemainingTime(0)
  }, [isRunning, remainingTime])

  return {
    duration,
    setDuration,
    isRunning,
    setIsRunning,
    isDone,
    remainingTime,
    setRemainingTime,

    addTime,
    resetTimer,
  } as const
}
