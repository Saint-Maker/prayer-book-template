import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { idb } from '~utils/idb'

const defaultState = {
    'p_ZWA-iUSiMmeeAF': true,
    eUD9oEbSHr8tEm4R: true,
}

export const getSelectedMods = createAsyncThunk('selectedMod/getSelectedMods', async () => {
    let data = (await idb.readObject('selectedMods')) || {}
    if (Object.keys(data).length === 0) {
        data = defaultState
        await idb.writeObject('selectedMods', data)
    }
    return data
})
export const upsertSelectedMod = createAsyncThunk(
    'selectedMod/editSelectedMod',
    async (selectedMod: Record<string, boolean>) => {
        const data: SelectedMods = ((await idb.readObject('selectedMods')) || {}) as SelectedMods
        const key = Object.keys(selectedMod)[0]
        const value = Object.values(selectedMod)[0]
        data[key] = value
        return idb.writeObject('selectedMods', data)
    },
)

const initialState = {
    data: {} as SelectedMods,
}

const selectedModSlice = createSlice({
    name: 'selectedMod',
    initialState,
    reducers: {},
    extraReducers: {
        [getSelectedMods.fulfilled.type]: (state, action) => {
            state.data = action.payload || ({} as SelectedMods)
        },
        [upsertSelectedMod.fulfilled.type]: (state, action) => {
            state.data = action.payload as SelectedMods
        },
    },
})

export const { reducer } = selectedModSlice
