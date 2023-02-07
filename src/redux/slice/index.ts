import { reducer as PrayerReducer } from '~slices/prayerSlice'
import { reducer as HabitReducer } from '~slices/habitSlice'
import { reducer as pwaSlice } from '~slices/pwaSlice'

export const slices = {
    prayers: PrayerReducer,
    habits: HabitReducer,
    pwa: pwaSlice,
}
