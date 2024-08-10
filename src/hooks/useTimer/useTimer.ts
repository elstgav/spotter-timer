import { ONE_MINUTE, ONE_SECOND } from '$src/lib/datetime-helpers'
import { Dispatch, Reducer, useEffect, useReducer } from 'react'

export interface TimerHookOptions {
  /** Timer duration, in milliseconds */
  duration?: number
}

export type TimerHookValues = ReturnType<typeof useTimer>

export type TimerAction =
  | {
      type: 'PLAY'
    }
  | {
      type: 'PAUSE'
    }
  | {
      type: 'TICK'
    }
  | {
      type: 'RESET'
    }
  | ({
      type: 'CHANGE'
    } & Partial<Pick<TimerState, 'duration' | 'remainingTime'>>)

export interface TimerState {
  /**
   * in milliseconds
   *
   * @default {@link ONE_MINUTE}
   */
  duration: number

  /**
   * in milliseconds
   *
   * @default matches `duration`
   */
  remainingTime: number

  /** @default false */
  isRunning: boolean

  /** @default false */
  isDone: boolean
}

export type TimerDispatch = Dispatch<TimerAction>

const reducer: Reducer<TimerState, TimerAction> = (state, { type, ...payload }) => {
  switch (type) {
    case 'PLAY':
      return {
        ...state,
        isRunning: true,
      }
    case 'PAUSE':
      return {
        ...state,
        isRunning: false,
      }

    case 'TICK': {
      const remainingTime = Math.max(state.remainingTime - ONE_SECOND, 0)
      const remainingSeconds = Math.floor(remainingTime / ONE_SECOND)

      if (remainingSeconds <= 0)
        // STOP
        return {
          ...state,
          remainingTime: 0,
          isRunning: false,
          isDone: true,
        }

      return {
        ...state,
        remainingTime: Math.max(state.remainingTime - ONE_SECOND, 0),
      }
    }

    case 'RESET':
      return {
        ...state,
        remainingTime: state.duration,
        isRunning: false,
        isDone: false,
      }
    case 'CHANGE':
      return {
        ...state,
        ...payload,
      }
  }
}

export const useTimer = ({ duration: initialDuration = ONE_MINUTE }: TimerHookOptions = {}) => {
  const [state, dispatch] = useReducer(reducer, {
    duration: initialDuration,
    remainingTime: initialDuration,
    isRunning: false,
    isDone: false,
  })

  useEffect(() => {
    if (!state.isRunning) return

    const interval = setInterval(() => dispatch({ type: 'TICK' }), ONE_SECOND)

    return () => clearInterval(interval)
  }, [state.isRunning])

  return {
    ...state,
    dispatch,
  } as const
}
