import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Prop = null | BeforeInstallPromptEvent;

const initialState = {
  deferredPrompt: null,
} as {
  deferredPrompt: Prop;
};

const pwaSlice = createSlice({
  name: 'pwa',
  initialState,
  reducers: {
    setDeferredPrompt: (state, action: PayloadAction<Prop>) => {
      state.deferredPrompt = action.payload;
    },
  }},
);

export const {setDeferredPrompt} = pwaSlice.actions;
export default pwaSlice.reducer;
