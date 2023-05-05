import { Prayer } from '~pages/Prayers'
import { ModSelect } from '~pages/ModSelect'
import { App } from '~pages/App'

export const routes = [
    {
        name: 'Home',
        path: '/',
        destination: <App />,
    },
    {
        name: 'Prayer Book',
        path: '/prayers',
        destination: <Prayer />,
    },
    {
        name: 'Select a Mod',
        path: '/mods',
        destination: <ModSelect />,
    },
]
