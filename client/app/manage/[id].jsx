import ActionBar from "@/components/ActionBar"
import SelectList from "@/components/SelectList"
import { readFile } from "@/services/api"
import useFetch from "@/services/useFetch"
import { Feather } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { FlatList, Pressable, StatusBar, StyleSheet, Text, View } from "react-native"

export default function Manage() {
    const [selected, setSelected] = useState([])
    const [isSelectedAll, setIsSelectedAll] = useState(false)
    

    const { id } = useLocalSearchParams()
    const { data } = useFetch(() => readFile())

    const selectAll = () => {
        const arr = []
        const ids = data.forEach((el) => {
            arr.push(el.id)
        })

        setSelected(arr)
        setIsSelectedAll(true)
    }

    const deselectAll = () => {
        setSelected([])
        setIsSelectedAll(false)
    }

    return(
        <>
            <View style={styles.navContainer}>
                {
                    isSelectedAll &&
                    <Pressable onPress={deselectAll} style={{ alignItems: "center" }}>
                        <Feather name="check-circle" size={24} color="black" />
                        <Text>All</Text>
                    </Pressable>
                }
                {
                    !isSelectedAll &&
                    <Pressable onPress={selectAll} style={{ alignItems: "center" }}>
                        <Feather name="circle" size={24} color="black" />
                        <Text>All</Text>
                    </Pressable>
                }
            </View>  
            <FlatList
                numColumns={2}
                data={data}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={{
                    gap: 15,
                    paddingRight: 5,
                    marginBottom: 5,
                    justifyContent: "center",
                }}
                contentContainerStyle={{
                    paddingBottom: 100,
                    
                }}
                renderItem={({ item }) => {
                    return (
                        <SelectList
                            item={item}
                            defaultSelection={parseInt(id)}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    )
                }}
            />
            {selected.length>0 && <ActionBar />}
        </>
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