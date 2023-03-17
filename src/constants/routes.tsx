import { Prayer } from '~pages/Prayers'
import { Habits } from '~pages/Habits'
import { ModSelect } from '~pages/ModSelect'

import { App } from '../App'

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
        name: 'Habits',
        path: '/habits',
        destination: <Habits />,
    },
    {
        name: 'Select a Mod',
        path: '/mods',
        destination: <ModSelect />,
    },
]
