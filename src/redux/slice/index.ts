import { reducer as PrayerReducer } from '~slices/prayerSlice'
import { reducer as pwaSlice } from '~slices/pwaSlice'
import { reducer as modSlice } from '~slices/modSlice'
import { reducer as selectedModSlice } from '~slices/selectedModSlice'
import { reducer as customModSlice } from '~slices/customModSlice'

export const slices = {
    prayers: PrayerReducer,
    pwa: pwaSlice,
    mods: modSlice,
    selectedMods: selectedModSlice,
    customMods: customModSlice,
}
