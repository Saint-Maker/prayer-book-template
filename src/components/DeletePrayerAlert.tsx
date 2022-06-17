import React, {useRef} from 'react';

import {AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {deletePrayer, deleteAllPrayer} from '../redux/slice/prayerSlice';

import type {AppDispatch} from '../redux/store';

type Props = {
  isOpen: boolean, onClose: () => void,
  all?: boolean,
  id?: string,
}

function DeletePrayerAlert({isOpen, onClose, all, id}: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    if (id) {
      dispatch(deletePrayer(id));
      onClose();
    }
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllPrayer());
    onClose();
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{all ? 'Delete all prayer' : 'Delete prayer'}</AlertDialogHeader>
          <AlertDialogBody>
        Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
            Cancel
            </Button>
            <Button colorScheme='red' onClick={all ? handleDeleteAll : handleDelete} ml={3}>
            Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default DeletePrayerAlert;
