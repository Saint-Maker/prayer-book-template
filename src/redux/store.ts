import { configureStore } from '@reduxjs/toolkit'

import { slices } from './slice'

export const store = configureStore({
    reducer: slices,
})

type RootState = ReturnType<typeof store.getState>

export const selectPrayers = (state: RootState) => state.prayers
export const selectPWA = (state: RootState) => state.pwa
export const selectMods = (state: RootState) => state.mods
export const selectSelectedMods = (state: RootState) => state.selectedMods
export const selectCustomMods = (state: RootState) => state.customMods

export type AppDispatch = typeof store.dispatch
