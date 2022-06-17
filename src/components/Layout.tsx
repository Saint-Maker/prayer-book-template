import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {motion, isValidMotionProp} from 'framer-motion';
import {chakra} from '@chakra-ui/react';

import {setDeferredPrompt} from '../redux/slice/PWASlice';

import type {AppDispatch} from '../redux/store';

type Props = {
  children: React.ReactNode;
}

function Layout({children}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      dispatch(setDeferredPrompt(e as BeforeInstallPromptEvent));
    });
  }, []);


  return (
    <CustomBox variants={thisVariant} initial="initial" animate="animate" exit="exit" p="2">
      {children}
    </CustomBox>
  );
}

const CustomBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

const thisVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
  },
};

export default Layout;
