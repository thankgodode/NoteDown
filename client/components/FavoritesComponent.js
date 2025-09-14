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
        isSelectedAll,
        selected,
        setSelected,
        setIsSelectedAll
    } = useContext(InteractionContext)

    const selectAll = () => {
        const arr = []
        data.forEach((el) => {
            arr.push(el.id)
        })

        setSelected(arr)
        setIsSelectedAll(true)
    }

    const deselectAll = () => {
        setSelected([])
        setIsSelectedAll(false)
    }

    useEffect(() => {
        if (data) {
            setContent(data)
        }
    }, [data]);

    return content === null ? "" :(
        <>
            {!isPressed && <NavBar title="Favorites" />}
            {isPressed && <SelectAll isSelectedAll={isSelectedAll} selectAll={selectAll} deselectAll={deselectAll} selected={selected} />}
            <SideMenu data={content} />
            <NoteList
                content={content.filter((el, i) => el.favorite === true)}
                loading={loading}
            />
            {isPressed && <ActionBar/>}
        </>
    )
}