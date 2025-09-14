import { MaterialIcons } from "@expo/vector-icons";

import { Link, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

import SelectList from "@/components/SelectList";

import { FontAwesome5 } from "@expo/vector-icons";
import { useContext } from "react";
import {InteractionContext} from "@/context/InteractionContext";


export default function NoteList({content, setContent,loading}) {
    const {
        isPressed,
        setIsPressed,
        defaultSelection,
        setDefaultSelection,
        selected,
        setSelected,
    } = useContext(InteractionContext)

    if (loading) {
        return (
            <ActivityIndicator
                size="large"
                color="#0000ff"
                style={{ alignSelf: "center", marginTop: 20 }}
            />
        )
    }

    return (
        <FlatList
            numColumns={2}
            data={content}
            keyExtractor={(item)=> item.id}
            columnWrapperStyle={{
                gap: 15,
                marginBottom: 5,
                justifyContent: "center",
                marginHorizontal: "auto",
                width: 100,
            }}
            contentContainerStyle={{
                paddingBottom: 100,
            }}
            renderItem={({ item }) => {
                return (
                    <>
                        {!isPressed &&
                            <Items
                                item={item}
                                setIsPressed={setIsPressed}
                                setDefaultSelection={setDefaultSelection}
                            />
                        }
                        {isPressed &&
                            <SelectList
                                item={item}
                                defaultSelection={defaultSelection}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        }
                    </>
                )
            }}
            ListEmptyComponent={<EmptyComponent/>}
        />
    )
}

export const Items = ({item,setIsPressed,setDefaultSelection}) => {
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

const EmptyComponent = () => {
    return (
        <View style={{height:500, justifyContent:"center", alignItems:"center"}}>
            <FontAwesome5 name="box-open" size={100} color="black"/>
            <Text style={{fontSize:20}}>No note file found...</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    fileContainer: {
        padding: 14,
        borderRadius: 15,
        backgroundColor: "#e3e7f3ff",
        marginTop: 20,
        width: 165,
        height: 250,
        overflow: "hidden",
    },
    detailsWrapper: {
        padding:8,
        alignItems: "center"
    }
})