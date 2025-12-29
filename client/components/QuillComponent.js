import { StyleSheet } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import * as ImagePicker from "expo-image-picker"
import { useContext } from 'react';
import {InteractionContext} from '@/context/InteractionContext';

export const Editor = ({_editor, content, setContent}) => {
    const styles = createStyles()
    const {toggleSaved, setToggleSaved} = useContext(InteractionContext)

    return (
      <QuillEditor
        // key={content}
        webview={{
          dataDetectorTypes: ["none"]
        }}
        style={styles.editor}
        ref={_editor}
        initialHtml={content}
        onHtmlChange={(text) => {
          setToggleSaved(true)
          setContent(text.html)
        }}
      />
    )
}

export const Toolbar = ({ _editor, theme }) => {
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
    
  return (
    <QuillToolbar
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
    />
  )
}

function createStyles() {
  return StyleSheet.create({
    editor: {
      flex: 1,
      height:"100%",
      backgroundColor: 'white',
      paddingHorizontal:10
    },
  })
}
