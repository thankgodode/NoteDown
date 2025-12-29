import { Ionicons, MaterialIcons,Feather,Entypo,AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native"
import {parseDocument, DomUtils} from "htmlparser2"

export default function WordCountSaver({ content }) {

    // const counter = (node,result=[]) => {
    //     if (node.type === 'text') {
    //         result.push(node.data);
    //     }
    //     if (node.children) {
    //         node.children.forEach(child => counter(child, result));
    //     }

    //     return result;
    // }

    // const doc = parseDocument(content);
    // const words = counter(doc).map(t => t.trim()).filter(Boolean);
    // console.log("WO ", words[0])

    const doc = parseDocument(content)
    
    const text = DomUtils.textContent(doc)
    // .replace(/\s+/g, ' ')
    .trim().split(" ");
    
    console.log("DOC ", text)
    
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
            <TouchableOpacity>
                <Feather name="check" size={24} color="grey" />
            </TouchableOpacity>
        </View>
    )
}