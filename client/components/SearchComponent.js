import { StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

import useFetch from "@/services/useFetch";
import { readFile } from "@/services/api";
import {InteractionContext} from "@/context/InteractionContext";
import { useContext, useEffect, useState } from "react";
import SelectAll from "@/components/SelectAll";
import ActionBar from "./ActionBar";

export default function SearchComponent() {
    const { data, loading } = useFetch(() => readFile());
    const [content, setContent] = useState(data);

    const {
        isPressed,
    } = useContext(InteractionContext);

    useEffect(() => {
        setContent(data);
    }, [data]);

    return (
        <View>
            <StatusBar style="auto" />
            {isPressed && <SelectAll content={content}/>}
            {!isPressed && <SearchBar />}
            {isPressed && <ActionBar content={content} setContent={setContent} />}
        </View>
    )
}

export const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()
    
    return (
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