import { describe, expect, it, vi } from 'vitest'
import { getTodaysMostRecentSunday } from '~utils/habits/getTodaysMostRecentSunday'

describe('getTodaysMostRecentSunday', () => {
    it('If today is Tuesday, return most recent Sunday', () => {
        const monday = new Date('2023-02-07T06:00:00.000Z')
        vi.setSystemTime(monday)

        const sunday = new Date('2023-02-05T06:00:00.000Z')

        const result = getTodaysMostRecentSunday()
        expect(result).toStrictEqual(sunday)
    })

    it('If today is Sunday just return the current date', () => {
        const sunday = new Date('2023-02-05T06:00:00.000Z')
        vi.setSystemTime(sunday)

        const result = getTodaysMostRecentSunday()
        expect(result).toStrictEqual(sunday)
    })
})
