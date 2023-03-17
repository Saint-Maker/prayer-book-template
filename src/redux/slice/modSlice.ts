import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { idb } from '~utils/idb'

// @ts-ignore
import defaultModData from './../../defaultModData.json'

export const getMods = createAsyncThunk('mod/getMods', async () => {
    const data = defaultModData
    await idb.writeData('mods', data)
    return data
})
export const addMod = createAsyncThunk('mod/addMod', async (mod: Mod) => {
    const data = (await idb.readData('mods')) || []
    return idb.writeData('mods', [mod, ...data])
})
export const editMod = createAsyncThunk('mod/editMod', async (editedMod: Mod) => {
    const data = (await idb.readData('mods')) || []
    const updatedMods = data.map((mod) => {
        if ((mod as Mod).id === editedMod.id) return editedMod
        return mod
    })
    return idb.writeData('mods', updatedMods)
})
export const editMods = createAsyncThunk('mod/editMods', async (updatedMods: Mod[]) => {
    return idb.writeData('mods', updatedMods)
})
export const deleteMod = createAsyncThunk('mod/deleteMod', async (id: string) => {
    const data = (await idb.readData('mods')) || []
    return idb.writeData(
        'mods',
        data.filter((mod) => (mod as Mod).id !== id),
    )
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
        [editMods.fulfilled.type]: (state, action) => {
            state.data = action.payload as Mod[]
        },
        [deleteMod.fulfilled.type]: (state, action) => {
            state.data = action.payload as Mod[]
        },
    },
})

export const { reducer } = modSlice
