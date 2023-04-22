import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { idb } from '~utils/idb'
import { sliceAdd, sliceDeleteSingle, sliceEdit, sliceSet } from '~slices/utils/sliceTools'

// @ts-ignore
import defaultModData from './../../defaultModData.json'

export const getMods = createAsyncThunk('mod/getMods', async () => {
    const defaultMods = defaultModData
    const customMods = (await idb.readData('customMods')) || []
    const allMods = [...defaultMods, ...customMods]
    await idb.writeData('mods', allMods)
    return allMods
})
export const addMod = createAsyncThunk('mod/addMod', async (mod: Mod) => {
    return await sliceAdd(mod, 'mods')
})
export const editMod = createAsyncThunk('mod/editMod', async (editedMod: Mod) => {
    return await sliceEdit(editedMod, 'mods')
})
export const setMods = createAsyncThunk('mod/setMods', async (mods: Mod[]) => {
    return sliceSet(mods, 'mods')
})
export const deleteMod = createAsyncThunk('mod/deleteMod', async (id: string) => {
    return await sliceDeleteSingle(id, 'prayers')
})

const initialState = {
    data: [] as Mod[],
    loading: true,
}

const modSlice = createSlice({
    name: 'mod',
    initialState,
    reducers: {},
    extraReducers: {
        [getMods.pending.type]: (state) => {
            state.loading = true
        },
        [getMods.fulfilled.type]: (state, action) => {
            state.data = action.payload || ([] as Mod[])
            state.loading = false
        },
        [addMod.fulfilled.type]: (state, action) => {
            state.data = action.payload as Mod[]
        },
        [editMod.fulfilled.type]: (state, action) => {
            state.data = action.payload as Mod[]
        },
        [setMods.fulfilled.type]: (state, action) => {
            state.data = action.payload as Mod[]
        },
        [deleteMod.fulfilled.type]: (state, action) => {
            state.data = action.payload as Mod[]
        },
    },
})

export const { reducer } = modSlice
