import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { sliceGet, sliceAdd, sliceEdit, sliceDeleteSingle } from '~slices/utils/sliceTools'

export const getCustomMods = createAsyncThunk('customMod/getCustomMods', async () => {
    return await sliceGet('customMods')
})
export const addCustomMod = createAsyncThunk('customMod/addCustomMod', async (customMod: Mod) => {
    return await sliceAdd(customMod, 'customMods')
})
export const editCustomMod = createAsyncThunk('customMod/editCustomMod', async (editedCustomMod: Mod) => {
    return await sliceEdit(editedCustomMod, 'customMods')
})
export const deleteCustomMod = createAsyncThunk('customMod/deleteCustomMod', async (id: string) => {
    return await sliceDeleteSingle(id, 'customMods')
})

const initialState = {
    data: [] as Mod[],
}

const customModSlice = createSlice({
    name: 'customMod',
    initialState,
    reducers: {},
    extraReducers: {
        [getCustomMods.fulfilled.type]: (state, action) => {
            state.data = action.payload || ([] as Mod[])
        },
        [addCustomMod.fulfilled.type]: (state, action) => {
            state.data = action.payload as Mod[]
        },
        [editCustomMod.fulfilled.type]: (state, action) => {
            state.data = action.payload as Mod[]
        },
        [deleteCustomMod.fulfilled.type]: (state, action) => {
            state.data = action.payload as Mod[]
        },
    },
})

export const { reducer } = customModSlice
