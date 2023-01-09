import {isSunday, startOfWeek} from 'date-fns';


export const getTodaysMostRecentSunday = (): Date => {
  const todaysDate = new Date();
  if (isSunday(todaysDate)) return todaysDate;
  const mostRecentSunday = startOfWeek(todaysDate, {weekStartsOn: 0});
  return mostRecentSunday;
};
