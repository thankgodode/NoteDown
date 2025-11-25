import {InteractionContext} from "@/context/InteractionContext"
import { ThemeContext } from "@/context/ThemeContext"
import { Feather } from "@expo/vector-icons"
import { useContext } from "react"
import { Pressable, StatusBar, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SelectAll({content}) {
    const {
        isSelectedAll,
        selectAll,
        deselectAll, selected
    } = useContext(InteractionContext)
    

    const { theme } = useContext(ThemeContext)
    const { height } = useWindowDimensions()
      const headerHeight = Math.max(60,height*0.1)
    const styles = styleFunc(theme, headerHeight)

    return (
        <SafeAreaView edges={['top']} style={styles.navContainer}>
            <StatusBar backgroundColor={theme.fill}/>
            <Text style={{fontSize:20,color:theme.color}}>{selected.length} Selected</Text>
            {
                isSelectedAll  &&
                <Pressable onPress={deselectAll} style={{ alignItems: "center" }}>
                    <View style={{flexDirection:"row", gap:5}}>
                        <Text style={{color:theme.color}}>All</Text>
                        <Feather name="check-circle" size={24} color={theme.color} />
                    </View>
                </Pressable>
            }
            {
                !isSelectedAll &&
                <Pressable onPress={()=>selectAll(content)} style={{ alignItems: "center" }}>
                     <View style={{flexDirection:"row", gap:5}}>
                        <Text style={{color:theme.color}}>All</Text>
                        <Feather name="circle" size={24} color={theme.color} />
                    </View>
                </Pressable>
            }
        </SafeAreaView>  
    )
}

function styleFunc(theme,headerHeight) {
    return StyleSheet.create({
        navContainer: {
            flexDirection: "row",
            height:headerHeight,
            justifyContent: "space-between",
            // flex: 1,
            // marginTop:StatusBar.currentHeight || 0,
            paddingHorizontal:15,
            alignItems: "center",
            backgroundColor:theme.fill
        },
    })
}
