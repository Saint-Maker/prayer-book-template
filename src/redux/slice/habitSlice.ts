import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { idb } from '~utils/idb'
import { getUpdatedHabits } from '~utils/getUpdatedHabits'
import { shouldUpdateHabits } from '~utils/shouldUpdateHabits'

export const getHabits = createAsyncThunk('habit/getHabits', async () => {
    let data = ((await idb.readData('habits')) || []) as Habit[]
    if (shouldUpdateHabits()) {
        data = getUpdatedHabits([...data])
        idb.writeData('habits', data)
    }
    return data
})
export const addHabit = createAsyncThunk('habit/addHabit', async (habit: Habit) => {
    const data = (await idb.readData('habits')) || []
    return idb.writeData('habits', [habit, ...data])
})
export const editHabit = createAsyncThunk('habit/editHabit', async (editedHabit: Habit) => {
    const data = (await idb.readData('habits')) || []
    const updatedHabits = data.map((habit) => {
        if ((habit as Habit).id === editedHabit.id) return editedHabit
        return habit
    })
    return idb.writeData('habits', updatedHabits)
})
export const editHabits = createAsyncThunk('habit/editHabits', async (updatedHabits: Habit[]) => {
    return idb.writeData('habits', updatedHabits)
})
export const deleteHabit = createAsyncThunk('habit/deleteHabit', async (id: string) => {
    const data = (await idb.readData('habits')) || []
    return idb.writeData(
        'habits',
        data.filter((habit) => (habit as Habit).id !== id),
    )
})

const initialState = {
    data: [] as Habit[],
    loading: true,
}

const habitSlice = createSlice({
    name: 'habit',
    initialState,
    reducers: {},
    extraReducers: {
        [getHabits.pending.type]: (state) => {
            state.loading = true
        },
        [getHabits.fulfilled.type]: (state, action) => {
            state.data = action.payload || ([] as Habit[])
            state.loading = false
        },
        [addHabit.fulfilled.type]: (state, action) => {
            state.data = action.payload as Habit[]
        },
        [editHabit.fulfilled.type]: (state, action) => {
            state.data = action.payload as Habit[]
        },
        [editHabits.fulfilled.type]: (state, action) => {
            state.data = action.payload as Habit[]
        },
        [deleteHabit.fulfilled.type]: (state, action) => {
            state.data = action.payload as Habit[]
        },
    },
})

export const { reducer } = habitSlice
