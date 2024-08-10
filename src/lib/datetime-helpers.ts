export const ONE_SECOND = 1000
export const ONE_MINUTE = 60 * ONE_SECOND
export const ONE_HOUR = 60 * ONE_MINUTE

export const DURATION_STRING_PATTERN = /\d\d:\d\d/

export const durationStringToMilliseconds = (durationString: string) => {
  if (!durationString.match(DURATION_STRING_PATTERN))
    throw new Error(`${durationString} does not match expected output: ${DURATION_STRING_PATTERN}`)

  const [minutes, seconds] = durationString.split(':').map((str) => Number.parseInt(str, 10))

  return seconds * ONE_SECOND + minutes * ONE_MINUTE
}
