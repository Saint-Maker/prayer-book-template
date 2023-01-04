import {HABITS_LATEST_WEEKS_START_DATE} from '../constants/lsKeys';
import {getDateDifference} from './getDateDifference';
import {getTodaysMostRecentSunday} from './getTodaysMostRecentSunday';
import {lsSet} from './localStorage';


export const shouldUpdateHabits = () => {
  const dateDifference = getDateDifference();
  const shouldUpdateHabits = dateDifference > 7;
  // If the user did not check their habits in over a week then update the latestWeekStartDate and the habits
  if (shouldUpdateHabits) lsSet(HABITS_LATEST_WEEKS_START_DATE, getTodaysMostRecentSunday().toString());
  return shouldUpdateHabits;
};

