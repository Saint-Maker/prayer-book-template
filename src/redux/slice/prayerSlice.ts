import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import { idb } from '~utils/idb'

import defaultPrayerData from './../../defaultPrayerData.json'

export const getPrayers = createAsyncThunk('prayer/getPrayers', async () => {
    let prayers = (await idb.readData('prayers')) || []
    if (prayers.length === 0) {
        prayers = defaultPrayerData.map((prayer: Partial<Prayer>) => ({ ...prayer, id: nanoid(16) }))
        await idb.writeData('prayers', prayers)
    }
    return prayers
})
export const addPrayer = createAsyncThunk('prayer/addPrayer', async (prayer: Prayer) => {
    const data = (await idb.readData('prayers')) || []
    return idb.writeData('prayers', [prayer, ...data])
})
export const setPrayers = createAsyncThunk('prayer/setPrayers', async (prayers: Prayer[]) => {
    return idb.writeData('prayers', prayers)
})
export const editPrayer = createAsyncThunk('prayer/editPrayer', async (editedPrayer: Prayer) => {
    const data = (await idb.readData('prayers')) || []
    const updatedPrayers = data.map((prayer) => {
        if ((prayer as Prayer).id === editedPrayer.id) return editedPrayer
        return prayer
    })
    return idb.writeData('prayers', updatedPrayers)
})
export const deletePrayer = createAsyncThunk('prayer/deletePrayer', async (id: string) => {
    const data = (await idb.readData('prayers')) || []
    return idb.writeData(
        'prayers',
        data.filter((prayer) => (prayer as Prayer).id !== id),
    )
})
export const deleteAllPrayer = createAsyncThunk('prayer/deleteAllPrayer', async () => {
    return idb.writeData('prayers', [])
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
