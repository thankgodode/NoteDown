import EditorComponent from "@/components/EditorComponent";
import { readFile, writeFile } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useEffect, useState } from "react";


export default function EditNote() {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("Untitled")
    const [favorite, setFavorite] = useState(false)
    const [folder, setFolder] = useState([])

    const { id } = useLocalSearchParams()
    const { data } = useFetch(() => readFile())
    console.log("Data ", data)

    const router = useRouter()

    const editNote = async() => {
        const mapped = data.map((el, i) => {
            if (el.id === parseInt(id)) {
                return {
                    ...el,
                    title,
                    content,
                    favorite,
                }
            }
            return el
        })

        console.log(mapped)

        await writeFile(JSON.stringify(mapped))
        router.push("/")

    }

    const deleteNote = async () => {
        const filtered = data.filter((el, i) => el.id !== parseInt(id))
        const newData = filtered.map((el, i) => {
            return {
                ...el,
                id:i+1
            }
        })
        
        console.log("New Edit" , newData)
        console.log("Delete" , filtered)

        await writeFile(JSON.stringify(newData))
        router.push("/")
    }

    useEffect(() => {
        if (data) {
            const filtered = data.find((el) => el.id === parseInt(id));
            if (filtered) {
                setContent(filtered.content);
                setTitle(filtered.title);
                setFavorite(filtered.favorite);
                setFolder(filtered.folder);
            }
        }
    }, [data]);



    return content===""? null: (
        <EditorComponent
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            favorite={favorite}
            setFavorite={setFavorite}
            folder={folder}
            setFolder={setFolder}
            saveNote={editNote}
            deleteNote={deleteNote}

        />
    )
}