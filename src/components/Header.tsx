import {
    HStack,
    IconButton,
    Heading,
    useDisclosure,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useColorMode,
    Box,
    Flex,
} from '@chakra-ui/react'
import { ReactElement, ReactNode, useRef } from 'react'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { BsListUl, BsMoonFill, BsSunFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import { ModHeaderBtnLink } from '~components/ModHeaderBtnLink'

import { sortedModHook } from '../hooks/sortedModHook'

type Props = {
    children: unknown
    title: string
    headerBtns?: ReactElement
    drawerBtns?: ReactNode
}

export const Header = ({ children, title, headerBtns, drawerBtns }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { colorMode, toggleColorMode } = useColorMode()
    const btnRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate()
    const { sortedMods } = sortedModHook()

    return (
        <>
            <HStack justifyContent="space-between">
                <>
                    <Box flex="1">
                        <IconButton onClick={onOpen} ref={btnRef} aria-label="Menu" icon={<AiOutlineMenu />} />
                    </Box>
                    <Box flex="1" textAlign="center">
                        <Heading as="h1">{title}</Heading>
                    </Box>
                    <Box flex="1" textAlign="right">
                        {headerBtns}
                    </Box>
                </>
            </HStack>
            {children}
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody display="flex">
                        <Flex display="flex" direction="column" gap="2" width="100%">
                            <Button
                                onClick={() => navigate('/')}
                                w="full"
                                leftIcon={<AiFillHome />}
                                justifyContent="flex-start"
                            >
                                Home
                            </Button>
                            {sortedMods.map((mod: Mod, index: number) => (
                                <ModHeaderBtnLink mod={mod} key={`${mod.name}-${index}`} />
                            ))}
                            <Button
                                onClick={() => navigate('/mods')}
                                disabled={window.location.pathname === '/mods'}
                                w="full"
                                leftIcon={<BsListUl />}
                                justifyContent="flex-start"
                            >
                                Add an Application
                            </Button>
                            <Button
                                onClick={toggleColorMode}
                                w="full"
                                leftIcon={colorMode === 'light' ? <BsMoonFill /> : <BsSunFill />}
                                justifyContent="flex-start"
                            >
                                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                            </Button>
                            {drawerBtns}
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
