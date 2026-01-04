import { Ionicons, MaterialIcons,Feather,Entypo,AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native"
import {parseDocument, DomUtils} from "htmlparser2"
import { useContext } from "react";
import {InteractionContext} from "@/context/InteractionContext";
import { useNotes } from "@/context/NotesContext";

export default function WordCountSaver({ content }) {

    const {saveNote} = useNotes()
    const { toggleSaved, setToggleSaved,activeNoteId, setActiveNoteId } = useContext(InteractionContext)    

    console.log("CONTENT ", content)

    function extractTextFromHtml(html) {
        if (!html) return [];

        const document = parseDocument(html);
        const words = [];

        function traverse(node) {
            if (node.type === 'text') {
            // Normalize whitespace and split into words
                const textWords = node.data
                    .replace(/\s+/g, ' ')  // replace multiple spaces/newlines/tabs with a single space
                    .trim()                // remove leading/trailing spaces
                    .split(' ')
                    .filter(Boolean);      // remove empty strings

                words.push(...textWords);
            }

            // Recursively process children
            if (node.children) {
                node.children.forEach(traverse);
            }
        }

        document.children.forEach(traverse);
        return words;
    }
    
    const charCount = extractTextFromHtml(content).length

    return (
        <View style={{
            backgroundColor: "#e0e0e0ff",
            padding: 8,
            flexDirection: "row",
            alignItems:"center",
            justifyContent: "space-between"
        }}>
            <Text>Word count: {charCount}</Text>
            <TouchableOpacity onPress={() => {
                saveNote(activeNoteId, setActiveNoteId),
                setToggleSaved(false)
            }} disabled={!toggleSaved}>
                {toggleSaved && <Feather name="check" size={24} color="grey" />}
                {!toggleSaved && <Feather name="check" size={24} color="#ccc" />}
            </TouchableOpacity>
        </View>
    )
}