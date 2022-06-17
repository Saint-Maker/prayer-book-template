import React, {useEffect, useState, useRef} from 'react';
import {Button, Heading, HStack, IconButton, Input, Textarea, VStack, chakra, Drawer, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerBody, useDisclosure, DrawerHeader, useColorMode} from '@chakra-ui/react';
import {AiOutlineMenu, AiOutlinePlusCircle, AiFillHome} from 'react-icons/ai';
import {BsMoonFill, BsSunFill, BsTrashFill} from 'react-icons/bs';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {nanoid} from 'nanoid';
import autosize from 'react-textarea-autosize';

import {selectPrayers} from '../redux/store';
import {getPrayers, addPrayer} from '../redux/slice/prayerSlice';
import PrayerCard from '../components/PrayerCard';
import Layout from '../components/Layout';

import type {AppDispatch} from '../redux/store';
import DeletePrayerAlert from '../components/DeletePrayerAlert';

function Prayer() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert} = useDisclosure();
  const {colorMode, toggleColorMode} = useColorMode();
  const [title, setTitle] = useState('');
  const [addToggled, setAddToggled] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const prayers = useSelector(selectPrayers);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPrayers());
  }, []);

  const gotoHome= () => navigate('/');

  const addPrayerHandler = (title: string, text: string) => {
    dispatch(addPrayer({
      id: nanoid(16),
      title,
      text,
    }));
  };

  const toggleAdd = () => {
    setAddToggled((state) => {
      setTitle('');
      return !state;
    });
  };

  const titleOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.target as any).title as HTMLInputElement;
    const text = (e.target as any).text as HTMLTextAreaElement;

    addPrayerHandler(title.value, text.value);
    (e.target as HTMLFormElement).reset();
    toggleAdd();
  };

  return (
    <Layout>
      <HStack justifyContent="space-between">
        <IconButton
          onClick={onOpen}
          ref={btnRef}
          aria-label="Menu" icon={<AiOutlineMenu/>}/>
        <Heading as="h1">Prayer Book</Heading>
        <IconButton
          onClick={toggleAdd}
          aria-label="Add prayer" icon={<AiOutlinePlusCircle/>}/>
      </HStack>
      <VStack my="6">
        {addToggled && (
          <chakra.form onSubmit={formSubmitHandler}
            w="full">
            <Input
              name="title"
              onChange={titleOnChangeHandler}
              placeholder="Title..."
              autoComplete='off'
              required/>
            {title.length > 0 && (
              <HStack my={2} alignItems="flex-start">
                <Textarea
                  name="text"
                  as={autosize} resize="none"
                  placeholder="Prayer text..."
                  autoComplete='off'
                  required/>
                <Button type="submit" colorScheme="green">Add</Button>
              </HStack>
            )}
          </chakra.form>
        )}
        {prayers.loading === false && prayers.data.map(({id, ...text}) => {
          return <PrayerCard key={id} id={id} {...text}/>;
        })}
      </VStack>
      <DeletePrayerAlert isOpen={isOpenAlert} onClose={onCloseAlert} all={true}/>
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
            <Button onClick={gotoHome} w="full" leftIcon={<AiFillHome/>} justifyContent="flex-start">Home</Button>
            <Button onClick={toggleColorMode} w="full" leftIcon={colorMode === 'light' ? <BsMoonFill/> : <BsSunFill/>} justifyContent="flex-start">Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
            <Button onClick={onOpenAlert} w="full" leftIcon={<BsTrashFill/>} justifyContent="flex-start" colorScheme="red">Delete all prayer</Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Layout>
  );
}

export default Prayer;
