import { ThemeContext } from '@/context/ThemeContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { Alert, BackHandler, KeyboardAvoidingView, Keyboard, Platform, SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import * as ImagePicker from "expo-image-picker"
import NavEditor from "./NavEditor"
import { NoteContext, useNotes } from '@/context/NotesContext';
import { useLocalSearchParams } from 'expo-router';
// import { useRouter } from 'expo-router';

export default function EditorComponent({
  setShowModal,
  showModal,
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
    getById
  } = useNotes()

  const [initialText,setInitialText] = useState(false)
  const { theme } = useContext(ThemeContext)
  const _editor = createRef();  
  
  const { height, width} = useWindowDimensions()
  const headerHeight = Math.max(60,height*0.1)
  const styles = createStyles(theme, headerHeight, width)
  
  const insets = useSafeAreaInsets()
  const { id,titleLength, contentLength} = useLocalSearchParams()

  const handleInsertImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access the media library is required.")
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
      base64:true
    })

    // const imageBase64 = await RNFS.readFile(result.assets[0].uri, "base64")
    const length = await _editor.current.getSelection()

    if (!result.canceled) {
      console.log("Image embedded")
      _editor.current?.insertEmbed(length.index,"image",`data:image/png;base64,${result.assets[0].base64}`)
    }   
  }

  useEffect(() => {
    async function fetch() {
      if (route === "edit") {
        const notes = await getById(id)

        setTitle(notes.title)
        setContent(notes.content)
        setFavorite(notes.favorite)
        setInitialText(true)
      }
    }

    fetch()
  },[])

  useEffect(() => {
    const backAction = async() => {
      if (route === "create") {
        await saveNote()
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
        <NavEditor>
          <View style={{...styles.nav}}>
            <TouchableOpacity onPress={async() => {
              if (route === "create") {
                saveNote()
                return true
              } else if (route === "edit") {
                editNote(id,titleLength, contentLength)
                return true
              }
            }}>
              <Ionicons name="chevron-back" size={24} color={theme.color} />
            </TouchableOpacity>
          </View>
          <TextInput placeholderTextColor={theme.color} placeholder="Title" value={title} onChangeText={setTitle} style={styles.textInput} maxLength={500} />
          <View style={{ ...styles.nav}}>
            <TouchableOpacity onPress={()=> setFavorite(!favorite)}>
            {favorite
              ? <MaterialIcons name="favorite" size={24} color="#edaf11e4" />
              : <MaterialIcons name="favorite" size={24} color="grey" />
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(!showModal)}>
              {route !== "create" && <MaterialIcons name="delete" size={24} color="red" />}
            </TouchableOpacity>
          </View>
        </NavEditor>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={insets.top*0.1}
          style={{ flex: 1 }}
        >
          {initialText && <QuillEditor
            // key={content}
            webview={{
              dataDetectorTypes: ["none"]
            }}
            style={styles.editor}
            ref={_editor}
            initialHtml={content}
            onHtmlChange={(text) => {
              setContent(text.html)
            }}
          />}
          {!initialText && <QuillEditor
            // key={content}
            webview={{
              dataDetectorTypes: ["none"]
            }}
            style={styles.editor}
            ref={_editor}
            initialHtml={content}
            onHtmlChange={(text) => {
              setContent(text.html)
            }}
          />}
          {initialText && <QuillToolbar
            editor={_editor}
            options={[
              ['bold', 'italic', 'underline', 'strike', "image"],        // toggled buttons
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction

              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
            ]}
            custom={{
              handler: handleInsertImage,
              actions: ["image"]
            }}
            theme={theme.theme}
          />}
          {!initialText && <QuillToolbar
            editor={_editor}
            options={[
              ['bold', 'italic', 'underline', 'strike', "image"],        // toggled buttons
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction

              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
            ]}
            custom={{
              handler: handleInsertImage,
              actions: ["image"]
            }}
            theme={theme.theme}
          />}
        </KeyboardAvoidingView>
      </View>
    </>
      
    )
}

function createStyles(theme,headerHeight,width) {
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
    editor: {
      flex: 1,
      height:"100%",
      
      backgroundColor: 'white',
      paddingHorizontal:10
    },
    nav: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    textInput: {
      color: theme.color,
      fontSize: 20,
      width: width * 0.6,
      // borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight:10,
      paddingBottom:5
    }
  })
}
