import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface IModHeaderBtnLink {
    mod: Mod
}

export const ModHeaderBtnLink = ({ mod }: IModHeaderBtnLink) => {
    const navigate = useNavigate()

    return (
        <>
            {'isNative' in mod && mod.isNative ? (
                <Button
                    onClick={() => navigate(mod.path)}
                    disabled={window.location.pathname === mod.path}
                    w="full"
                    justifyContent="flex-start"
                >
                    {mod.name}
                </Button>
            ) : (
                <Button as="a" href={mod.path} w="full" justifyContent="flex-start">
                    {mod.name}
                </Button>
            )}
        </>
    )
}
