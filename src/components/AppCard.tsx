import { Card, Text, CardHeader, Heading, CardBody, CardFooter } from '@chakra-ui/react'
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
                <Text maxWidth="400px">{description}</Text>
            </CardBody>
            <CardFooter gap="2" flexWrap="wrap" justifyContent="center">
                {footer}
            </CardFooter>
        </Card>
    )
}
