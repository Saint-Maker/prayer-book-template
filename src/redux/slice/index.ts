import PrayerReducer from "./prayerSlice"
import HabitReducer from "./habitSlice"
import PWASlice from "./PWASlice"

export default {
  prayers: PrayerReducer,
  habits: HabitReducer,
  pwa: PWASlice,
}
