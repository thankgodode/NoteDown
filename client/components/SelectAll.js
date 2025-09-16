import {InteractionContext} from "@/context/InteractionContext"
import { Feather } from "@expo/vector-icons"
import { useContext } from "react"
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native"

export default function SelectAll({content}) {
    const {
        isSelectedAll,
        selectAll,
        deselectAll, selected
    }  = useContext(InteractionContext)

    return (
        <View style={styles.navContainer}>
            <Text style={{fontSize:20}}>{selected.length} Selected</Text>
            {
                isSelectedAll &&
                <Pressable onPress={deselectAll} style={{ alignItems: "center" }}>
                    <View style={{flexDirection:"row", gap:5}}>
                        <Text>All</Text>
                        <Feather name="check-circle" size={24} color="black" />
                    </View>
                </Pressable>
            }
            {
                !isSelectedAll &&
                <Pressable onPress={()=>selectAll(content)} style={{ alignItems: "center" }}>
                     <View style={{flexDirection:"row", gap:5}}>
                        <Text>All</Text>
                        <Feather name="circle" size={24} color="black" />
                    </View>
                </Pressable>
            }
        </View>  
    )
}

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        // flex: 1,
        marginTop:StatusBar.currentHeight || 0,
        alignItems: "center",
        padding:15
    },
})