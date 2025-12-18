import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, useContext, useEffect, useState } from "react";

export const NoteContext = createContext({})

export default function NoteProvider({children}) {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("<p><br></p>")
    const [favorite, setFavorite] = useState(false)
    const [folder, setFolder] = useState("")
    const [loading, setLoading] = useState(true)

    const db = useSQLiteContext()

    const router = useRouter()

    const fetchData = async () => {
        const result = await db.getAllAsync("SELECT * FROM notes ORDER BY updatedAT DESC;")

        console.log("Result ", result)
        setNotes(result)
        setLoading(false)
    }

    const createNote = async () => {

        const plainTextContent = content
        .replace(/<[^>]+>/g, '') // remove HTML tags
        .replace(/&nbsp;/g, '')  // remove non-breaking spaces
        .trim();

        const isTitleEmpty = title.trim() === "";
        const isContentEmpty = plainTextContent.length < 1;

        // If both are empty, skip saving
        if (isTitleEmpty && isContentEmpty) {
            router.back()
            return;
        }

        await db.runAsync("INSERT INTO notes (title, content, favorite, updatedAt, createdAt) VALUES (?, ?, ?, ?, ?);",
            [
                title,
                content,
                favorite,
                new Date().toISOString(),
                new Date().getTime().toString()
            ]
        )

        router.back()
    }

    const editNote = async (id,titleLength,contentLength) => {   
        if ((title.length !== parseInt(titleLength) || content.length !== parseInt(contentLength))) {
            await db.runAsync("UPDATE notes SET title = ?, content = ?, favorite = ?, updatedAT = ? WHERE id = ?",
                [
                    title,
                    content,
                    favorite,
                    new Date().toISOString(),
                    id
                ]
            )
        }

        router.back()
    }

    const getById = async(id) => {
        const result = await db.getFirstAsync("SELECT * FROM notes WHERE id = ?", [parseInt(id)])

        return result
    }

    const deleteNote = async (id) => {
        await db.runAsync("DELETE FROM notes WHERE id = ?;", [id])

        router.back()
    }

    const deleteSelected = async (selected) => {
        const placeholder = selected.map(()=> "?").join(", ")
        await db.runAsync(`DELETE FROM notes WHERE id IN  (${placeholder});`, selected)
    }

    useEffect(() => {
        fetchData()
    }, [notes]) 
    
    // useEffect(() => {
    //     fetchData()
    // },[router.canGoBack()])

    return (
        <NoteContext.Provider
            value={{
                createNote,
                editNote,
                deleteNote,
                deleteSelected,
                fetchData,
                getById,
                title,
                setTitle,
                content,
                setContent,
                favorite,
                setFavorite,
                folder,
                setFolder,
                loading,
                notes,
            }}
        >
            {children}
        </NoteContext.Provider>
    )
}

export function useNotes() {
    const context = useContext(NoteContext)

    if (!context) {
        return
    }

    return context
}