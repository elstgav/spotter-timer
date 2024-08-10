import { ONE_MINUTE, ONE_SECOND } from './datetime-helpers'
import { msToDurationString } from './string-helpers'

describe('msToDurationString', () => {
  it('returns a formatted time string', () => {
    expect(msToDurationString(35 * ONE_SECOND)).toBe('00:35')
    expect(msToDurationString(ONE_MINUTE)).toBe('01:00')
    expect(msToDurationString(13 * ONE_MINUTE + 26 * ONE_SECOND)).toBe('13:26')
  })
})
