import { ONE_MINUTE, ONE_SECOND } from '$src/lib/datetime-helpers'
import { mockTime } from '$src/tests/mocks/mock-time'
import { user } from '$src/tests/mocks/mock-user-events'
import { render, screen } from '@testing-library/react'
import { act } from 'react'
import { Timer } from './Timer'

mockTime.install()

describe('Timer', () => {
  beforeEach(() => {
    // TODO: Solve React act complaints about setInterval
    // HACK: Suppress act errors to reduce noise in test output
    // @ts-expect-error this is a hack we should fix
    global.IS_REACT_ACT_ENVIRONMENT = false

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.mocked(console.error).mockRestore?.()
  })

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

    await act(() => vi.advanceTimersByTimeAsync(ONE_MINUTE))

    expect(screen.getByRole('timer')).toHaveTextContent('01:00')
  })

  describe('timer display', () => {
    it('shows the current remaining time', async () => {
      render(<Timer />)

      expect(screen.getByRole('timer')).toHaveTextContent('01:00')

      await user.click(screen.getByRole('button', { name: /PLAY/i }))
      expect(screen.getByRole('button', { name: /PAUSE/i })).toBeVisible()

      act(() => vi.advanceTimersByTime(ONE_SECOND))
      expect(screen.getByRole('timer')).toHaveTextContent('00:59')

      await act(() => vi.advanceTimersByTimeAsync(ONE_SECOND))

      expect(screen.getByRole('timer')).toHaveTextContent('00:58')

      await act(() => vi.advanceTimersByTimeAsync(ONE_SECOND))

      expect(screen.getByRole('timer')).toHaveTextContent('00:57')
    })

    it('notifies the user when the timer has ended', async () => {
      render(<Timer />)

      await user.click(screen.getByRole('button', { name: /PLAY/i }))
      await act(() => vi.advanceTimersByTimeAsync(ONE_SECOND))

      expect(screen.getByRole('timer')).toHaveTextContent('00:59')

      await act(() => vi.advanceTimersByTimeAsync(2 * ONE_MINUTE))

      expect(screen.getByRole('timer')).toHaveTextContent(/done/i)
    })
  })

  describe('play/pause button', () => {
    it('plays, pauses, and resumes the timer', async () => {
      render(<Timer />)

      expect(screen.getByRole('timer')).toHaveTextContent('01:00')

      // PLAY
      await user.click(screen.getByRole('button', { name: /PLAY/i }))
      await act(() => vi.advanceTimersByTimeAsync(16 * ONE_SECOND))

      expect(screen.getByRole('timer')).toHaveTextContent('00:44')

      // PAUSE
      await user.click(screen.getByRole('button', { name: /PAUSE/i }))
      await act(() => vi.advanceTimersByTimeAsync(ONE_MINUTE))

      expect(screen.getByRole('timer')).toHaveTextContent('00:44')

      // RESUME
      await user.click(screen.getByRole('button', { name: /PLAY/i }))
      await act(() => vi.advanceTimersByTimeAsync(14 * ONE_SECOND))

      expect(screen.getByRole('timer')).toHaveTextContent('00:30')
    })
  })

  describe('add minute button', () => {
    it('increases the timer duration and current value by one minute', async () => {
      render(<Timer />)

      expect(screen.getByRole('timer')).toHaveTextContent('01:00')

      await user.click(screen.getByRole('button', { name: /PLAY/i }))
      await act(() => vi.advanceTimersByTimeAsync(16 * ONE_SECOND))

      expect(screen.getByRole('timer')).toHaveTextContent('00:44')

      await user.click(screen.getByRole('button', { name: '+1:00' }))
      expect(screen.getByRole('timer')).toHaveTextContent('01:44')

      await user.click(screen.getByRole('button', { name: '+1:00' }))
      expect(screen.getByRole('timer')).toHaveTextContent('02:44')

      await user.click(screen.getByRole('button', { name: /RESET/i }))
      expect(screen.getByRole('timer')).toHaveTextContent('03:00')
    })
  })

  describe('reset button', () => {
    it('pauses and resets the timer to the current duration', async () => {
      render(<Timer />)

      expect(screen.getByRole('timer')).toHaveTextContent('01:00')

      await user.click(screen.getByRole('button', { name: /PLAY/i }))
      await act(() => vi.advanceTimersByTimeAsync(16 * ONE_SECOND))

      expect(screen.getByRole('timer')).toHaveTextContent('00:44')
      expect(screen.getByRole('button', { name: /PAUSE/i })).toBeVisible()

      await user.click(screen.getByRole('button', { name: /RESET/i }))

      expect(screen.getByRole('timer')).toHaveTextContent('01:00')
      expect(screen.getByRole('button', { name: /PLAY/i })).toBeVisible()

      await user.click(screen.getByRole('button', { name: /PLAY/i }))
      await act(() => vi.advanceTimersByTimeAsync(30 * ONE_SECOND))

      expect(screen.getByRole('timer')).toHaveTextContent('00:30')

      await user.click(screen.getByRole('button', { name: '+1:00' }))
      expect(screen.getByRole('timer')).toHaveTextContent('01:30')

      await user.click(screen.getByRole('button', { name: /RESET/i }))
      expect(screen.getByRole('timer')).toHaveTextContent('02:00')
    })
  })
})
