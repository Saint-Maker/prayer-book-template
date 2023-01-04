import {describe, expect, test} from 'vitest';
import {populateMissingWeeksForHabit} from '../utils/getUpdatedHabits';

describe('populateMissingWeeksForHabit', () => {
  test.each([0, 1, 2, 3, 4, 5, 6])(
      'User checks 1 week of default habit data %i week(s) later',
      (numOfWeeks) => {
        const inputData: Habit = {
          id: '0',
          name: 'exercise',
          days: Array(7).fill(false),
          editing: false,
        };
        const updatedHabitDays = Array(((numOfWeeks > 3 ? 3 : numOfWeeks) + 1) * 7).fill(false);
        const expectedResult: Habit = {
          id: '0',
          name: 'exercise',
          days: updatedHabitDays,
          editing: false,
        };
        const dateDifference = (numOfWeeks * 7) + 1;
        const result = populateMissingWeeksForHabit(dateDifference, inputData);
        expect(result).toStrictEqual(expectedResult);
      },
  );
  test.each([0, 1, 2, 3, 4, 5, 6])(
      'User checks 1 week of custom habit data %i week(s) later',
      (numOfWeeks) => {
        const customHabitDays = [false, false, true, true, false, true, false];
        const inputData: Habit = {
          id: '0',
          name: 'exercise',
          days: customHabitDays,
          editing: false,
        };
        const updatedHabitDays = numOfWeeks > 3 ? Array(28).fill(false) : [...customHabitDays, ...Array(numOfWeeks * 7).fill(false)];
        const expectedResult: Habit = {
          id: '0',
          name: 'exercise',
          days: updatedHabitDays,
          editing: false,
        };
        const dateDifference = (numOfWeeks * 7) + 1;
        const result = populateMissingWeeksForHabit(dateDifference, inputData);
        expect(result).toStrictEqual(expectedResult);
      },
  );
  test.each([0, 1, 2, 3, 4, 5, 6])(
      'User checks 2 weeks of custom habit data %i week(s) later',
      (numOfWeeks) => {
        const customHabitDays = [false, false, true, true, false, true, false, false, true, true, true, false, true, false];
        const inputData: Habit = {
          id: '0',
          name: 'exercise',
          days: customHabitDays,
          editing: false,
        };
        const updatedHabitDays = numOfWeeks > 3 ? Array(28).fill(false) :
                                 numOfWeeks > 2 ? [...customHabitDays.slice(7), ...Array(21).fill(false)] :
                                                  [...customHabitDays, ...Array(numOfWeeks * 7).fill(false)];
        const expectedResult: Habit = {
          id: '0',
          name: 'exercise',
          days: updatedHabitDays,
          editing: false,
        };
        const dateDifference = (numOfWeeks * 7) + 1;
        const result = populateMissingWeeksForHabit(dateDifference, inputData);
        expect(result).toStrictEqual(expectedResult);
      },
  );
  test.each([0, 1, 2, 3, 4, 5, 6])(
      'User checks %i week(s) of default habit data 1 week later',
      (numOfWeeks) => {
        const inputHabitDays = Array(((numOfWeeks > 3 ? 3 : numOfWeeks)) * 7).fill(false);
        const inputData: Habit = {
          id: '0',
          name: 'exercise',
          days: inputHabitDays,
          editing: false,
        };
        const expectedHabitDays = Array(((numOfWeeks > 3 ? 3 : numOfWeeks) + 1) * 7).fill(false);
        const expectedResult: Habit = {
          id: '0',
          name: 'exercise',
          days: expectedHabitDays,
          editing: false,
        };
        const dateDifference = 8;
        const result = populateMissingWeeksForHabit(dateDifference, inputData);
        expect(result).toStrictEqual(expectedResult);
      },
  );
});
