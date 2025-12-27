import { useCallback, useContext } from "react";

import ActionBar from "./ActionBar";
import CreateButton from "./CreateButton";
import NavBar from "./NavBar";
import NoteList from "./NoteList";
import SelectAll from "./SelectAll";
import SideMenu from "./SideMenu";

import { readFile } from "@/services/api";
import { InteractionContext } from "@/context/InteractionContext";
import { Text, View } from "react-native";
import { ThemeContext } from "@/context/ThemeContext";
import { useNotes } from "@/context/NotesContext";
import { useFocusEffect } from "expo-router";

export default function Home() {
  const {theme} = useContext(ThemeContext)
  const { notes,fetchData, loading } = useNotes()

  const {
    isPressed,
  } = useContext(InteractionContext);

  useFocusEffect(
    useCallback(() => {
      fetchData()
    },[fetchData])
  )

  return (
    <View style={{flex:1,backgroundColor:theme.background}}>
      {!isPressed && <NavBar title="All notes" screen="notes"/>}
      {isPressed && <SelectAll content={notes}/>}
      <SideMenu data={notes} />
      <NoteList content={notes} loading={loading} />
      {isPressed ?"": loading ? "" : <CreateButton />}
      {isPressed && <ActionBar content={notes}/>}
    </View>
  );
}
