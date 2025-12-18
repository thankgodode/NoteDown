import { MaterialIcons } from "@expo/vector-icons";

import { Link, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

import SelectList from "@/components/SelectList";

import { FontAwesome5 } from "@expo/vector-icons";
import { useContext } from "react";
import { InteractionContext } from "@/context/InteractionContext";

import { Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext, ThemeProvider } from "@/context/ThemeContext";

import dayjs from "dayjs"
import calendar from 'dayjs/plugin/calendar'

const {width} = Dimensions.get("window")


export default function NoteList({ content, loading }) {
    const {layout} = useContext(ThemeContext)
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
        <SafeAreaProvider>
            <SafeAreaView>
                <FlatList
                    data={content && content.sort((a,b)=> b.updatedAt-a.updatedAt)}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        flexDirection:"row",
                        paddingBottom: 50,
                        padding: 10,
                        flexWrap: "wrap",
                        gap: 8,
                    }}
                    renderItem={({ item }) => {
                        return (
                            <>
                                {!isPressed &&
                                    <Items
                                        item={item}
                                        setIsPressed={setIsPressed}
                                        setDefaultSelection={setDefaultSelection}
                                        layout={layout}
                                    />
                                }
                                {isPressed &&
                                    <SelectList
                                        item={item}
                                        defaultSelection={defaultSelection}
                                        selected={selected}
                                        setSelected={setSelected}
                                        layout={layout}
                                    />
                                }
                            </>
                        )
                    }}
                    ListEmptyComponent={<EmptyComponent />}
                    removeClippedSubviews={false}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export const Items = ({ item, setIsPressed, setDefaultSelection, layout }) => {
    const {theme} = useContext(ThemeContext)
    const styles = styleFunc(layout, theme)
    
    const format = (date) => {
        dayjs.extend(calendar)

        const formated = dayjs(date).calendar(null, {
            sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
            nextDay: '[Tomorrow]', // The next day ( Tomorrow at 2:30 AM )
            nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
            lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
            lastWeek: '[Last] dddd', // Last week ( Last Monday at 2:30 AM )
            sameElse: 'DD/MM/YYYY' // Everything else ( 7/10/2011 )
        })
        // console.log(formated)
        
        return formated
    }
    
    return (
        <Link href={{
            pathname: `/edit/${item.id}`,
            params: {
                titleLength: item.title.length,
                contentLength: item.content.length
            }
        }}
            asChild>
            <Pressable onLongPress={() => {
                setDefaultSelection(item.id)
                setIsPressed(true)
            }}>
                <View style={styles.wrapper}>
                    <View style={styles.fileContainer}>
                        <WebView
                            style={{
                                backgroundColor: "transparent",
                                overflowY: "hidden",
                                overflowX: "hidden",
                                overscrollBehavior:"none"
                            }}
                            source={{ html: item.content }}
                            // scalesPageToFit={false}
                            textZoom={layout === "list"? 50 : layout==="small" ? 80 :200}
                        />
                    </View>
                    <View style={styles.detailsWrapper}>
                        <Text style={styles.title}>{item.title.length<1?"Untitled":item.title.length>40?item.title.substr(0,40)+"...":item.title}</Text>
                        <Text>
                            <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                                <Text style={{ textAlign:"center", color:theme.color, fontSize:layout==="large" ? 15:layout==="small"?12:layout==="list"?10:""}}>{format(item.updatedAT)}</Text>
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
    const { theme } = useContext(ThemeContext)
    
    return (
        <View style={{height:500, justifyContent:"center", alignItems:"center",flex:1}}>
            <FontAwesome5 name="box-open" size={100} color={theme.color} />
            <Text style={{color:theme.color,fontSize:20}}>No note file found...</Text>
        </View>
    )
}


function styleFunc(layout,theme) {
    return (
        StyleSheet.create({
        wrapper:{
            marginBottom: layout==="list" && 35,
            flexDirection: layout === "list" && "row",
            marginBottom:25,
            gap: 10,
        },
        fileContainer: {
            padding: layout==="list" ? 2 : layout==="small" ? 8 : 14,
            borderRadius: 10,
            backgroundColor: theme.theme === "light" ? "#e3e7f3ff" : "#e3e7f3ff",
            // boxShadow:theme.theme==="light" ? "1px 1px 5px #ddd8d8ff" :"",
            height:100,
            width: layout==="large" ?  (width/2)-15 : layout=== "small" ? (width/3)-12:60,
            height: layout === "large" ? 250 : layout==="small" ? 150: 60,
            overflow: "hidden",
            textAlign: "center",
            zIndex:10
        },
        detailsWrapper:{
            width: layout === "large" ? (width / 2) - 15 : layout === "small" ? (width / 3) - 12 : width,
            alignItems: layout==="list" ? "left" :"center",
        },
        title: {
            fontWeight: "bold",
            fontSize: 15,
            color:theme.noteTitle,
            textAlign: layout === "list" ? "left" : "center",
            width: layout==="list"?"75%":""
        }
    }))
}