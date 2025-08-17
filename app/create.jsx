import { readFile, writeFile } from '@/services/api';

import EditorComponent from "@/components/EditorComponent";
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function CreateNote() {
  const [title, setTitle] = useState("Untitled")
  const [content, setContent] = useState("<h1>Quill Editor for react-native</h1>")
  const [favorite, setFavorite] = useState(false)
  const [folder, setFolder] = useState([])


  const router = useRouter()

  const createNote = async () => {
    const date = new Date().getTime()
    // const title = title.length < 1 ? "Untitled" : title
    // console.log(title)

    try {
      const data = await readFile()
      
      if (!data || data.length < 1) {
        await writeFile(JSON.stringify([{ title, content, favorite, folder: [], id: 1,createdAt: date}]))
        router.push("/")

        return
      }
      
      const parsedData = JSON.parse(data)
      const id = parsedData[parsedData.length - 1].id
      await writeFile(JSON.stringify([...parsedData, { title, content, favorite, folder: [], id: id+1, createdAt: date}]))

      router.push("/")
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <EditorComponent
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      favorite={favorite}
      setFavorite={setFavorite}
      folder={folder}
      setFolder={setFolder}
      saveNote={createNote}
    />
  );
}

