import React, { useState } from 'react'
import { Button, Heading, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectPWA } from '~store'
import { setDeferredPrompt } from '~slices/pwaSlice'
import type { AppDispatch } from '~store'
import { Layout } from '~components/Layout'

export const App = (): JSX.Element => {
    const pwa = useSelector(selectPWA)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

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
                <Button onClick={() => navigate('/prayers')} w="full">
                    Prayer Book
                </Button>
                <Button onClick={() => navigate('/habits')} w="full">
                    Habits
                </Button>
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
