import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMods } from '~slices/modSlice'
import { getSelectedMods } from '~slices/selectedModSlice'
import { AppDispatch, selectMods, selectSelectedMods } from '~store'

export const sortedModHook = () => {
    const dispatch = useDispatch<AppDispatch>()
    const mods = useSelector(selectMods)
    const selectedMods = useSelector(selectSelectedMods)
    const [sortedMods, setSortedMods] = useState<Mod[]>([])

    useEffect(() => {
        dispatch(getSelectedMods())
        dispatch(getMods())
    }, [])

    useEffect(() => {
        const modsSorted: Mod[] = []
        selectedMods.data.forEach((modId) => {
            mods.data.find((mod) => {
                if (mod.id === modId) modsSorted.push(mod)
            })
        })
        setSortedMods(modsSorted)
    }, [mods, selectedMods])

    return {
        sortedMods,
        setSortedMods,
    }
}
