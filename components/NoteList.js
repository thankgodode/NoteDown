import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

export default function NoteList({ data, width }) {
    const router = useRouter()

    return (
        <FlatList
            numColumns={2}
            data={data}
            keyExtractor={(item)=> item.id}
            columnWrapperStyle={{
                gap: 15,
                paddingRight: 5,
                marginBottom: 5,
                justifyContent: "center",
            }}
            contentContainerStyle={{
                paddingBottom: 100,
                
            }}
            renderItem={({item}) => {
                return (
                    <Link href={`/edit/${item.id}`} asChild>
                        <TouchableOpacity>
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
                                            <Text>{item.favorite && <MaterialIcons name="favorite" size={24} color="#edcc11ff" />}</Text>
                                        </View>
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>
                )
            }}
        />
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