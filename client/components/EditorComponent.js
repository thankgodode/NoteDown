import { ThemeContext } from '@/context/ThemeContext';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { BackHandler, KeyboardAvoidingView, Platform,StatusBar, StyleSheet, useWindowDimensions, View } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NavEditor from "./NavEditor"
import { useNotes } from '@/context/NotesContext';
import { useLocalSearchParams } from 'expo-router';
import { Editor, Toolbar } from "./QuillComponent"
import WordCountSaver from "@/components/WordCountSaver"
import InteractionProvider, { InteractionContext } from "@/context/InteractionContext"

export default function EditorComponent({
  route
}) {

  const {
    title,
    setTitle,
    content,
    setContent,
    favorite,
    setFavorite,
    createNote: saveNote,
    editNote,
    getById,
  } = useNotes()
  const {activeNoteId, setActiveNoteId} = useContext(InteractionContext)
  
  const [initialText, setInitialText] = useState(false)
  
  const { theme } = useContext(ThemeContext)
  const _editor = createRef();  
  
  const { height, width} = useWindowDimensions()
  const headerHeight = Math.max(60,height*0.1)
  const styles = createStyles(theme, headerHeight, width)
  
  const insets = useSafeAreaInsets()
  const { id,titleLength, contentLength} = useLocalSearchParams()

  useEffect(() => {
    async function fetch() {
      if (route === "edit") {
        const notes = await getById(id)

        setTitle(notes.title)
        setContent(notes.content)
        setFavorite(notes.favorite)
        setInitialText(true)
        setActiveNoteId(parseInt(id))
      }
    }

    fetch()
  },[])

  useEffect(() => {
    const backAction = async() => {
      if (route === "create") {
        await saveNote(activeNoteId)
        return true
      } else if (route === "edit") {
        await editNote(id,titleLength, contentLength)
        return true
      }
    }

    const handler = BackHandler.addEventListener("hardwareBackPress", backAction)

    return () => handler.remove()
  }, [title, favorite, content])

  return (
    <>
      <View style={{...styles.root}}>
        <StatusBar backgroundColor={theme.fill}/>
        <NavEditor route={route} />
        <WordCountSaver content={content} id={id} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={insets.top*0.1}
          style={{ flex: 1 }}
        >
          {initialText &&
            <Editor
              _editor={_editor}
              content={content}
              setContent={setContent}
            />
          }
          {!initialText && 
            <Editor
              _editor={_editor}
              content={content}
              setContent={setContent}
            />
          }
          {initialText &&
            <Toolbar
              _editor={_editor}
              theme={theme}
            />
          }
          {!initialText && 
            <Toolbar
              _editor={_editor}
              theme={theme}
            />
          }
        </KeyboardAvoidingView>
      </View>
    </>
      
    )
}

function createStyles(theme) {
  return StyleSheet.create({
    title: {
      fontWeight: 'bold',
      alignSelf: 'center',
      paddingVertical: 5,
    },
    root: {
      flex: 1,
      backgroundColor: theme.theme==="dark"?"#1c1e21":"#ebedf0"
    },
  })
}
