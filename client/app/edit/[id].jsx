import EditorComponent from "@/components/EditorComponent";

import { useLocalSearchParams, useRouter } from "expo-router";

import { useState } from "react";

import DeleteModal from "@/components/DeleteModal";
import { ThemeProvider } from "@/context/ThemeContext";
import NoteProvider from "@/context/NotesContext";
import InteractionProvider from "@/context/InteractionContext"

export default function EditNote() {
    const [showModal, setShowModal] = useState(false)
    const {id} = useLocalSearchParams()

    const deleteOptions = () => {
        setShowModal(!showModal)
    }

    return (
        <>
            <InteractionProvider>
                <ThemeProvider>
                    <NoteProvider>
                        <DeleteModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            id={[parseInt(id)]}
                            route={"edit"}
                        />
                            <EditorComponent
                                setShowModal={setShowModal}
                                showModal={showModal}
                                deleteNote={deleteOptions}
                                route={"edit"}
                            />
                    </NoteProvider>
                </ThemeProvider>
            </InteractionProvider>
        </>
    )
}
