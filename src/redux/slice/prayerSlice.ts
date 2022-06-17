import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import idb from '../../utils/idb';

export const getPrayers = createAsyncThunk(
    'prayer/getPrayers',
    async () => {
      return idb.readData('prayers');
    },
);
export const addPrayer = createAsyncThunk(
    'prayer/addPrayer',
    async (prayer: Prayer) => {
      const data = await idb.readData('prayers') || [];
      return idb.writeData('prayers', [prayer, ...data]);
    },
);
export const deletePrayer = createAsyncThunk(
    'prayer/deletePrayer',
    async (id: string) => {
      const data = await idb.readData('prayers') || [];
      return idb.writeData('prayers', data.filter((prayer) => (prayer as Prayer).id !== id));
    },
);
export const deleteAllPrayer = createAsyncThunk(
    'prayer/deleteAllPrayer',
    async () => {
      return idb.writeData('prayers', []);
    },
);

const initialState = {
  data: [] as Prayer[],
  loading: true,
};

const prayerSlice = createSlice({
  name: 'prayer',
  initialState,
  reducers: {},
  extraReducers: {
    [getPrayers.pending.type]: (state) => {
      state.loading = true;
    },
    [getPrayers.fulfilled.type]: (state, action) => {
      state.data = action.payload || [] as Prayer[];
      state.loading = false;
    },
    [addPrayer.fulfilled.type]: (state, action) => {
      state.data = action.payload as Prayer[];
    },
    [deletePrayer.fulfilled.type]: (state, action) => {
      state.data = action.payload as Prayer[];
    },
    [deleteAllPrayer.fulfilled.type]: (state, action) => {
      state.data = action.payload as Prayer[];
    },
  },
});

export default prayerSlice.reducer;
