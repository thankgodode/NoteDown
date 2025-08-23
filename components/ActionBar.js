import { deleteFile, writeFile } from "@/services/api";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function ActionBar({ selected, content, setContent,setIsPressed }) {
    
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

    return (
        <>
            <View style={styles.container}>
                <Pressable style={styles.actionBtn} onPress={()=>setIsPressed(false)}>
                    <MaterialIcons name="close" size={24} color="red"/>
                    <Text>Escape</Text>
                </Pressable>
                <Pressable style={styles.actionBtn}>
                    <MaterialIcons name="favorite" size={24} color="black"/>
                    <Text>Favorite</Text>
                </Pressable>
                <Pressable style={styles.actionBtn} onPress={deleteSelected}>
                    <MaterialIcons name="delete" size={24} color="black" />
                    <Text>Delete</Text>
                </Pressable>
                <Pressable style={styles.actionBtn}>
                    <Entypo name="save" size={24} color="black"/>
                    <Text>Save as</Text>
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
