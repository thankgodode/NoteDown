import { ThemeContext } from '@/context/ThemeContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { Alert, BackHandler, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker"
// import { useRouter } from 'expo-router';

export default function EditorComponent({
    title,
    setTitle,
    content,
    setContent,
    favorite,
    setFavorite,
    saveNote,
    setShowModal,
    showModal,
    route
}) {
  const { theme } = useContext(ThemeContext)
  const _editor = createRef();  
  
  const { height, width} = useWindowDimensions()
  const headerHeight = Math.max(60,height*0.1)
  const styles = createStyles(theme,headerHeight,width)

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
      _editor.current?.insertEmbed(length.index,"image",`data:image/png;base64,${result.assets[0].base64}`)
    }
    
  }



  useEffect(() => {
    const backAction = () => {
      saveNote()
      return true
    }

    const handler = BackHandler.addEventListener("hardwareBackPress", backAction)

    return () => handler.remove()
  },[title,content])

  return (
    <>
      <View style={{...styles.root}}>
        <StatusBar backgroundColor={theme.fill}/>
        <SafeAreaView edges={["top"]} style={{...styles.navWrapper,backgroundColor:theme.fill}}>
          <View style={styles.nav}>
            <TouchableOpacity onPress={saveNote}>
              <Ionicons name="chevron-back" size={24} color={theme.color} />
            </TouchableOpacity>
            <TextInput placeholderTextColor={theme.color} placeholder="Title" value={title} onChangeText={setTitle} style={styles.textInput} maxLength={500} />
          </View>
          <View style={styles.nav}>
            <TouchableOpacity onPress={()=>setFavorite(!favorite)}>
            {favorite
              ? <MaterialIcons name="favorite" size={24} color="#edaf11e4" />
              : <MaterialIcons name="favorite" size={24} color="grey" />
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(!showModal)}>
              {route !== "create" && <MaterialIcons name="delete" size={24} color="red" />}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <QuillEditor
            // key={content}
            webview={{
              dataDetectorTypes:["none"]
            }}
            style={styles.editor}
            ref={_editor}
            initialHtml={content}
            onHtmlChange={(text) => setContent(text.html)}
            // onTextChange={(text) => }
          />
          <View style={{paddingBottom:20}}>
            <QuillToolbar
              editor={_editor}
              options={[
                ['bold', 'italic', 'underline', 'strike',"image"],        // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
              ]}
              custom={{
                handler: handleInsertImage,
                actions:["image"]
              }}
              theme={theme.theme}
            />
          </View>
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
      backgroundColor: theme.fill,
    },
    editor: {
      flex:1,
      backgroundColor: 'white',
      paddingHorizontal:10
    },
    navWrapper: {
      flexDirection: "row",
      height: headerHeight,
      justifyContent: "center",
      width:width,
      gap: 10,
      paddingHorizontal:10
    },
    nav: {
      flexDirection:"row",
      alignItems: "center",
      top:10,
      gap: 20,
    },
    textInput: {
      color: theme.color,
      width: 200,
      fontSize: 20,
      paddingTop: 5,
      paddingBottom:5
    }
  })
}
