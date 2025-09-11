import { deleteFile, writeFile } from "@/services/api";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DeleteModal from "./DeleteModal";
import SuccessModal from "./SuccessModal"

import useConvertToWord from "../services/useConvertToWord"

export default function ActionBar({ selected, content, setContent,setIsPressed,defaultSelection}) {
    const [showModal, setShowModal] = useState(false)
    const [isFavorite, setIsFavorite] = useState(null)
    const [selectedNote, setSelectedNote] = useState([])

    const { convertToWord, loading, message } = useConvertToWord()

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

    const saveAsWord = () => {
        convertToWord(selectedNote[0])
    }

    const saveAsPDF = () => {
        
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
    },[selected])

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
            <SuccessModal message={message}/>
            <DeleteModal showModal={showModal} setShowModal={setShowModal} deleteNote={deleteSelected}/>
            <View style={styles.container}>
                <TouchableOpacity style={styles.actionBtn} onPress={()=> setIsPressed(false)}>
                    <MaterialIcons name="close" size={24} color="red"/>
                    <Text style={{fontSize:12}}>Escape</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} disabled={selected.length<1} onPress={addFavorites}>
                    {isFavorite &&
                        <>
                            <MaterialIcons name="favorite" size={24} color={selected.length<1 ? "#ccc" :"#edaf11e4"} />
                            <Text style={{fontSize:12}}>Unfavorite</Text>
                        </>
                    }
                    
                    {!isFavorite &&
                        <>
                        <MaterialIcons name="favorite" size={24} color={selected.length<1 ? "#ccc" :"grey"} />
                            <Text style={{fontSize:12}}>Favorite</Text>
                        </>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={deleteOptions} disabled={selected.length<1}>
                    <MaterialIcons name="delete" size={24} color={selected.length<1?"#ccc":"red"} />
                    {selected.length>1 && <Text style={{fontSize:12}}>Delete All</Text>}
                    {selected.length <= 1 && <Text style={{fontSize:12}}>Delete</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={saveAsWord} disabled={selected.length>1}>
                    <Entypo name="save" size={24} color={selected.length>1 || selected.length<1?"#ccc":"black"}/>
                    <Text style={{fontSize:12}}>Save as Word</Text>
                </TouchableOpacity>
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
