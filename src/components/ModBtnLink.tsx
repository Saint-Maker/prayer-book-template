import { Button, ButtonGroup, IconButton } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AiOutlineDrag } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

interface IModBtnLink {
    mod: Mod
    btnText: string
    width?: string
    target?: string
    isSorting?: boolean
}

export const ModBtnLink = ({ mod, btnText, width = 'initial', target = '_self', isSorting = false }: IModBtnLink) => {
    const navigate = useNavigate()
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: mod.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <ButtonGroup
            isAttached
            w={width}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="draggable"
        >
            <Button
                {...(mod.isNative
                    ? {
                          onClick: () => navigate(mod.path),
                      }
                    : { as: 'a', href: mod.path, target: target })}
                w={width}
                isDisabled={isSorting}
            >
                {btnText}
            </Button>
            {isSorting && <IconButton className="grabbable" aria-label="Add to friends" icon={<AiOutlineDrag />} />}
        </ButtonGroup>
    )
}
