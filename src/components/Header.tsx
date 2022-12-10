import {HStack, IconButton, Heading, useDisclosure, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useColorMode, Box} from '@chakra-ui/react';
import {ReactElement, useRef} from 'react';
import {AiFillHome, AiOutlineMenu} from 'react-icons/ai';
import {BsMoonFill, BsSunFill} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';

type Props = {
    children: unknown,
    title: string,
    headerBtns?: ReactElement
    drawerBtns?: unknown
}

function Header({children, title, headerBtns, drawerBtns}: Props) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const {colorMode, toggleColorMode} = useColorMode();
  const btnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const gotoHome= () => navigate('/');

  return (
    <>
      <HStack justifyContent="space-between">
        <>
          <Box flex='1'>
            <IconButton
              onClick={onOpen}
              ref={btnRef}
              aria-label="Menu" icon={<AiOutlineMenu/>}/>
          </Box>
          <Box flex='1' textAlign='center'>
            <Heading as="h1">{title}</Heading>
          </Box>
          <Box flex='1' textAlign='right'>
            {headerBtns}
          </Box>
        </>
      </HStack>
      {children}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody experimental_spaceY={2}>
            <>
              <Button onClick={gotoHome} w="full" leftIcon={<AiFillHome/>} justifyContent="flex-start">Home</Button>
              <Button onClick={toggleColorMode} w="full" leftIcon={colorMode === 'light' ? <BsMoonFill/> : <BsSunFill/>} justifyContent="flex-start">Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
              </Button>
              {drawerBtns}
            </>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
