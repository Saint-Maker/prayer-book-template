import { Text, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Header } from '~components/Header'
import { Layout } from '~components/Layout'

interface IModDetails {
    name: string
    isNative: boolean
    path: string
    description: string
    inUse: boolean
}

export const ModSelect = () => {
    const navigate = useNavigate()
    const [modList, setModList] = useState<IModDetails[]>([
        {
            name: 'Prayer Book',
            isNative: true,
            path: '/prayers',
            description: 'A prayer book to store various prayers.',
            inUse: true,
        },
        {
            name: 'Habits',
            isNative: true,
            path: '/habits',
            description:
                'A basic habit tracker. Allows you to store 4 weeks of history on an unlimited amount of daily habits.',
            inUse: true,
        },
        {
            name: 'Examen',
            isNative: false,
            path: 'https://strong-narwhal-15f3cb.netlify.app/',
            description: 'A basic examination of conscience application.',
            inUse: false,
        },
    ])

    return (
        <Layout>
            <Header title="Add an Application">
                <Flex direction="column" pt="2" gap="2">
                    {modList.map((mod: IModDetails, index) => (
                        <Card align="center" key={`${mod.name}-${index}`}>
                            <CardHeader>
                                <Heading size="md">{mod.name}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>{mod.description}</Text>
                            </CardBody>
                            <CardFooter gap="2">
                                {mod.isNative ? (
                                    <Button onClick={() => navigate(mod.path)}>View here</Button>
                                ) : (
                                    <Button as="a" href={mod.path} target="_blank">
                                        View here
                                    </Button>
                                )}
                                {mod.inUse ? (
                                    <Button variant="outline">Remove from home</Button>
                                ) : (
                                    <Button variant="outline">Add to home</Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                    <Card align="center">
                        <CardHeader>
                            <Heading size="md">Add Unlisted Application</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text>
                                Know of an application you&apos;d like to add that isn&apos;t listed here? Click the
                                &quot;Add Custom&quot; button below to add it.
                            </Text>
                        </CardBody>
                        <CardFooter>
                            <Button variant="outline">Add Custom</Button>
                        </CardFooter>
                    </Card>
                </Flex>
            </Header>
        </Layout>
    )
}
