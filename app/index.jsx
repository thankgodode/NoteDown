import ActionBar from "@/components/ActionBar";
import CreateButton from "@/components/CreateButton";
import DeleteModal from "@/components/DeleteModal";
import NavBar from "@/components/NavBar";
import NoteList from "@/components/NoteList";
import SelectAll from "@/components/SelectAll";
import SelectList from "@/components/SelectList";
import SideMenu from "@/components/SideMenu";

import { SideMenuProvider } from "@/context/SideMenuContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { readFile } from '@/services/api';
import useFetch from "@/services/useFetch";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { BackHandler, FlatList, Text, useWindowDimensions, View } from "react-native";

export default function Index() {
    const { data } = useFetch(() => readFile())

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

    const { width, height } = useWindowDimensions()
    
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
        <DeleteModal showModal={showModal} setShowModal={setShowModal}/>
        <View style={{flex:1}}>
            <ThemeProvider>
                <SideMenuProvider>
                    {!isPressed && <NavBar title="All notes" />}
                    {isPressed && <SelectAll isSelectedAll={isSelectedAll} selectAll={selectAll} deselectAll={deselectAll} selected={selected} />}
                        <SideMenu data={content} />
                    <FlatList
                        numColumns={2}
                        data={content}
                        keyExtractor={(item)=> item.id}
                        columnWrapperStyle={{
                            gap: 15,
                            marginBottom: 5,
                            justifyContent: "center",
                            marginHorizontal: "auto",
                            width: 100,
                        }}
                        contentContainerStyle={{
                            paddingBottom: 100,
                        }}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    {!isPressed &&
                                        <NoteList
                                            item={item}
                                            width={width}
                                            setIsPressed={setIsPressed}
                                            setDefaultSelection={setDefaultSelection}
                                        />
                                    }
                                    {isPressed &&
                                        <SelectList
                                            item={item}
                                            defaultSelection={defaultSelection}
                                            selected={selected}
                                            setSelected={setSelected}
                                        />
                                    }
                                </>
                            )
                        }}
                        ListEmptyComponent={<EmptyComponent/>}
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
                            
                    <CreateButton />
                </SideMenuProvider>
            </ThemeProvider>
        </View>
        </>
    )
}

export const EmptyComponent = () => {
    return (
        <View style={{height:500, justifyContent:"center", alignItems:"center"}}>
            <FontAwesome5 name="box-open" size={100} color="black"/>
            <Text style={{fontSize:20}}>No note file found...</Text>
        </View>
    )
}