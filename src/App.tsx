import React, { useEffect, useState } from 'react'
import { Button, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { DndContext, closestCenter, useSensors, KeyboardSensor, PointerSensor, useSensor } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DragEndEvent } from '@dnd-kit/core/dist/types'

import { selectMods, selectPWA, selectSelectedMods } from '~store'
import { setDeferredPrompt } from '~slices/pwaSlice'
import type { AppDispatch } from '~store'
import { Layout } from '~components/Layout'
import { getMods } from '~slices/modSlice'
import { ModBtnLink } from '~components/ModBtnLink'
import { getSelectedMods, setSelectedMods } from '~slices/selectedModSlice'
import { Header } from '~components/Header'
import './global.css'

export const App = (): JSX.Element => {
    const pwa = useSelector(selectPWA)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const mods = useSelector(selectMods)
    const selectedMods = useSelector(selectSelectedMods)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )
    const [sortedMods, setSortedMods] = useState<Mod[]>([])
    const [isSortingMods, setIsSortingMods] = useState(false)

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

    const installHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (pwa.deferredPrompt !== null) {
            await pwa.deferredPrompt.prompt()
            const { outcome } = await pwa.deferredPrompt.userChoice
            if (outcome === 'accepted') {
                dispatch(setDeferredPrompt(null))
            }
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over === null) return
        if (active.id !== over.id) {
            setSortedMods((mods) => {
                const oldIndex = mods.findIndex((mod) => mod.id === active.id)
                const newIndex = mods.findIndex((mod) => mod.id === over.id)
                const sortedMods = arrayMove(mods, oldIndex, newIndex)
                dispatch(setSelectedMods(sortedMods.map((mod) => mod.id)))
                return sortedMods
            })
        }
    }

    return (
        <Layout>
            <Header
                title="Saint Maker"
                headerBtns={<Button onClick={() => setIsSortingMods(!isSortingMods)}>Sort Apps</Button>}
            >
                <VStack w="full" my="6">
                    {isSortingMods ? (
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={sortedMods} strategy={verticalListSortingStrategy}>
                                {sortedMods.map((mod: Mod, index: number) => (
                                    <ModBtnLink
                                        key={`${mod.name}-${index}`}
                                        mod={mod}
                                        btnText={mod.name}
                                        width="full"
                                        isSorting={true}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    ) : (
                        sortedMods.map((mod: Mod, index: number) => (
                            <ModBtnLink key={`${mod.name}-${index}`} mod={mod} btnText={mod.name} width="full" />
                        ))
                    )}

                    <Button onClick={() => navigate('/mods')} w="full">
                        Add More
                    </Button>
                    <Button
                        onClick={void installHandler}
                        display={pwa.deferredPrompt ? 'block' : 'none'}
                        w="full"
                        colorScheme="blue"
                    >
                        Install
                    </Button>
                </VStack>
            </Header>
        </Layout>
    )
}
