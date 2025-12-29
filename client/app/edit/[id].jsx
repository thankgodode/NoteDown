import EditorComponent from "@/components/EditorComponent";
import { deleteFile, readFile, writeFile } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useEffect, useState } from "react";

import DeleteModal from "@/components/DeleteModal";
import { ThemeProvider } from "@/context/ThemeContext";
import NoteProvider from "@/context/NotesContext";

export default function EditNote() {
    const [showModal, setShowModal] = useState(false)
    const {id} = useLocalSearchParams()

    const deleteOptions = () => {
        setShowModal(!showModal)
    }

    return (
        <>
            <NoteProvider>
                <DeleteModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    id={[parseInt(id)]}
                    route={"edit"}
                />
                <ThemeProvider>
                    <EditorComponent
                        setShowModal={setShowModal}
                        showModal={showModal}
                        deleteNote={deleteOptions}
                        route={"edit"}
                    />
                </ThemeProvider>
            </NoteProvider>
        </>
    )
}
