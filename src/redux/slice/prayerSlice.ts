import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import defaultPrayerData from './../../defaultPrayerData.json'
import { sliceGet, sliceAdd, sliceSet, sliceEdit, sliceDeleteSingle, sliceDeleteAll } from './utils/sliceTools'

export const getPrayers = createAsyncThunk('prayer/getPrayers', async () => {
    return await sliceGet('prayers', defaultPrayerData.map((prayer: Partial<Prayer>) => ({ ...prayer, id: nanoid(16) })))
})
export const addPrayer = createAsyncThunk('prayer/addPrayer', async (prayer: Prayer) => {
    return await sliceAdd(prayer, 'prayers')
})
export const setPrayers = createAsyncThunk('prayer/setPrayers', async (prayers: Prayer[]) => {
    return sliceSet(prayers, 'prayers')
})
export const editPrayer = createAsyncThunk('prayer/editPrayer', async (editedPrayer: Prayer) => {
    return await sliceEdit(editedPrayer, 'prayers')
})
export const deletePrayer = createAsyncThunk('prayer/deletePrayer', async (id: string) => {
    return await sliceDeleteSingle(id, 'prayers')
})
export const deleteAllPrayer = createAsyncThunk('prayer/deleteAllPrayer', async () => {
    return sliceDeleteAll('prayers')
})

const initialState = {
    data: [] as Prayer[],
    loading: true,
}

const prayerSlice = createSlice({
    name: 'prayer',
    initialState,
    reducers: {},
    extraReducers: {
        [getPrayers.pending.type]: (state) => {
            state.loading = true
        },
        [getPrayers.fulfilled.type]: (state, action) => {
            state.data = action.payload || ([] as Prayer[])
            state.loading = false
        },
        [addPrayer.fulfilled.type]: (state, action) => {
            state.data = action.payload as Prayer[]
        },
        [setPrayers.fulfilled.type]: (state, action) => {
            state.data = action.payload as Prayer[]
        },
        [editPrayer.fulfilled.type]: (state, action) => {
            state.data = action.payload as Prayer[]
        },
        [deletePrayer.fulfilled.type]: (state, action) => {
            state.data = action.payload as Prayer[]
        },
        [deleteAllPrayer.fulfilled.type]: (state, action) => {
            state.data = action.payload as Prayer[]
        },
    },
})

export const { reducer } = prayerSlice
