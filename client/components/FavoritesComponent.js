import ActionBar from "@/components/ActionBar";
import NavBar from "@/components/NavBar";
import NoteList from "@/components/NoteList";
import SelectAll from "@/components/SelectAll";
import SideMenu from "@/components/SideMenu";
import {InteractionContext} from "@/context/InteractionContext";
import { readFile } from '@/services/api';
import useFetch from "@/services/useFetch";
import { useContext, useEffect, useState } from "react";

export default function Favorites() {
    const { data,loading } = useFetch(() => readFile())
    const [content, setContent] = useState(data)
    
    const {
        isPressed,
    } = useContext(InteractionContext)

    useEffect(() => {
        setContent(data)
    }, [data]);

    return (
        <>
            {!isPressed && <NavBar title="Favorites" />}
            {isPressed && <SelectAll content={content}/>}
            <SideMenu data={content} />
            <NoteList
                content={content ? content.filter((el, i) => el.favorite === true) : null}
                loading={loading}
            />
            {isPressed && <ActionBar content={content} setContent={setContent}/>}
        </>
    )
}