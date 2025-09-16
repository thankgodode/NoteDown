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

export default function Home() {
  const { data, loading } = useFetch(() => readFile());
  const [content, setContent] = useState(data);

  const {
    isPressed,
  } = useContext(InteractionContext);

  useEffect(() => {
    setContent(data);
  }, [data]);

  return (
    <>
      {!isPressed && <NavBar title="All notes" />}
      {isPressed &&<SelectAll content={content}/>}
      <SideMenu data={content} />
      <NoteList content={content} setContent={setContent} loading={loading} />
      {isPressed && <ActionBar content={content} setContent={setContent} />}
      {!isPressed && <CreateButton />}
    </>
  );
}
