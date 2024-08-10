import { mockTime } from '$src/tests/mocks/mock-time'
import { user } from '$src/tests/mocks/mock-user-events'
import { render, screen, waitFor, within } from '@testing-library/react'
import { App } from './App'

mockTime.install()

describe('App', () => {
  it('does not crash', () => {
    expect(() => render(<App />)).not.toThrowError()
  })

  it('displays a timer by default', () => {
    render(<App />)

    expect(screen.getByRole('timer')).toHaveTextContent('01:00')
  })

  describe('Timer', () => {
    it('can be closed and re-opened', async () => {
      render(<App />)
      const timerCard = screen.getByRole('region', { name: 'Timer' })

      await user.click(within(timerCard).getByRole('button', { name: /Close/i }))

      await waitFor(() => {
        expect(screen.queryByRole('region', { name: 'Timer' })).not.toBeInTheDocument()
      })

      await user.click(screen.getByRole('button', { name: 'Create Timer' }))

      await waitFor(() => {
        expect(screen.queryByRole('region', { name: 'Timer' })).toBeVisible()
      })
    })
  })
})
