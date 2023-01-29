import React, { useEffect, useRef, useState } from "react"
import {
  Button,
  HStack,
  Input,
  VStack,
  chakra,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { nanoid } from "nanoid"
import ReactQuill from "react-quill"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { BsDownload, BsTrashFill, BsUpload } from "react-icons/bs"
import DOMPurify from "dompurify"

import { selectPrayers } from "../redux/store"
import {
  getPrayers,
  addPrayer,
  editPrayer,
  setPrayers,
  deleteAllPrayer,
} from "../redux/slice/prayerSlice"
import PrayerCard from "../components/PrayerCard"
import Layout from "../components/Layout"
import type { AppDispatch } from "../redux/store"
import "react-quill/dist/quill.snow.css"
import "../styles/pagesPrayers.css"
import Header from "../components/Header"
import AlertModal from "../components/AlertModal"

const Prayer = () => {
  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose,
  } = useDisclosure()
  const {
    isOpen: isUploadAlertOpen,
    onOpen: onUploadAlertOpen,
    onClose: onUploadAlertClose,
  } = useDisclosure()
  const {
    isOpen: isInvalidFileAlertOpen,
    onOpen: onInvalidFileAlertOpen,
    onClose: onInvalidFileAlertClose,
  } = useDisclosure()
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const [addToggled, setAddToggled] = useState(false)
  const [editing, setEditing] = useState(false)
  const [prayerId, setPrayerId] = useState("")
  const prayers = useSelector(selectPrayers)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getPrayers())
  }, [])

  const addOrEditPrayerHandler = (id: string, title: string, text: string) => {
    if (editing) {
      dispatch(
        editPrayer({
          id,
          title,
          text,
        })
      )
    } else {
      dispatch(
        addPrayer({
          id: nanoid(16),
          title,
          text,
        })
      )
    }
  }

  const toggleAdd = () => {
    setAddToggled((state) => {
      setTitle("")
      setText("")
      setEditing(false)
      setPrayerId("")
      return !state
    })
  }

  const titleOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = (e.target as any).title as HTMLInputElement

    addOrEditPrayerHandler(prayerId, title.value, text)
    ;(e.target as HTMLFormElement).reset()
    toggleAdd()
  }

  const editingPrayer = (id: string, text: string, title: string) => {
    setEditing(true)
    setPrayerId(id)
    setTitle(title)
    setText(text)
    setAddToggled(true)
  }

  const handleDeleteAll = () => {
    dispatch(deleteAllPrayer())
  }

  const downloadPrayerbook = () => {
    const prayerBook = JSON.stringify(prayers.data)
    const blob = new Blob([prayerBook], { type: "text/json" })
    const anchor = document.createElement("a")
    anchor.download = "prayerbook.json"
    anchor.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    anchor.dispatchEvent(clickEvt)
    anchor.remove()
  }

  const triggerUpload = () => {
    fileInputRef?.current?.click()
  }

  const uploadPrayerbook = (event: any) => {
    const fileReader = new FileReader()
    fileReader.readAsText(event.target.files[0], "UTF-8")
    fileReader.onload = (e) => {
      try {
        const stringResult: string =
          e.target !== null ? (e.target.result as string) : ""
        const result = JSON.parse(stringResult)
        const purifiedResult = result.map((prayer: Prayer) => {
          prayer.text = DOMPurify.sanitize(prayer.text)
          return prayer
        })
        dispatch(setPrayers(purifiedResult))
      } catch (e) {
        onInvalidFileAlertOpen()
      } finally {
        event.target.value = ""
      }
    }
  }

  return (
    <Layout>
      <Header
        title="Prayer Book"
        headerBtns={
          <IconButton
            onClick={toggleAdd}
            aria-label="Add prayer"
            icon={<AiOutlinePlusCircle />}
          />
        }
        drawerBtns={
          <>
            <Button
              onClick={downloadPrayerbook}
              w="full"
              leftIcon={<BsUpload />}
              justifyContent="flex-start"
            >
              Download Prayerbook
            </Button>
            <div>
              <Input
                type="file"
                ref={fileInputRef}
                onChange={uploadPrayerbook}
                display="none"
              />
              <Button
                w="full"
                onClick={
                  prayers.data.length === 0
                    ? () => triggerUpload()
                    : () => onUploadAlertOpen()
                }
                leftIcon={<BsDownload />}
                justifyContent="flex-start"
              >
                Upload Prayerbook
              </Button>
            </div>
            <Button
              onClick={onDeleteAlertOpen}
              w="full"
              mt="auto"
              leftIcon={<BsTrashFill />}
              justifyContent="flex-start"
              colorScheme="red"
            >
              Delete all prayer
            </Button>
          </>
        }
      >
        <VStack my="6">
          {addToggled && (
            <chakra.form onSubmit={formSubmitHandler} w="full">
              <Input
                name="title"
                value={title}
                onChange={titleOnChangeHandler}
                placeholder="Title..."
                autoComplete="off"
                required
              />
              {title.length > 0 && (
                <HStack my={2} alignItems="flex-start">
                  <ReactQuill
                    placeholder="Prayer text..."
                    theme="snow"
                    value={text}
                    onChange={setText}
                  />
                  ;
                  <Button type="submit" colorScheme="green">
                    {editing ? "Update" : "Add"}
                  </Button>
                </HStack>
              )}
            </chakra.form>
          )}
          {prayers.loading === false &&
            prayers.data
              .filter(({ id, ...text }) => id !== prayerId)
              .map(({ id, ...text }) => {
                return (
                  <PrayerCard
                    key={id}
                    id={id}
                    {...text}
                    onEdit={() => editingPrayer(id, text.text, text.title)}
                  />
                )
              })}
        </VStack>
        <AlertModal
          isOpen={isDeleteAlertOpen}
          onClose={onDeleteAlertClose}
          onConfirm={handleDeleteAll}
          header="Delete all prayers"
          body="Are you sure? You can't undo this action afterwards."
          confirmBtnText="Delete"
          confirmBtnColor="red"
        />
        <AlertModal
          isOpen={isUploadAlertOpen}
          onClose={onUploadAlertClose}
          onConfirm={triggerUpload}
          header="Confirm Prayer Book Upload"
          body="WARNING: make sure this prayerbook file is from a trusted source. This will delete your current prayer book; make sure to download your current prayer book first if you need to."
        />
        <AlertModal
          isOpen={isInvalidFileAlertOpen}
          onClose={onInvalidFileAlertClose}
          header="Invalid File Uploaded"
          body="Make sure you are uploading the correct file type (.json). If you are, then please post a question on our github issues along with the file: https://github.com/Saint-Maker/prayer-book-template-a/issues"
        />
      </Header>
    </Layout>
  )
}

export default Prayer
