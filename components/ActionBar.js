import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function ActionBar() {
    return (
        <>
            <View style={styles.container}>
                <Pressable style={styles.actionBtn} disabled={true}>
                    <MaterialIcons name="drive-file-move" size={24} color="black"/>
                    <Text>Move</Text>
                </Pressable>
                <Pressable style={styles.actionBtn}>
                    <MaterialIcons name="favorite" size={24} color="black"/>
                    <Text>Favorite</Text>
                </Pressable>
                <Pressable style={styles.actionBtn}>
                    <MaterialIcons name="delete" size={24} color="red" />
                    <Text>Delete All</Text>
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
        backgroundColor:"orange",
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
