import { BackHandler, View } from "react-native";
import SearchComponent from "@/components/SearchComponent"
import { ThemeProvider } from "@/context/ThemeContext";
import InteractionProvider from "@/context/InteractionContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import NoteProvider from "@/context/NotesContext";

export default function Search() {
    const navigation = useRouter()

    useEffect(() => {
    const backAction = () => {
        navigation.back()
        return true
    }

    const handler = BackHandler.addEventListener("hardwareBackPress", backAction)

    return () => handler.remove()
    },[navigation])

    return (
        <NoteProvider>
        <ThemeProvider>
            <InteractionProvider>
                <SearchComponent/>
            </InteractionProvider>
        </ThemeProvider>
        </NoteProvider>
    )
}