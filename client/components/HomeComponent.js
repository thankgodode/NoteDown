import { useContext, useEffect, useState } from "react";

import ActionBar from "./ActionBar";
import CreateButton from "./CreateButton";
import NavBar from "./NavBar";
import NoteList from "./NoteList";
import SelectAll from "./SelectAll";
import SideMenu from "./SideMenu";

import useFetch from "@/services/useFetch";
import { readFile } from "@/services/api";
import { InteractionContext } from "@/context/InteractionContext";
import { Text, View } from "react-native";
import { ThemeContext } from "@/context/ThemeContext";
import { useNotes } from "@/context/NotesContext";

export default function Home() {
  const {theme} = useContext(ThemeContext)
  const { notes, loading } = useNotes();
  const [content, setContent] = useState(notes);

  const {
    isPressed,
  } = useContext(InteractionContext);

  useEffect(() => {
    setContent(notes);
  }, [notes]);

  return (
    <View style={{flex:1,backgroundColor:theme.background}}>
      {!isPressed && <NavBar title="All notes" screen="notes"/>}
      {isPressed && <SelectAll content={content}/>}
      <SideMenu data={content} />
      <NoteList content={content} setContent={setContent} loading={loading} />
      {isPressed ?"": loading ? "" : <CreateButton />}
      {isPressed && <ActionBar content={content} setContent={setContent} />}
    </View>
  );
}
