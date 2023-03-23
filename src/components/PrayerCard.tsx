import { Box, Button, IconButton, Text, HStack, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { BsTrashFill, BsPencil } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { deletePrayer } from '~slices/prayerSlice'
import { AppDispatch } from '~store'
import { AlertModal } from '~components/AlertModal'

type Props = {
    id: string
    title: string
    text: string
    searchText: string
    onEdit: () => void
}

export const PrayerCard = ({ id, title, text, searchText, onEdit }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const bg = useColorModeValue('gray.100', 'gray.700')
    const dispatch = useDispatch<AppDispatch>()
    const [displayTitle, setDisplayTitle] = useState(title)
    const [displayText, setDisplayText] = useState(text)
    const [textShown, setTextShown] = useState(false)

    const handleDelete = () => {
        if (id) dispatch(deletePrayer(id))
    }

    useEffect(() => {
        if (searchText.length === 0) {
            setDisplayTitle(title)
            setDisplayText(text)
            setTextShown(false)
            return
        }
        try {
            const searchRegEx = new RegExp(searchText, 'g')
            const textSearchResults = text.replace(searchRegEx, `<mark>${searchText}</mark>`)
            setDisplayTitle(title.replace(searchRegEx, `<mark>${searchText}</mark>`))
            if (textSearchResults === text) {
                setTextShown(false)
                return
            }
            setDisplayText(textSearchResults)
            setTextShown(true)
        } catch (err) {
            // WHY: quietly catch an error when user input breaks the regex
        }
    }, [searchText])

    return (
        <Box w="full">
            <Button
                as="div"
                listStyleType="none"
                w="full"
                justifyContent="space-between"
                fontWeight="bold"
                fontSize="xl"
                onClick={() => setTextShown(!textShown)}
            >
                <Box w="full" overflow="hidden" pr="2" noOfLines={1}>
                    <Text noOfLines={1} dangerouslySetInnerHTML={{ __html: displayTitle }} />
                </Box>
                <HStack spacing="1rem">
                    <IconButton
                        onClick={onEdit}
                        aria-label="Edit prayer"
                        icon={<BsPencil />}
                        size="sm"
                        colorScheme="green"
                    />
                    <IconButton
                        onClick={onOpen}
                        aria-label="Delete prayer"
                        icon={<BsTrashFill />}
                        size="sm"
                        colorScheme="red"
                    />
                </HStack>
            </Button>
            {textShown && (
                <Box bg={bg} my="2" mx="4" p="1" rounded="sm">
                    <Text dangerouslySetInnerHTML={{ __html: displayText }} />
                </Box>
            )}
            <AlertModal
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={handleDelete}
                header="Delete prayer"
                body="Are you sure? You can't undo this action afterwards."
                confirmBtnText="Delete"
                confirmBtnColor="red"
            />
        </Box>
    )
}
