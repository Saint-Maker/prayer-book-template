import React from 'react'

const HomeComponent = React.lazy(() => import('../pages/App'))
const PrayerBookComponent = React.lazy(() => import('../pages/Prayers'))
const HabitsComponent = React.lazy(() => import('../pages/Habits'))
const ModSelectComponent = React.lazy(() => import('../pages/ModSelect'))

export const routes = [
    {
        name: 'Home',
        path: '/',
        destination: <HomeComponent />,
    },
    {
        name: 'Prayer Book',
        path: '/prayers',
        destination: <PrayerBookComponent />,
    },
    {
        name: 'Habits',
        path: '/habits',
        destination: <HabitsComponent />,
    },
    {
        name: 'Select a Mod',
        path: '/mods',
        destination: <ModSelectComponent />,
    },
]
