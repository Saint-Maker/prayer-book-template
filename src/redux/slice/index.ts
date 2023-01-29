import PrayerReducer from "./prayerSlice"
import HabitReducer from "./habitSlice"
import pwaSlice from "./pwaSlice"

export default {
  prayers: PrayerReducer,
  habits: HabitReducer,
  pwa: pwaSlice,
}
