import {getDateDifference} from './getDateDifference';


export const getUpdatedHabits = (habits: Habit[]) => {
  const updatedHabits = habits.map((habit: Habit) => populateMissingWeeksForHabit(getDateDifference(), habit));
  return updatedHabits;
};


export const populateMissingWeeksForHabit = (dateDiff: number, habit: Habit) => {
  if (dateDiff < 8) return habit;
  const newHabit: Habit = {...habit};
  const weeksToAdd = Math.ceil(dateDiff / 7) - 1;
  // We only store 4 weeks per habit, so if the user hasn't checked their habits for
  // more than 3 weeks then we can just populate the habit with 4 empty weeks
  if (weeksToAdd > 3) return {...newHabit, days: Array(28).fill(false)};

  const updatedDays = [...habit.days];
  updatedDays.push(...Array(weeksToAdd * 7).fill(false));

  if (updatedDays.length > 28) {
    const daysToRemove = updatedDays.length - 28;
    updatedDays.splice(0, daysToRemove);
  }

  return {...newHabit, days: updatedDays};
};
