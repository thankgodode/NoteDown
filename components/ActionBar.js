import { deleteFile, writeFile } from "@/services/api";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DeleteModal from "./DeleteModal";

import convertToWord from "../utils/convertToWord"

export default function ActionBar({ selected, content, setContent,setIsPressed,defaultSelection,screen}) {
    const [showModal, setShowModal] = useState(false)
    const [isFavorite, setIsFavorite] = useState(null)

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
        const favorite = content.map((el, i) => {
            if (selected.includes(el.id)) {
                return {
                    ...el, favorite: !isFavorite
                }
            }

            return el
        })

        setIsFavorite(!isFavorite)
        setContent(favorite)
        setIsPressed(false)
        await writeFile(JSON.stringify(favorite))
    }

    useEffect(() => {
        const df = content.filter((el, i) => el.id === defaultSelection)
        
        if (df[0].favorite) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
    }, [])
    
    useEffect(() => {
        const df = content.filter((el, i) => el.id === selected[0])
        if (df.length>0) {
            if (df[0].favorite) {
                setIsFavorite(true)
            } else {
                setIsFavorite(false)
            }
        }
    },[selected])

    return (
        <>
            <DeleteModal showModal={showModal} setShowModal={setShowModal} deleteNote={deleteSelected}/>
            <View style={styles.container}>
                <Pressable style={styles.actionBtn} onPress={()=> setIsPressed(false)}>
                    <MaterialIcons name="close" size={24} color="red"/>
                    <Text style={{fontSize:12}}>Escape</Text>
                </Pressable>
                <Pressable style={styles.actionBtn} disabled={selected.length<1} onPress={addFavorites}>
                    {isFavorite &&
                        <>
                            <MaterialIcons name="favorite" size={24} color="#edaf11e4" />
                            <Text style={{fontSize:12}}>Unfavorite</Text>
                        </>
                    }
                    
                    {!isFavorite &&
                        <>
                            <MaterialIcons name="favorite" size={24} color="grey" />
                            <Text style={{fontSize:12}}>Favorite</Text>
                        </>
                    }

                </Pressable>
                <Pressable style={styles.actionBtn} onPress={deleteOptions} disabled={selected.length<1}>
                    <MaterialIcons name="delete" size={24} color={selected.length<1?"#ccc":"red"} />
                    {selected.length>1 && <Text style={{fontSize:12}}>Delete All</Text>}
                    {selected.length <= 1 && <Text style={{fontSize:12}}>Delete</Text>}
                </Pressable>
                <Pressable style={styles.actionBtn} onPress={()=>convertToWord(content)}>
                    <Entypo name="save" size={24} color="black"/>
                    <Text style={{fontSize:12}}>Save as</Text>
                </Pressable>
            </View>
        </>
    )
}

const styles =
    StyleSheet.create({
      container: {
        marginHorizontal:"auto",
        width: "100%",
        height:120,
        backgroundColor:"#e9e7e7ff",
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
