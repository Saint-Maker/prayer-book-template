import {configureStore} from '@reduxjs/toolkit';
import slice from './slice';

const store = configureStore({
  reducer: slice,
});

type RootState = ReturnType<typeof store.getState>;

export const selectPrayers = (state: RootState) => state.prayers;
export const selectPWA = (state: RootState) => state.pwa;
export default store;

export type AppDispatch = typeof store.dispatch;
