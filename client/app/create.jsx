import { readFile, writeFile } from '@/services/api';

import EditorComponent from "@/components/EditorComponent";
import { useRouter } from 'expo-router';
import { ThemeProvider } from '@/context/ThemeContext';
import { useContext, useState } from 'react';
import NoteProvider, { NoteContext, useNotes } from '@/context/NotesContext';

export default function CreateNote() {

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

