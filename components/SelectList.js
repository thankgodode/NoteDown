import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function SelectList({ item, defaultSelection,selected,setSelected }) {

    useEffect(() => {
       setSelected([defaultSelection]) 
    },[])
    
    const selection = (id) => {

        setSelected([...selected,id])

        if (selected.includes(id)) {
            const toggle = selected.filter((el,i) => el !== id)
            setSelected(toggle)
        }

        console.log(selected)
    }

    return (
        <Pressable onPress={()=> selection(item.id)}>
            <View>
                <View style={styles.fileContainer}>
                {selected.includes(item.id) ?
                    <Feather name="check-circle" size={24} color="black" />
                    :
                    <Feather name="circle" size={24} color="black"/>
                }
                    <View style={{flex:1}}>
                        <WebView
                            style={{
                                backgroundColor: "transparent",
                                overflowY: "hidden",
                                overflowX: "hidden"
                            }}
                            source={{ html: item.content }}
                            scalesPageToFit={false}
                        />
                    </View>
                </View>
                <View style={styles.detailsWrapper}>
                    <Text style={{fontWeight:"bold",fontSize:15}}>{item.title.length<1?"Untitled":item.title}</Text>
                    <Text>
                        <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                            <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
                            <Text>{item.favorite && <MaterialIcons name="favorite" size={24} color="#edcc11ff" />}</Text>
                        </View>
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    fileContainer: {
        padding: 14,
        borderRadius: 15,
        backgroundColor: "#e3e7f3ff",
        marginTop: 20,
        width: 180,
        height: 250,
        overflow: "hidden",
    },
    detailsWrapper: {
        padding:8,
        alignItems: "center"
    }
})