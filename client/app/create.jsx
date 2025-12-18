import { readFile, writeFile } from '@/services/api';

import EditorComponent from "@/components/EditorComponent";
import { useRouter } from 'expo-router';
import { ThemeProvider } from '@/context/ThemeContext';
import { useContext, useState } from 'react';
import NoteProvider, { NoteContext, useNotes } from '@/context/NotesContext';

export default function CreateNote() {

  // const [title, setTitle] = useState("")
  // const [content, setContent] = useState("<p><br></p>")
  // const [favorite, setFavorite] = useState(false)
  // const [folder, setFolder] = useState([])

  // const router = useRouter()

  // const createNote = async () => {
  //   console.log("Favorite status: ", favorite)

  //   const date = new Date().getTime()

  //   // Checks to know whether to save or not save newly created note file
  //   const plainTextContent = content
  //   .replace(/<[^>]+>/g, '') // remove HTML tags
  //   .replace(/&nbsp;/g, '')  // remove non-breaking spaces
  //   .trim();

  //   const isTitleEmpty = title.trim() === "";
  //   const isContentEmpty = plainTextContent.length < 1;

  //   // If both are empty, skip saving
  //   if (isTitleEmpty && isContentEmpty) {
  //     router.back()
  //     return;
  //   }

  //   try {
  //     const data = await readFile()
      
  //     if (!data || data.length < 1) {
  //       await writeFile(JSON.stringify([{ title, content, favorite, folder: [], id: 1,createdAt: date, updatedAt:date}]))
  //       router.back()

  //       return
  //     }
      
  //     const parsedData = JSON.parse(data)
  //     const id = parsedData[parsedData.length-1].id
  //     await writeFile(JSON.stringify([...parsedData,{ title, content, favorite, folder: [], id: id + 1, createdAt: date, updatedAt:date }]))
      

  //     router.back()
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
      <ThemeProvider>
        <NoteProvider>
          <EditorComponent
            route={"create"}
          />
        </NoteProvider>
      </ThemeProvider>
    </>
  );
}

