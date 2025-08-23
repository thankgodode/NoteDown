import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function NoteList({ item,setIsPressed,setDefaultSelection }) {
    const router = useRouter()

    return (
        <Link href={`/edit/${item.id}`} asChild>
            <Pressable onLongPress={() => {
                // router.push(`/manage/${item.id}`)
                setDefaultSelection(item.id)
                setIsPressed(true)
            }}>
                <View>
                    <View style={styles.fileContainer}>
                        <View style={{flex:1}}>
                            <WebView
                                style={{
                                    backgroundColor: "transparent",
                                    overflowY: "hidden",
                                    overflowX: "hidden",
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
                                <Text>{item.favorite && <MaterialIcons name="favorite" size={24} color="#edaf11e4" />}</Text>
                            </View>
                        </Text>
                    </View>
                </View>
            </Pressable>
        </Link>
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