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
import { ReactElement, ReactNode, useEffect, useRef } from 'react'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { BsListUl, BsMoonFill, BsSunFill } from 'react-icons/bs'
import { GiPrayer } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getMods } from '~slices/modSlice'
import { AppDispatch, selectMods } from '~store'
import { ModBtnLink } from '~components/ModBtnLink'
import { ModHeaderBtnLink } from '~components/ModHeaderBtnLink'

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
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const mods = useSelector(selectMods)

    useEffect(() => {
        dispatch(getMods())
    }, [])

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
                            {mods.data
                                .filter((mod: Mod) => mod.inUse === true)
                                .map((mod: Mod, index: number) => (
                                    <ModHeaderBtnLink mod={mod} key={`${mod.name}-${index}`} />
                                ))}

                            <Button
                                onClick={() => navigate('/mods')}
                                disabled={window.location.pathname === '/mods'}
                                w="full"
                                leftIcon={<BsListUl />}
                                justifyContent="flex-start"
                            >
                                Select a Mod
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
