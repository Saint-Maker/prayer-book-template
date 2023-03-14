import React, { useEffect, useState } from 'react'
import { Button, Heading, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectMods, selectPWA } from '~store'
import { setDeferredPrompt } from '~slices/pwaSlice'
import type { AppDispatch } from '~store'
import { Layout } from '~components/Layout'
import { getMods } from '~slices/modSlice'
import { ModBtnLink } from '~components/ModBtnLink'

export const App = (): JSX.Element => {
    const pwa = useSelector(selectPWA)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const mods = useSelector(selectMods)

    useEffect(() => {
        dispatch(getMods())
    }, [])

    const installHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (pwa.deferredPrompt !== null) {
            await pwa.deferredPrompt.prompt()
            const { outcome } = await pwa.deferredPrompt.userChoice
            if (outcome === 'accepted') {
                dispatch(setDeferredPrompt(null))
            }
        }
    }

    return (
        <Layout>
            <Heading as="h1" textAlign="center" py="4" size="2xl">
                Saint Maker
            </Heading>
            <VStack w="full">
                {mods.data
                    .filter((mod: Mod) => mod.inUse === true)
                    .map((mod: Mod, index: number) => (
                        <ModBtnLink key={`${mod.name}-${index}`} mod={mod} btnText={mod.name} width="full" />
                    ))}
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
        </Layout>
    )
}
