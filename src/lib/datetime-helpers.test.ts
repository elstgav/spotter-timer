import { durationStringToMilliseconds, ONE_MINUTE, ONE_SECOND } from './datetime-helpers'

describe('durationStringToMilliseconds', () => {
  it('throws an error if given a malformed string', () => {
    expect(() => durationStringToMilliseconds('123abc')).toThrowErrorMatchingInlineSnapshot(
      `[Error: 123abc does not match expected output: /\\d\\d:\\d\\d/]`,
    )
  })
  it('converts pairs of digits into minutes and seconds', () => {
    expect(durationStringToMilliseconds('00:00')).toBe(0)
    expect(durationStringToMilliseconds('00:14')).toBe(14 * ONE_SECOND)
    expect(durationStringToMilliseconds('56:00')).toBe(56 * ONE_MINUTE)
    expect(durationStringToMilliseconds('92:95')).toBe(92 * ONE_MINUTE + 95 * ONE_SECOND)
  })
})
