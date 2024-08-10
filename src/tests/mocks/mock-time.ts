import { vi } from 'vitest'

export const MOCK_START_TIME = new Date('2020-01-01T00:00:00.000Z')

export const mockTime = {
  install() {
    beforeAll(() => {
      vi.useRealTimers()
    })

    beforeEach(() => {
      vi.useFakeTimers({ now: MOCK_START_TIME })

      // FIXME: @testing-library/user-event fails to use vi.advanceTimersByTime
      // SEE: https://github.com/testing-library/user-event/issues/1115#issuecomment-1565730917
      // @ts-expect-error mocking a non-existent jest object
      globalThis.jest = {
        advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
      }
    })
  },
}
