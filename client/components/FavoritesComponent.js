import ActionBar from "@/components/ActionBar";
import NavBar from "@/components/NavBar";
import NoteList from "@/components/NoteList";
import SelectAll from "@/components/SelectAll";
import SideMenu from "@/components/SideMenu";
import {InteractionContext} from "@/context/InteractionContext";
import { useNotes } from "@/context/NotesContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext } from "react";
import { View } from "react-native";

export default function Favorites() {
    const {theme} = useContext(ThemeContext)
    const { notes,fetchData, loading } = useNotes()
    
    const {
        isPressed,
    } = useContext(InteractionContext)

    useFocusEffect(
        useCallback(() => {
            fetchData()
        },[fetchData])
    )

    return (
        <View style={{flex:1,backgroundColor:theme.background}}>
            {!isPressed && <NavBar title="Favorites" />}
            {isPressed && <SelectAll content={notes}/>}
            <SideMenu data={notes} />
            <NoteList
                content={notes.filter((el, i) => el.favorite === 1)}
                loading={loading}
            />
            {isPressed && <ActionBar content={notes}/>}
        </View>
    )
}