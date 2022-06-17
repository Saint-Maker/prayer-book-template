import React from 'react';
import {Button, Heading, VStack} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import Layout from './components/Layout';
import {selectPWA} from './redux/store';
import {setDeferredPrompt} from './redux/slice/PWASlice';

import type {AppDispatch} from './redux/store';

function App(): JSX.Element {
  const pwa = useSelector(selectPWA);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const gotoPrayers = () => navigate('/prayers');

  const installHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pwa.deferredPrompt !== null) {
      pwa.deferredPrompt.prompt();
      const {outcome} = await pwa.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        dispatch(setDeferredPrompt(null));
      }
    }
  };

  return (<Layout>
    <Heading as="h1" textAlign="center" py="4" size="2xl">Saint Maker</Heading>
    <VStack w="full">
      <Button
        onClick={gotoPrayers}
        w="full">Prayer Book</Button>
      <Button onClick={installHandler} style={{
        display: pwa.deferredPrompt ? 'block' : 'none',
      }} w="full" colorScheme="blue">Install</Button>
    </VStack>
  </Layout>);
}

export default App;
