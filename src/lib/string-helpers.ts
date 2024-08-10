import { intervalToDuration } from 'date-fns/intervalToDuration'

export const msToDurationString = (ms: number) => {
  const { minutes, seconds } = intervalToDuration({
    start: 0,
    end: ms,
  })

  return [minutes ?? 0, seconds ?? 0].map((val) => String(val).padStart(2, '0')).join(':')
}
