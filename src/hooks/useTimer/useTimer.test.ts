import { act, renderHook } from '@testing-library/react'

import { ONE_MINUTE, ONE_SECOND } from '$src/lib/datetime-helpers'
import { mockTime } from '$src/tests/mocks/mock-time'
import { useTimer } from './useTimer'

mockTime.install()

describe('useTimer', () => {
  it('defaults to one minute', async () => {
    const { result } = renderHook(() => useTimer())

    expect(result.current.duration).toBe(ONE_MINUTE)
    expect(result.current.remainingTime).toBe(ONE_MINUTE)
  })

  it('returns the correct state as the timer advances to and reaches zero', async () => {
    const { result } = renderHook(() => useTimer())

    expect(result.current).toMatchObject({
      duration: ONE_MINUTE,
      remainingTime: ONE_MINUTE,
      isRunning: false,
      isDone: false,
    })

    act(() => result.current.dispatch({ type: 'PLAY' }))

    expect(result.current).toMatchObject({
      duration: ONE_MINUTE,
      remainingTime: ONE_MINUTE,
      isRunning: true,
      isDone: false,
    })

    act(() => vi.advanceTimersByTime(ONE_SECOND))

    expect(result.current).toMatchObject({
      duration: ONE_MINUTE,
      remainingTime: 59 * ONE_SECOND,
      isRunning: true,
      isDone: false,
    })

    act(() => vi.advanceTimersByTime(ONE_SECOND))

    expect(result.current).toMatchObject({
      duration: ONE_MINUTE,
      remainingTime: 58 * ONE_SECOND,
      isRunning: true,
      isDone: false,
    })

    act(() => vi.advanceTimersByTime(result.current.remainingTime))

    expect(result.current).toMatchObject({
      duration: ONE_MINUTE,
      remainingTime: 0,
      isRunning: false,
      isDone: true,
    })
  })
})
