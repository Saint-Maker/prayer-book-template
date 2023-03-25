import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { idb } from '~utils/idb'

export const getCustomMods = createAsyncThunk('customMod/getCustomMods', async () => {
    return (await idb.readData('customMods')) || []
})
export const addCustomMod = createAsyncThunk('customMod/addCustomMod', async (customMod: Mod) => {
    const data = (await idb.readData('customMods')) || []
    return idb.writeData('customMods', [customMod, ...data])
})
export const editCustomMod = createAsyncThunk('customMod/editCustomMod', async (editedCustomMod: Mod) => {
    const data = (await idb.readData('customMods')) || []
    const updatedCustomMods = data.map((customMod) => {
        if ((customMod as Mod).id === editedCustomMod.id) return editedCustomMod
        return customMod
    })
    return idb.writeData('customMods', updatedCustomMods)
})
export const editCustomMods = createAsyncThunk('customMod/editCustomMods', async (updatedCustomMods: Mod[]) => {
    return idb.writeData('customMods', updatedCustomMods)
})
export const deleteCustomMod = createAsyncThunk('customMod/deleteCustomMod', async (id: string) => {
    const data = (await idb.readData('customMods')) || []
    return idb.writeData(
        'customMods',
        data.filter((customMod) => (customMod as Mod).id !== id),
    )
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
        [editCustomMods.fulfilled.type]: (state, action) => {
            state.data = action.payload as Mod[]
        },
        [deleteCustomMod.fulfilled.type]: (state, action) => {
            state.data = action.payload as Mod[]
        },
    },
})

export const { reducer } = customModSlice
