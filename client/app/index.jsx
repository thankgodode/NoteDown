import ActionBar from "@/components/ActionBar";
import CreateButton from "@/components/CreateButton";
import DeleteModal from "@/components/DeleteModal";
import NavBar from "@/components/NavBar";
import NoteList from "@/components/NoteList";
import SelectAll from "@/components/SelectAll";
import SideMenu from "@/components/SideMenu";
import SuccessModal from "@/components/SuccessModal";

import { SideMenuProvider } from "@/context/SideMenuContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { readFile } from '@/services/api';
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { BackHandler, View, ActivityIndicator } from "react-native";

export default function Index() {
    const { data, loading} = useFetch(() => readFile())

    const [content, setContent] = useState(data)
    const [isPressed, setIsPressed] = useState(false)
    const [defaultSelection, setDefaultSelection] = useState(null)
    const [selected, setSelected] = useState([])
    const [isSelectedAll, setIsSelectedAll] = useState(false)
    const [showModal, setShowModal] = useState(false)

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
        const backAction = () => {
            BackHandler.exitApp()
            return true
        }

        const handler = BackHandler.addEventListener("hardwareBackPress", backAction)

        return () => handler.remove()
    },[])

    useEffect(() => {
        setContent(data)
    },[data])
    

    return (
        <>
        {loading &&
            (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={{ alignSelf: "center", marginTop: 20 }}
                />
            )
        }
        <DeleteModal showModal={showModal} setShowModal={setShowModal}/>
        <View style={{flex:1}}>
            <ThemeProvider>
                <SideMenuProvider>
                    {!isPressed && <NavBar title="All notes" />}
                    {isPressed && <SelectAll isSelectedAll={isSelectedAll} selectAll={selectAll} deselectAll={deselectAll} selected={selected} />}
                    <SideMenu data={content} />
                    <NoteList
                        content={content}
                        isPressed={isPressed}
                        setIsPressed={setIsPressed}
                        defaultSelection={defaultSelection}
                        setDefaultSelection={setDefaultSelection}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    {isPressed && 
                        <ActionBar
                            selected={selected}
                            content={content}
                            setContent={setContent}
                            setIsPressed={setIsPressed}
                            defaultSelection={defaultSelection}
                        />
                    }
                    {!isPressed && <CreateButton />}
                </SideMenuProvider>
            </ThemeProvider>
        </View>
        </>
    )
}

