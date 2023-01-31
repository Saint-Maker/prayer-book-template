import { getDateDifference } from "~utils/getDateDifference"

export const shouldUpdateHabits = () => {
  const dateDifference = getDateDifference()
  const shouldUpdateHabits = dateDifference > 6
  return shouldUpdateHabits
}
