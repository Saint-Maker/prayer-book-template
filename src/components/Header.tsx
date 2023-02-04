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
import { GiPrayer } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

type Props = {
    children: unknown
    title: string
    headerBtns?: ReactElement
    drawerBtns?: ReactNode
}

const Header = ({ children, title, headerBtns, drawerBtns }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { colorMode, toggleColorMode } = useColorMode()
    const btnRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate()
    const gotoHome = () => navigate('/')
    const gotoPrayers = () => navigate('/prayers')
    const gotoHabits = () => navigate('/habits')

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
                    <DrawerBody display="flex" experimental_spaceY={2}>
                        <Flex display="flex" direction="column" gap="2" width="100%">
                            <Button onClick={gotoHome} w="full" leftIcon={<AiFillHome />} justifyContent="flex-start">
                                Home
                            </Button>
                            <Button
                                onClick={gotoPrayers}
                                disabled={window.location.pathname === '/prayers'}
                                w="full"
                                leftIcon={<GiPrayer />}
                                justifyContent="flex-start"
                            >
                                Prayer Book
                            </Button>
                            <Button
                                onClick={gotoHabits}
                                disabled={window.location.pathname === '/habits'}
                                w="full"
                                leftIcon={<BsListUl />}
                                justifyContent="flex-start"
                            >
                                Habits
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

export default Header
