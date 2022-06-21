import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react';
import {Provider} from 'react-redux';
import {registerSW} from 'virtual:pwa-register';
import {AnimatePresence} from 'framer-motion';
import store from './redux/store';

import Prayers from './pages/prayers';
import theme from './theme';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      <Provider store={store}>
        <AnimatePresence exitBeforeEnter>
          <ChakraProvider theme={theme}>
            <Router>
              <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/prayers" element={<Prayers/>}/>
              </Routes>
            </Router>
          </ChakraProvider>
        </AnimatePresence>
      </Provider>
    </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  registerSW();
}
