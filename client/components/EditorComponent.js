import { ThemeContext } from '@/context/ThemeContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createRef, useContext } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

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
  const {theme} = useContext(ThemeContext)
  const styles = createStyles(theme)
  const _editor = createRef();  

  return (
    <>
      <SafeAreaView style={{...styles.root}}>
        <StatusBar style="auto" />
        <View style={{...styles.navWrapper,backgroundColor:theme.fill}}>
          <View style={styles.nav}>
            <TouchableOpacity onPress={saveNote}>
              <Ionicons name="chevron-back" size={24} color={theme.color} />
            </TouchableOpacity>
            <TextInput placeholderTextColor={theme.color} placeholder="Title" value={title} onChangeText={setTitle} style={styles.textInput} maxLength={25}/>
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
          keyboardVerticalOffset={Platform.OS==="ios" ? 64 : 0}
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
          <View style={{marginBottom:30}}>
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
      paddingVertical: 10,
    },
    root: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: theme.fill,
    },
    editor: {
      flex: 1,
      padding: 0,
      borderColor: 'grey',
      borderWidth: 1,
      marginHorizontal: 30,
      marginVertical: 5,
      backgroundColor: 'white',
    },
    navWrapper: {
      padding:5,
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
