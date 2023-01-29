import { differenceInDays } from "date-fns"

import { HABITS_LATEST_WEEKS_START_DATE } from "../constants/lsKeys"
import { getTodaysMostRecentSunday } from "./getTodaysMostRecentSunday"
import { lsGet, lsSet } from "./localStorage"

export const getDateDifference = () => {
  const todaysDate = new Date()
  const dateDifference = differenceInDays(todaysDate, getLastRecordedSunday())
  return dateDifference
}

const getLastRecordedSunday = () => {
  let lastRecordedSunday = lsGet(HABITS_LATEST_WEEKS_START_DATE)
  if (lastRecordedSunday === null) {
    const mostRecentSunday = getTodaysMostRecentSunday().toString()
    lsSet(HABITS_LATEST_WEEKS_START_DATE, mostRecentSunday)
    lastRecordedSunday = mostRecentSunday
  }
  return new Date(lastRecordedSunday)
}
