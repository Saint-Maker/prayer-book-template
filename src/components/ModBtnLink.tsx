import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface IModBtnLink {
    mod: Mod
    btnText: string
    width?: string
    target?: string
}

export const ModBtnLink = ({ mod, btnText, width = 'initial', target = '_self' }: IModBtnLink) => {
    const navigate = useNavigate()

    return (
        <>
            {mod.isNative ? (
                <Button onClick={() => navigate(mod.path)} w={width}>
                    {btnText}
                </Button>
            ) : (
                <Button as="a" href={mod.path} target={target} w={width}>
                    {btnText}
                </Button>
            )}
        </>
    )
}
