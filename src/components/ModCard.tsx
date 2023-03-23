import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import { upsertSelectedMod } from '~slices/selectedModSlice'
import { AppDispatch, selectSelectedMods } from '~store'
import { AppCard } from '~components/AppCard'
import { ModBtnLink } from '~components/ModBtnLink'

interface ModCardProps {
    mod: Mod
}

export const ModCard = ({ mod }: ModCardProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const selectedMods = useSelector(selectSelectedMods)

    const toggleModUsage = (mod: Mod) => {
        dispatch(upsertSelectedMod({ [mod.id]: !(selectedMods.data[mod.id] ?? false) }))
    }

    return (
        <AppCard
            heading={mod.name}
            description={mod.description}
            footer={
                <>
                    <ModBtnLink mod={mod} btnText="View here" target="_blank" />
                    <Button variant="outline" onClick={() => toggleModUsage(mod)}>
                        {selectedMods.data[mod.id] ?? false ? 'Remove from home' : 'Add to home'}
                    </Button>
                    {'issuesPageLink' in mod && mod.issuesPageLink && (
                        <Button as="a" href={mod.issuesPageLink} target="_blank" variant="outline" colorScheme="red">
                            Report Issue
                        </Button>
                    )}
                </>
            }
        />
    )
}
