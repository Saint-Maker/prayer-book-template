import { Button, Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppCard } from '~components/AppCard'
import { Header } from '~components/Header'
import { Layout } from '~components/Layout'
import { ModBtnLink } from '~components/ModBtnLink'
import { getMods } from '~slices/modSlice'
import { getSelectedMods, upsertSelectedMod } from '~slices/selectedModSlice'
import { AppDispatch, selectMods, selectSelectedMods } from '~store'

export const ModSelect = () => {
    const dispatch = useDispatch<AppDispatch>()
    const mods = useSelector(selectMods)
    const selectedMods = useSelector(selectSelectedMods)

    useEffect(() => {
        dispatch(getSelectedMods())
        dispatch(getMods())
    }, [])

    const toggleModUsage = (mod: Mod) => {
        dispatch(upsertSelectedMod({ [mod.id]: !(selectedMods.data[mod.id] ?? false) }))
    }

    return (
        <>
            <Layout>
                <Header title="Add an Application">
                    <Flex direction="column" pt="2" gap="2">
                        {mods.data.map((mod: Mod, index) => (
                            <AppCard
                                key={`${mod.name}-${index}`}
                                heading={mod.name}
                                description={mod.description}
                                footer={
                                    <>
                                        <ModBtnLink mod={mod} btnText="View here" target="_blank" />
                                        <Button variant="outline" onClick={() => toggleModUsage(mod)}>
                                            {selectedMods.data[mod.id] ?? false ? 'Remove from home' : 'Add to home'}
                                        </Button>
                                        {mod.issuesPageLink && (
                                            <Button
                                                as="a"
                                                href={mod.issuesPageLink}
                                                target="_blank"
                                                variant="outline"
                                                colorScheme="red"
                                            >
                                                Report Issue
                                            </Button>
                                        )}
                                    </>
                                }
                            />
                        ))}
                    </Flex>
                </Header>
            </Layout>
        </>
    )
}
