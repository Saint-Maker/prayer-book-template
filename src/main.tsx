import ReactDOM from "react-dom/client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { Provider } from "react-redux"
import { registerSW } from "virtual:pwa-register"
import { AnimatePresence } from "framer-motion"
import store from "./redux/store"

import Prayers from "./pages/prayers"
import theme from "./theme"
import App from "./App"
import Habits from "./pages/habits"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <AnimatePresence exitBeforeEnter>
        <ChakraProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/prayers" element={<Prayers />} />
              <Route path="/habits" element={<Habits />} />
            </Routes>
          </Router>
        </ChakraProvider>
      </AnimatePresence>
    </Provider>
  </>
)

if ("serviceWorker" in navigator) {
  registerSW()
}
