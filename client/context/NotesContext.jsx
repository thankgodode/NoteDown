import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

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

    const fetchData = useCallback(async() =>{
        const result = await db.getAllAsync("SELECT * FROM notes ORDER BY updatedAT DESC;")

        setNotes(result)
        console.log("Fetch ", result)
        setLoading(false)
    },[])

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

        fetchData()
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

        fetchData()
        router.back()
    }

    const getById = async(id) => {
        const result = await db.getFirstAsync("SELECT * FROM notes WHERE id = ?", [parseInt(id)])

        return result
    }

    const deleteNote = async (selected) => {
        const placeholder = selected.map(()=> "?").join(", ")   
        
        if (router.canGoBack()) {
            await db.runAsync("DELETE FROM notes WHERE id = ?;", selected)
            fetchData()
            console.log("Delete single ", selected)
            router.back();
        }
        
        console.log("Delete multiple ", selected)
        await db.runAsync(`DELETE FROM notes WHERE id IN  (${placeholder});`, selected)
        
        fetchData()
    }

    const addFavorites = async(selected,favorite) => {
        const placeholder = selected.map(() => "?").join(", ")

        await db.runAsync(`UPDATE notes SET favorite = ? WHERE id IN  (${placeholder});`, [favorite, ...selected]) 
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [db]) 

    return (
        <NoteContext.Provider
            value={{
                createNote,
                editNote,
                deleteNote,
                fetchData,
                addFavorites,
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