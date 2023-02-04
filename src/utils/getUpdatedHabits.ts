import { DAYS_IN_WEEK } from '~constants/habits'
import { HABITS_LATEST_WEEKS_START_DATE } from '~constants/lsKeys'
import { getDateDifference } from '~utils/getDateDifference'
import { getTodaysMostRecentSunday } from '~utils/getTodaysMostRecentSunday'
import { lsSet } from '~utils/localStorage'

export const getUpdatedHabits = (habits: Habit[]) => {
    const updatedHabits = habits.map((habit: Habit) => populateMissingWeeksForHabit(getDateDifference(), habit))
    // After the habits have been updated, update the latest weeks start date
    lsSet(HABITS_LATEST_WEEKS_START_DATE, getTodaysMostRecentSunday().toString())
    return updatedHabits
}

export const populateMissingWeeksForHabit = (dateDiff: number, habit: Habit) => {
    if (dateDiff < DAYS_IN_WEEK) return habit
    const newHabit: Habit = { ...habit }
    const weeksToAdd = Math.floor(dateDiff / DAYS_IN_WEEK)
    // We only store 4 weeks per habit, so if the user hasn't checked their habits for
    // more than 3 weeks then we can just populate the habit with 4 empty weeks
    if (weeksToAdd > 3) return { ...newHabit, days: Array(28).fill(false) }

    const updatedDays = [...habit.days]
    updatedDays.push(...Array(weeksToAdd * DAYS_IN_WEEK).fill(false))

    if (updatedDays.length > 28) {
        const daysToRemove = updatedDays.length - 28
        updatedDays.splice(0, daysToRemove)
    }

    return { ...newHabit, days: updatedDays }
}
