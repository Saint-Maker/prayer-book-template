import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { sliceGet, sliceSet, sliceAdd } from '~slices/utils/sliceTools'
import { idb } from '~utils/idb'

const defaultState = ['piKfm_vdfBOEtu_X', 'eUD9oEbSHr8tEm4R', 'OGVsyww1fJ4nUcgp']

export const getSelectedMods = createAsyncThunk('selectedMod/getSelectedMods', async () => {
    return await sliceGet('selectedMods', defaultState)
})
export const setSelectedMods = createAsyncThunk('selectedMod/setSelectedMods', async (selectedMods: string[]) => {
    return sliceSet(selectedMods, 'selectedMods')
})
export const addSelectedMod = createAsyncThunk('selectedMod/addSelectedMod', async (selectedMod: string) => {
    return await sliceAdd(selectedMod, 'selectedMods')
})
export const deleteSelectedMod = createAsyncThunk('selectedMod/deleteSelectedMod', async (selectedModId: string) => {
    const data = (await idb.readData('selectedMods')) || []
    return idb.writeData(
        'selectedMods',
        data.filter((id: any) => id !== selectedModId),
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
