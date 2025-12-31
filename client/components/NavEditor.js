import { InteractionContext } from "@/context/InteractionContext";
import { useNotes } from "@/context/NotesContext";
import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { StatusBar, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NavEditor({route}) {
    const { theme } = useContext(ThemeContext)
    const { createNote, editNote, favorite, setFavorite, title, setTitle } = useNotes();
    const {activeNoteId, setToggleSaved} = useContext(InteractionContext)

    const { height,width} = useWindowDimensions()
    const headerHeight = Math.max(60, height*0.1)
    
    const styles = createStyles(theme,headerHeight,width);
    const { id,titleLength, contentLength} = useLocalSearchParams()

    return (
        <SafeAreaView style={styles.navContainer} edges={["top"]}>
            <StatusBar
                backgroundColor={theme.fill}
            />
                <View style={{...styles.nav}}>
                    <TouchableOpacity onPress={async() => {
                        if (route === "create") {
                            createNote(activeNoteId)
                            setToggleSaved(false)
                            return true
                        } else if (route === "edit") {
                            editNote(activeNoteId,titleLength, contentLength)
                            setToggleSaved(false)
                            return true
                        }
                    }}>
                        <Ionicons name="chevron-back" size={24} color={theme.color} />
                    </TouchableOpacity>
                </View>
                <TextInput placeholderTextColor={theme.color} placeholder="Title" value={title} onChangeText={setTitle} style={styles.textInput} maxLength={500} />
                <View style={{ ...styles.nav}}>
                    <TouchableOpacity onPress={()=> setFavorite(!favorite)}>
                        {favorite
                        ? <MaterialIcons name="favorite" size={24} color="#edaf11e4" />
                        : <MaterialIcons name="favorite" size={24} color="grey" />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                        {route !== "create" && <MaterialIcons name="delete" size={24} color="red" />}
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}

function createStyles(theme,headerHeight,width) {
    return (
        StyleSheet.create({
            navContainer: {
                flexDirection: "row",
                width: "100%",
                height:headerHeight,
                justifyContent: "space-between",
                // flex: 1,
                // marginTop: StatusBar.currentHeight,
                alignItems: "center",
                paddingHorizontal: 15,
                backgroundColor: theme.fill,
            },
            nav: {
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
            },
            textInput: {
                color: theme.color,
                fontSize: 20,
                width: width * 0.6,
                // borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                paddingTop: 5,
                paddingLeft: 10,
                paddingRight:10,
                paddingBottom:5
            }
        })
    )
}