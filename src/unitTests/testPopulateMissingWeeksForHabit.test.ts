import { describe, expect, it } from 'vitest'

import { DAYS_IN_WEEK } from '~constants/habits'
import { populateMissingWeeksForHabit } from '~utils/getUpdatedHabits'

const defaultData = [
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
]

const inputData: Habit = {
    id: '0',
    name: 'exercise',
    days: defaultData,
    editing: false,
}

const getExpectedResult = (expectedData: boolean[]) => {
    const expectedResult: Habit = {
        id: '0',
        name: 'exercise',
        days: expectedData,
        editing: false,
    }
    return expectedResult
}

describe('populateMissingWeeksForHabit', () => {
    it('User checks 4 week of random habit data within the same week the habit was created', () => {
        const daysLater = 1
        const result = populateMissingWeeksForHabit(daysLater, inputData)
        expect(result).toStrictEqual(getExpectedResult(defaultData))
    })
    it('User checks 4 week of random habit data 1 week later', () => {
        const expectedData = [
            true,
            false,
            false,
            false,
            true,
            true,
            false,
            false,
            true,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ]
        const daysLater = DAYS_IN_WEEK
        const result = populateMissingWeeksForHabit(daysLater, inputData)
        expect(result).toStrictEqual(getExpectedResult(expectedData))
    })
    it('User checks 4 week of random habit data 2 week later', () => {
        const expectedData = [
            false,
            true,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ]
        const daysLater = DAYS_IN_WEEK * 2
        const result = populateMissingWeeksForHabit(daysLater, inputData)
        expect(result).toStrictEqual(getExpectedResult(expectedData))
    })
    it('User checks 4 week of random habit data 3 week later', () => {
        const expectedData = [
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ]
        const daysLater = DAYS_IN_WEEK * 3
        const result = populateMissingWeeksForHabit(daysLater, inputData)
        expect(result).toStrictEqual(getExpectedResult(expectedData))
    })
    it('User checks 4 week of random habit data 4 week later', () => {
        const expectedData = [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ]
        const daysLater = DAYS_IN_WEEK * 4
        const result = populateMissingWeeksForHabit(daysLater, inputData)
        expect(result).toStrictEqual(getExpectedResult(expectedData))
    })
    it('User checks 4 week of random habit data 5 week later', () => {
        const expectedData = [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ]
        const daysLater = DAYS_IN_WEEK * 5
        const result = populateMissingWeeksForHabit(daysLater, inputData)
        expect(result).toStrictEqual(getExpectedResult(expectedData))
    })
})
