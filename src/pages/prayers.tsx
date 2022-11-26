import React, {useEffect, useState, useRef} from 'react';
import {Button, Heading, HStack, IconButton, Input, Textarea, VStack, chakra, Drawer, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerBody, useDisclosure, DrawerHeader, useColorMode} from '@chakra-ui/react';
import {AiOutlineMenu, AiOutlinePlusCircle, AiFillHome} from 'react-icons/ai';
import {BsMoonFill, BsSunFill, BsTrashFill} from 'react-icons/bs';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {nanoid} from 'nanoid';

import {selectPrayers} from '../redux/store';
import {getPrayers, addPrayer, editPrayer} from '../redux/slice/prayerSlice';
import PrayerCard from '../components/PrayerCard';
import Layout from '../components/Layout';

import type {AppDispatch} from '../redux/store';
import DeletePrayerAlert from '../components/DeletePrayerAlert';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/pagesPrayers.css';

function Prayer() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert} = useDisclosure();
  const {colorMode, toggleColorMode} = useColorMode();
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [addToggled, setAddToggled] = useState(false);
  const [editing, setEditing] = useState(false);
  const [prayerId, setPrayerId] = useState('');
  const btnRef = useRef<HTMLButtonElement>(null);
  const prayers = useSelector(selectPrayers);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPrayers());
  }, []);

  const gotoHome= () => navigate('/');

  const addOrEditPrayerHandler = (id: string, title: string, text: string) => {
    if (editing) {
      dispatch(editPrayer({
        id,
        title,
        text,
      }));
    } else {
      dispatch(addPrayer({
        id: nanoid(16),
        title,
        text,
      }));
    }
  };

  const toggleAdd = () => {
    setAddToggled((state) => {
      setTitle('');
      setText('');
      setEditing(false);
      setPrayerId('');
      return !state;
    });
  };

  const titleOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.target as any).title as HTMLInputElement;

    addOrEditPrayerHandler(prayerId, title.value, text);
    (e.target as HTMLFormElement).reset();
    toggleAdd();
  };

  const editingPrayer = (id: string, text: string, title: string) => {
    setEditing(true);
    setPrayerId(id);
    setTitle(title);
    setText(text);
    setAddToggled(true);
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
              value={title}
              onChange={titleOnChangeHandler}
              placeholder="Title..."
              autoComplete='off'
              required/>
            {title.length > 0 && (
              <HStack my={2} alignItems="flex-start">
                <ReactQuill
                  placeholder="Prayer text..."
                  theme="snow"
                  value={text}
                  onChange={setText} />;
                <Button type="submit" colorScheme="green">{editing ? 'Update' : 'Add'}</Button>
              </HStack>
            )}
          </chakra.form>
        )}
        {prayers.loading === false && prayers.data.filter(({id, ...text}) => id !== prayerId).map(({id, ...text}) => {
          return <PrayerCard key={id} id={id} {...text} onEdit={() => editingPrayer(id, text.text, text.title)}/>;
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
