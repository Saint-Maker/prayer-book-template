import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { idb } from '~utils/idb'

const defaultState = ['p_ZWA-iUSiMmeeAF', 'eUD9oEbSHr8tEm4R']

export const getSelectedMods = createAsyncThunk('selectedMod/getSelectedMods', async () => {
    let data = (await idb.readData('selectedMods')) || []
    if (!Array.isArray(data) || data.length === 0) {
        data = defaultState
        await idb.writeData('selectedMods', data)
    }
    return data
})
export const setSelectedMods = createAsyncThunk('selectedMod/setSelectedMods', async (selectedMods: string[]) => {
    return idb.writeData('selectedMods', selectedMods)
})
export const addSelectedMod = createAsyncThunk('selectedMod/addSelectedMod', async (selectedMod: string) => {
    const data = (await idb.readData('selectedMods')) || []
    return idb.writeData('selectedMods', [selectedMod, ...data])
})
export const deleteSelectedMod = createAsyncThunk('selectedMod/deleteSelectedMod', async (id: string) => {
    const data = (await idb.readData('selectedMods')) || []
    return idb.writeData(
        'selectedMods',
        data.filter((modId) => modId !== id),
    )
})

const initialState = {
    data: [] as string[],
}

const selectedModSlice = createSlice({
    name: 'selectedMod',
    initialState,
    reducers: {},
    extraReducers: {
        [getSelectedMods.fulfilled.type]: (state, action) => {
            state.data = action.payload || []
        },
        [setSelectedMods.fulfilled.type]: (state, action) => {
            state.data = action.payload
        },
        [addSelectedMod.fulfilled.type]: (state, action) => {
            state.data = action.payload
        },
        [deleteSelectedMod.fulfilled.type]: (state, action) => {
            state.data = action.payload
        },
    },
})

export const { reducer } = selectedModSlice
