import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createRef } from 'react';
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
    deleteNote,
    route
}) {
    const _editor = createRef();  

    return (
        <SafeAreaView style={styles.root}>
            <StatusBar style="auto" />
            <View style={styles.navWrapper}>
              <View style={styles.nav}>
                <TouchableOpacity onPress={saveNote}>
                <Ionicons name="chevron-back" size={24} color="black" />
              </TouchableOpacity>
              <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.textInput} maxLength={25}/>
            </View>
            <View style={styles.nav}>
              <TouchableOpacity onPress={()=>setFavorite(!favorite)}>
              {favorite
                ? <MaterialIcons name="favorite" size={24} color="#edab11ff" />
                : <MaterialIcons name="favorite" size={24} color="grey" />
              }
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteNote}>
              {route !== "create" && <MaterialCommunityIcons name="delete-sweep" size={24} color="red" />}
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
                <QuillToolbar style={{marginBottom:50}} editor={_editor} options="full" theme="light" />
              </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
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
    position:"fixed"
  },
  nav: {
    flexDirection: "row",
    alignItems:"center",
    gap: 20,
    padding:5,
  },
  textInput: {
    width: 250,
    fontSize: 20,
    paddingTop: 5,
    paddingBottom:5
  }
});