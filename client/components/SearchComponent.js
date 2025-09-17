import { FlatListComponent, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

import useFetch from "@/services/useFetch";
import { readFile } from "@/services/api";
import {InteractionContext} from "@/context/InteractionContext";
import { useContext, useEffect, useState } from "react";
import SelectAll from "@/components/SelectAll";
import ActionBar from "./ActionBar";
import NoteList from "./NoteList";
import { useNavigation } from "@react-navigation/native";

export default function SearchComponent() {
    const { data, loading } = useFetch(() => readFile());
    const [content, setContent] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    const router = useRouter()
    const {
        isPressed,
    } = useContext(InteractionContext);

    useEffect(() => {
        setContent(data);
    }, [data]);
    
    return (
        <>
            <StatusBar style="auto" />
            {isPressed && <SelectAll content={content} />}
            {/* Search bar/Searched content */}
            {!isPressed && 
                <View style={styles.searchBar}>
                    <View>
                        <TouchableOpacity onPress={()=> router.push("/")}>
                            <Ionicons name="chevron-back" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchBox}>
                        <FontAwesome name="search" size={16} color="black" />
                        <TextInput style={styles.textInput} placeholder="Search notes" value={searchQuery} onChangeText={setSearchQuery}/>
                    </View>
                </View>
            }
            {content && <SearchedContent
                content={content ? content.filter((el, i) => el.title.includes(searchQuery)) : []}
                loading={loading}
            />}
            {!content && <Text>Empty</Text>}
            {isPressed && <ActionBar content={content} setContent={setContent} />}
        </>
    )
}

// export const SearchBar = () => {
//     const [content, setContent] = useState(data);

//     const { data, loading } = useFetch(() => readFile());


//     useEffect(() => {
//         setContent(data);
//     }, [data]);

    
//     return (
//         <View style={styles.searchBar}>
//             <View>
//                 <TouchableOpacity onPress={()=> router.push("/")}>
//                     <Ionicons name="chevron-back" size={24} color="black" />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.searchBox}>
//                 <FontAwesome name="search" size={16} color="black" />
//                 <TextInput style={styles.textInput} placeholder="Search notes" value={searchQuery} onChangeText={setSearchQuery}/>
//             </View>
//             <SearchedContent content={content}/>
//         </View>
//     )
// }

export const SearchedContent = ({content,loading}) => {
    return (
        <>
            <NoteList
                content={content}
                loading={loading}
            /> 
        </>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom:10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: StatusBar.currentHeight || 0,
        gap: 30,
    },
    searchBox: {
        backgroundColor: "#cccdc989",
        flex:1,
        flexDirection: "row",
        alignItems:"center",
        gap: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius:8,
        overflow:"hidden"
    },
    textInput: {
        flex: 1,
        fontSize:12,
    }
})