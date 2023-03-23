import { Button, Text, Flex, Input, VStack } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AlertModal } from '~components/AlertModal'
import { AppCard } from '~components/AppCard'
import { Header } from '~components/Header'
import { Layout } from '~components/Layout'
import { ModCard } from '~components/ModCard'
import { addCustomMod } from '~slices/customModSlice'
import { addMod, getMods } from '~slices/modSlice'
import { AppDispatch, selectMods } from '~store'

export const ModSelect = () => {
    const dispatch = useDispatch<AppDispatch>()
    const mods = useSelector(selectMods)
    const [isOpen, setIsOpen] = useState(false)
    const nameRef = useRef<HTMLInputElement | null>(null)
    const descriptionRef = useRef<HTMLInputElement | null>(null)
    const urlRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        dispatch(getMods())
    }, [])

    const storeCustomMod = () => {
        if (
            nameRef?.current == undefined ||
            nameRef.current.value.length === 0 ||
            descriptionRef?.current == undefined ||
            descriptionRef.current.value.length === 0 ||
            urlRef?.current == undefined ||
            urlRef.current.value.length === 0
        )
            return
        dispatch(
            addCustomMod({
                id: nanoid(16),
                name: nameRef.current.value,
                isNative: false,
                path: urlRef.current.value,
                description: descriptionRef.current.value,
                issuesPageLink: '',
            }),
        )
        dispatch(
            addMod({
                id: nanoid(16),
                name: nameRef.current.value,
                isNative: false,
                path: urlRef.current.value,
                description: descriptionRef.current.value,
                issuesPageLink: '',
            }),
        )
        nameRef.current.value = ''
        descriptionRef.current.value = ''
        urlRef.current.value = ''
    }

    return (
        <>
            <Layout>
                <Header title="Add an Application">
                    <Flex direction="column" pt="2" gap="2">
                        {mods.data.map((mod: Mod, index) => (
                            <ModCard key={`${mod.name}-${index}`} mod={mod} />
                        ))}
                        <AppCard
                            heading="Add Unlisted Application"
                            description="Know of an application you'd like to add that isn't listed here? Click the
                                &quot;Add Custom&quot; button below to add it."
                            footer={
                                <Button variant="outline" onClick={() => setIsOpen(true)}>
                                    Add Custom
                                </Button>
                            }
                        />
                    </Flex>
                </Header>
            </Layout>
            <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={storeCustomMod}
                header="Add a Custom Application"
                body={
                    <>
                        <Text pb="2">
                            WARNING: Custom applications are not curated, ensure that you trust them before connecting
                            to them.
                        </Text>
                        <Text pb="2">
                            Enter the name, description, and url path of the custom application below and then click
                            &quot;Add&quot; to include it with your current applications.
                        </Text>
                        <VStack w="full">
                            <Input ref={nameRef} placeholder="Name" />
                            <Input ref={descriptionRef} placeholder="Description" />
                            <Input ref={urlRef} placeholder="URL" />
                        </VStack>
                    </>
                }
                confirmBtnText="Add"
                confirmBtnColor="red"
                cancelBtnText="Cancel"
            />
        </>
    )
}
