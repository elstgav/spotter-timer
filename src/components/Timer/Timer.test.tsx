import { ONE_MINUTE, ONE_SECOND } from '$src/lib/datetime-helpers'
import { mockTime } from '$src/tests/mocks/mock-time'
import { user } from '$src/tests/mocks/mock-user-events'
import { render, screen } from '@testing-library/react'
import { Timer } from './Timer'

mockTime.install()

describe('Timer', () => {
  it('has a configurable title', () => {
    render(<Timer title="test countdown" />)

    expect(screen.getByRole('heading', { name: 'test countdown' })).toBeVisible()
    expect(screen.getByRole('timer', { name: 'test countdown' })).toBeVisible()
  })

  it('defaults to one minute', () => {
    render(<Timer />)

    expect(screen.getByRole('timer')).toHaveTextContent('01:00')
  })

  it('is paused by default', async () => {
    render(<Timer />)

    expect(screen.getByRole('timer')).toHaveTextContent('01:00')

    await vi.advanceTimersByTime(ONE_MINUTE)

    expect(screen.getByRole('timer')).toHaveTextContent('01:00')
  })

  describe('play/pause button', () => {
    it('plays, pauses, and resumes the timer', async () => {
      render(<Timer />)

      expect(screen.getByRole('timer')).toHaveTextContent('01:00')

      // PLAY
      await user.click(screen.getByRole('button', { name: /play/i }))
      await vi.advanceTimersByTime(16 * ONE_SECOND)

      expect(screen.getByRole('timer')).toHaveTextContent('00:44')

      // PAUSE
      await user.click(screen.getByRole('button', { name: /pause/i }))
      await vi.advanceTimersByTime(ONE_MINUTE)

      expect(screen.getByRole('timer')).toHaveTextContent('00:44')

      // RESUME
      await user.click(screen.getByRole('button', { name: /play/i }))
      await vi.advanceTimersByTime(14 * ONE_SECOND)

      expect(screen.getByRole('timer')).toHaveTextContent('00:30')
    })
  })
})
