import { deleteFile, writeFile } from "@/services/api";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {BackHandler, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DeleteModal from "./DeleteModal";
import {SaveAsOptions} from "./SaveDropDown"

import {InteractionContext} from "@/context/InteractionContext";
import { ThemeContext, ThemeProvider } from "@/context/ThemeContext";

export default function ActionBar({content,setContent}) {
    const [showModal, setShowModal] = useState(false)
    const [isFavorite, setIsFavorite] = useState(null)

    const {
        isPressed,
        isSelectedAll,
        selected,
        setIsPressed,
        defaultSelection,
        setSelectedNote,
        setIsSelectedAll
    } = useContext(InteractionContext)
    const {theme} = useContext(ThemeContext)

    const styles = createStyles(theme)

    const deleteOptions = () => {
        setShowModal(!showModal)
    }

    const deleteSelected = async () => {
        const noteSelected = content.filter(el => !selected.includes(el.id))
        
        if (noteSelected.length<1) {
            await deleteFile()
            setContent(noteSelected)
            
            setIsPressed(false)
            return
        }

        await writeFile(JSON.stringify(noteSelected))
        setContent(noteSelected)
        setIsPressed(false)
    }

    const addFavorites = async () => {
        const toggleFavorite = content.map((el, i) => {
            if (selected.includes(el.id)) {
                return {
                    ...el, favorite: !isFavorite
                }
            }

            return el
        })

        setIsFavorite(!isFavorite)
        setContent(toggleFavorite)
        setIsPressed(false)
        await writeFile(JSON.stringify(toggleFavorite))
    }

    useEffect(() => {
        const df = content.filter((el, i) => el.id === defaultSelection)
        setSelectedNote(df)

        if (df[0].favorite) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
    }, [])
    
    useEffect(() => {
        const df = content.filter((el, i) => el.id === selected[0])
        setSelectedNote(df)

        if (df.length>0) {
            if (df[0].favorite) {
                setIsFavorite(true)
            } else {
                setIsFavorite(false)
            }
        }
    }, [selected])

    useEffect(() => {
        const backAction = () => {
            setIsPressed(false)
            setIsSelectedAll(false)

            return true
        }

        const handler = BackHandler.addEventListener("hardwareBackPress", backAction)

        return () => handler.remove()
    },[isPressed,isSelectedAll])

    return (
        <>
            <DeleteModal showModal={showModal} setShowModal={setShowModal} deleteNote={deleteSelected}/>
            <View style={styles.container}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => {
                    setIsPressed(false)
                    setIsSelectedAll(false)
                }
                }>
                    <MaterialIcons name="close" size={24} color="#abd0e5ff"/>
                    <Text style={{color:theme.color, fontSize:12}}>Escape</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} disabled={selected.length<1} onPress={addFavorites}>
                    {isFavorite &&
                        <>
                            <MaterialIcons name="favorite" size={24} color={selected.length<1 ? "#ccc" :"#edaf11e4"} />
                            <Text style={{color:theme.color, fontSize:12}}>Unfavorite</Text>
                        </>
                    }
                    
                    {!isFavorite &&
                        <>
                        <MaterialIcons name="favorite" size={24} color={selected.length<1 ? "grey" :theme.color} />
                            <Text style={{color:theme.color, fontSize:12}}>Favorite</Text>
                        </>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={deleteOptions} disabled={selected.length<1}>
                    <MaterialIcons name="delete" size={24} color={selected.length<1?"grey":theme.deleteIcon} />
                    {selected.length>1 && <Text style={{color:theme.color, fontSize:12}}>Delete All</Text>}
                    {selected.length <= 1 && <Text style={{color:theme.color, fontSize:12}}>Delete</Text>}
                </TouchableOpacity>
                <SaveAsOptions/>
            </View>

        </>
    )
}

function createStyles(theme) {
    return StyleSheet.create({
        container: {
            marginHorizontal:"auto",
            width: "100%",
            height:120,
            backgroundColor: theme.fill,
            flexDirection:"row",
            justifyContent: "space-between",
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 15,
        },
        actionBtn:{
            alignItems:"center"
      }
    })
}


