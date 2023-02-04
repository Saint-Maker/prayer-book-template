import PrayerReducer from '~slices/prayerSlice'
import HabitReducer from '~slices/habitSlice'
import pwaSlice from '~slices/pwaSlice'

export default {
    prayers: PrayerReducer,
    habits: HabitReducer,
    pwa: pwaSlice,
}
