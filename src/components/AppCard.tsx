import { Card, Text, CardHeader, Heading, CardBody, CardFooter, Button } from '@chakra-ui/react'
import React from 'react'

interface IAppCard {
    heading: string
    description: string
    footer: React.ReactNode
}

export const AppCard = ({ heading, description, footer }: IAppCard) => {
    return (
        <Card align="center">
            <CardHeader>
                <Heading size="md">{heading}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{description}</Text>
            </CardBody>
            <CardFooter gap="2">{footer}</CardFooter>
        </Card>
    )
}
