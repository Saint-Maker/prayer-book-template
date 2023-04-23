import { Button, Flex, IconButton, Input, useDisclosure } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { useEffect, useRef } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { BsUpload, BsDownload } from 'react-icons/bs'

import { addHabit, getHabits, setHabits } from '~slices/habitSlice'
import { AppDispatch, selectHabits } from '~store'
import { Habit } from '~components/Habit'
import { Header } from '~components/Header'
import { Layout } from '~components/Layout'
import { AlertModal } from '~components/AlertModal'
import { downloadData } from '~utils/downloadData'
import { uploadData } from '~utils/uploadData'

export const Habits = () => {
    const { isOpen: isUploadAlertOpen, onOpen: onUploadAlertOpen, onClose: onUploadAlertClose } = useDisclosure()
    const {
        isOpen: isInvalidFileAlertOpen,
        onOpen: onInvalidFileAlertOpen,
        onClose: onInvalidFileAlertClose,
    } = useDisclosure()
    const dispatch = useDispatch<AppDispatch>()
    const habits = useSelector(selectHabits)
    const addInputRef = useRef<HTMLInputElement | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        dispatch(getHabits())
    }, [])

    const addHabitHandler = () => {
        if (addInputRef?.current == undefined || addInputRef.current.value.length === 0) return
        dispatch(
            addHabit({
                id: nanoid(16),
                name: addInputRef.current.value,
                days: Array(28).fill(false) as boolean[],
                editing: false,
            }),
        )
        addInputRef.current.value = ''
    }

    const downloadHabits = () => {
        downloadData(habits.data, 'habitbook')
    }

    const triggerUpload = () => {
        fileInputRef?.current?.click()
    }

    const uploadHabits = (event: any) => {
        uploadData(event, (result: any) => dispatch(setHabits(result)), onInvalidFileAlertOpen)
    }

    return (
        <>
            <Layout>
                <Header
                    title="Habits"
                    drawerBtns={
                        <>
                            <Button
                                onClick={downloadHabits}
                                w="full"
                                leftIcon={<BsUpload />}
                                justifyContent="flex-start"
                            >
                                Download Habits
                            </Button>
                            <div>
                                <Input type="file" ref={fileInputRef} onChange={uploadHabits} display="none" />
                                <Button
                                    w="full"
                                    onClick={
                                        habits.data.length === 0 ? () => triggerUpload() : () => onUploadAlertOpen()
                                    }
                                    leftIcon={<BsDownload />}
                                    justifyContent="flex-start"
                                >
                                    Upload Habits
                                </Button>
                            </div>
                        </>
                    }
                >
                    <Flex direction="row" pt="2">
                        <Input placeholder="Add a new habit" ref={addInputRef} />
                        <IconButton
                            ml="2"
                            onClick={addHabitHandler}
                            aria-label="Add prayer"
                            icon={<AiOutlinePlusCircle />}
                        />
                    </Flex>
                    {habits.data.map((habit: Habit, index: number) => (
                        <Habit key={`${habit.name}-${index}`} habit={habit} />
                    ))}
                </Header>
            </Layout>
            <AlertModal
                isOpen={isUploadAlertOpen}
                onClose={onUploadAlertClose}
                onConfirm={triggerUpload}
                header="Confirm Habits Upload"
                body="WARNING: make sure this habitbook file is from a trusted source. This will delete your current habits; make sure to download your current habits first if you need to."
            />
            <AlertModal
                isOpen={isInvalidFileAlertOpen}
                onClose={onInvalidFileAlertClose}
                header="Invalid File Uploaded"
                body="Make sure you are uploading the correct file type (.json). If you are, then please post a question on our github issues along with the file: https://github.com/Saint-Maker/prayer-book-template-a/issues"
            />
        </>
    )
}
