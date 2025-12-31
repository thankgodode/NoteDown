import { FlatListComponent, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from "expo-router";

import {InteractionContext} from "@/context/InteractionContext";
import { useCallback, useContext, useEffect, useState } from "react";
import SelectAll from "@/components/SelectAll";
import ActionBar from "./ActionBar";
import NoteList from "./NoteList";
import { ThemeContext } from "@/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotes } from "@/context/NotesContext";

export default function SearchComponent() {
    const [searchQuery, setSearchQuery] = useState("")
    const { theme } = useContext(ThemeContext)
    const {notes,loading,fetchData} = useNotes()

    const router = useRouter()
    const {
        isPressed,
    } = useContext(InteractionContext);

    const { height } = useWindowDimensions()
    const headerHeight = Math.max(60, height*0.1)
    const styles = createStyles(theme, headerHeight)
    
    useFocusEffect(
        useCallback(() => {
            fetchData()
        },[fetchData])
    )

    return (
        <View style={{flex:1, backgroundColor:theme.background}}>
            <StatusBar backgroundColor={theme.fill} />
            {isPressed && <SelectAll content={notes} />}
            {/* Search bar/Searched content */}
            {!isPressed && 
                <SafeAreaView edges={['top']} style={styles.searchBar}>
                    <View>
                        <TouchableOpacity onPress={()=> router.push("/")}>
                            <Ionicons name="chevron-back" size={24} color={theme.color} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchBox}>
                        <FontAwesome name="search" size={16} color={theme.color} />
                        <TextInput style={styles.textInput} placeholderTextColor={theme.color} placeholder="Search notes" value={searchQuery} onChangeText={setSearchQuery}/>
                    </View>
                </SafeAreaView>
            }
            {notes && <SearchedContent
                content={notes.filter((el, i) => el.title.includes(searchQuery))}
                loading={loading}
            />}
            {!notes && <Text style={{fontSize:20,textAlign:"center",margin:50,color:theme.color}}>Your note is empty...</Text>}
            {isPressed && <ActionBar content={notes}/>}
        </View>
    )
}

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

function createStyles(theme,headerHeight) {
    return StyleSheet.create({
        searchBar: {
            paddingHorizontal:15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.fill,
            height:headerHeight,
            gap: 15,
        },
        searchBox: {
            backgroundColor: theme.search,
            borderWidth: 1,
            borderColor:theme.hairline,
            flex:1,
            flexDirection: "row",
            alignItems:"center",
            gap: 5,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius:20,
            overflow:"hidden"
        },
        textInput: {
            flex: 1,
            fontSize: 12,
            color: theme.color,
            backgroundColor:theme.search
        }
    })
}
