import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { registerSW } from 'virtual:pwa-register'
import { AnimatePresence } from 'framer-motion'

import { store } from '~store'
import { routes } from '~constants/routes'

import { theme } from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Provider store={store}>
            <AnimatePresence exitBeforeEnter>
                <ChakraProvider theme={theme}>
                    <Router>
                        <Routes>
                            {routes.map((route, index) => (
                                <Route key={`${route.path}-${index}`} path={route.path} element={route.destination} />
                            ))}
                        </Routes>
                    </Router>
                </ChakraProvider>
            </AnimatePresence>
        </Provider>
    </>,
)

if ('serviceWorker' in navigator) {
    registerSW()
}
