import { Ionicons, MaterialIcons,Feather,Entypo,AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native"
import {parseDocument, DomUtils} from "htmlparser2"
import { useContext } from "react";
import {InteractionContext} from "@/context/InteractionContext";
import { useNotes } from "@/context/NotesContext";
import { useLocalSearchParams } from "expo-router";

export default function WordCountSaver({ content }) {

    const {saveNote} = useNotes()
    const { toggleSaved, setToggleSaved } = useContext(InteractionContext)
    const { id,titleLength, contentLength} = useLocalSearchParams()
    

    const doc = parseDocument(content)
    
    const text = DomUtils.textContent(doc)
    // .replace(/\s+/g, ' ')
    .trim().split(" ");
    
    const charCount = text.length

    return (
        <View style={{
            backgroundColor: "#e0e0e0ff",
            padding: 8,
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
            <View>
                <Text>Word count: {text[0]==="" ? 0 :charCount}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                saveNote(id, titleLength, contentLength) 
                setToggleSaved(false)
            }} disabled={!toggleSaved}>
                {toggleSaved && <Feather name="check" size={24} color="grey" />}
                {!toggleSaved && <Feather name="check" size={24} color="#ccc" />}
            </TouchableOpacity>
        </View>
    )
}