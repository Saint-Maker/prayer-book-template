import { configureStore } from '@reduxjs/toolkit'

import { slices } from './slice'

export const store = configureStore({
    reducer: slices,
})

type RootState = ReturnType<typeof store.getState>

export const selectPrayers = (state: RootState) => state.prayers
export const selectHabits = (state: RootState) => state.habits
export const selectPWA = (state: RootState) => state.pwa
export const selectMods = (state: RootState) => state.mods

export type AppDispatch = typeof store.dispatch
