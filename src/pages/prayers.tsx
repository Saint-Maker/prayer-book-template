import React, {useEffect, useState} from 'react';
import {Button, HStack, Input, VStack, chakra, IconButton, useDisclosure} from '@chakra-ui/react';
import {useSelector, useDispatch} from 'react-redux';
import {nanoid} from 'nanoid';

import {selectPrayers} from '../redux/store';
import {getPrayers, addPrayer, editPrayer} from '../redux/slice/prayerSlice';
import PrayerCard from '../components/PrayerCard';
import Layout from '../components/Layout';

import type {AppDispatch} from '../redux/store';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/pagesPrayers.css';
import Header from '../components/Header';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import DeletePrayerAlert from '../components/DeletePrayerAlert';
import {BsTrashFill} from 'react-icons/bs';

function Prayer() {
  const {isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert} = useDisclosure();
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [addToggled, setAddToggled] = useState(false);
  const [editing, setEditing] = useState(false);
  const [prayerId, setPrayerId] = useState('');
  const prayers = useSelector(selectPrayers);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPrayers());
  }, []);

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
      <Header
        title='Prayer Book'
        headerBtns={<IconButton
          onClick={toggleAdd}
          aria-label="Add prayer"
          icon={<AiOutlinePlusCircle/>}/>}
        drawerBtns={<Button
          onClick={onOpenAlert}
          w="full"
          leftIcon={<BsTrashFill/>}
          justifyContent="flex-start"
          colorScheme="red">Delete all prayer</Button>}>
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
      </Header>
    </Layout>
  );
}

export default Prayer;
