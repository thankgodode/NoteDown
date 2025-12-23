import ActionBar from "@/components/ActionBar";
import NavBar from "@/components/NavBar";
import NoteList from "@/components/NoteList";
import SelectAll from "@/components/SelectAll";
import SideMenu from "@/components/SideMenu";
import {InteractionContext} from "@/context/InteractionContext";
import { useNotes } from "@/context/NotesContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";

export default function Favorites() {
    const {theme} = useContext(ThemeContext)
    const { notes,loading } = useNotes()
    const [content, setContent] = useState(notes)
    
    const {
        isPressed,
    } = useContext(InteractionContext)

    useEffect(() => {
        setContent(notes)
    }, [notes]);

    return (
        <View style={{flex:1,backgroundColor:theme.background}}>
            {!isPressed && <NavBar title="Favorites" />}
            {isPressed && <SelectAll content={content}/>}
            <SideMenu data={content} />
            <NoteList
                content={content ? content.filter((el, i) => el.favorite === 1) : null}
                loading={loading}
            />
            {isPressed && <ActionBar content={content} setContent={setContent}/>}
        </View>
    )
}