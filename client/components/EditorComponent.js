import { ThemeContext } from '@/context/ThemeContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { BackHandler, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

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
  const styles = createStyles(theme)
  const _editor = createRef();  

  const navigation = useNavigation()


  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       // saveNote()
  //       navigation.goBack() // 👈 go back to previous page
  //       console.log("Editor content ", content)
  //       return true; // prevent default behavior (exit app)
  //     };

  //     const subscription = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       onBackPress
  //     );

  //     return () => subscription.remove();
  //   }, [navigation])
  // );

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
      <SafeAreaView style={{...styles.root}}>
        <StatusBar/>
        <View style={{...styles.navWrapper,backgroundColor:theme.fill}}>
          <View style={styles.nav}>
            <TouchableOpacity onPress={saveNote}>
              <Ionicons name="chevron-back" size={24} color={theme.color} />
            </TouchableOpacity>
            <TextInput placeholderTextColor={theme.color} placeholder="Title" value={title} onChangeText={setTitle} style={styles.textInput} maxLength={100}/>
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
        </View>
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
          <View style={{paddingBottom:30}}>
            <QuillToolbar editor={_editor} options="full" theme={theme.theme} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
      flex:1,
      marginTop: StatusBar.currentHeight,
      backgroundColor: theme.fill,
    },
    editor: {
      flex:1,
      borderColor: 'grey',
      borderWidth: 1,
      backgroundColor: 'white',
    },
    navWrapper: {
      backgroundColor: "#eaeaeaff",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      position: "fixed",
    },
    nav: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      padding: 5,
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
