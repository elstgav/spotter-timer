import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
/**
 * Fire events the same way the user does. Simulates user interactions with the
 * [`@testing-library/user-event`](https://github.com/testing-library/user-event) library.
 *
 * - [User Event Docs](https://testing-library.com/docs/user-event/intro/)
 * - [Convenience APIs (e.g. `user.click`)](https://testing-library.com/docs/user-event/convenience)
 */
export const user = userEvent.setup({
  advanceTimers: vi.advanceTimersByTime,
})
