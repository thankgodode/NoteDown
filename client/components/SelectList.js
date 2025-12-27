import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { Dimensions } from "react-native";
import {InteractionContext} from "@/context/InteractionContext";
import { ThemeContext } from "@/context/ThemeContext";
import dayjs from "dayjs"
import calendar from 'dayjs/plugin/calendar'

const {width} = Dimensions.get("window")

export default function SelectList({ item, defaultSelection, selected, setSelected, layout }) {
    const { isSelectedAll, setIsSelectedAll } = useContext(InteractionContext)
    const {theme} = useContext(ThemeContext)
    const styles = styleFunc(layout, theme, selected, item.id)
    
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
    
    useEffect(() => {
       setSelected([defaultSelection]) 
    },[])
    
    const selection = (id) => {

        setSelected([...selected, id])
        
        
        if (selected.includes(id)) {
            const toggle = selected.filter((el,i) => el !== id)
            setSelected(toggle)

            if (isSelectedAll) {
                setIsSelectedAll(!isSelectedAll)
            }
        }
    }

    return (
        <Pressable onPress={()=> selection(item.id)}>
            <View style={styles.wrapper}>
                <View style={styles.fileContainer}>
                    <View style={{flex:1}}>
                        <WebView
                            style={{
                                backgroundColor: "transparent",
                                overflowY: "hidden",
                                overflowX: "hidden",
                            }}
                            source={{ html: item.content }}
                            // scalesPageToFit={false}
                            textZoom={layout === "list"? 50 : layout==="small" ? 80 : 200}
                        />
                    </View>
                    <View style={styles.selectIcon}>
                        {selected.includes(item.id) ?
                            <Feather name="check-circle" size={layout==="large" ? 24 : layout==="small" ? 20 :15} color="black" />
                            :
                            <Feather name="circle" size={layout==="large" ? 24 : layout==="small" ? 20 :15} color="black" />
                        }
                    </View>
                </View>
                <View style={styles.detailsWrapper}>
                    <Text style={{width: layout==="list"?"75%":"",color:theme.noteTitle, fontWeight:"bold",fontSize:15}}>{item.title.length<1?"Untitled":item.title}</Text>
                    <Text>
                        <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
                            <Text style={{ textAlign:"center", color:theme.color, fontSize:layout==="large" ? 15:layout==="small"?12:layout==="list"?10:""}}>{format(item.updatedAT)}</Text>
                            <Text>{item.favorite===1 && <MaterialIcons name="favorite" size={24} color="#edaf11e4" />}</Text>
                        </View>
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

function styleFunc(layout,theme,selected,id) {
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
                backgroundColor: selected.includes(id) ? "#aab6d2ff" : theme.theme==="light"?"#e3e7f3ff" : "#e3e7f3ff",
                height:100,
                width: layout === "large" ? (width / 2) - 15 : layout === "small" ? (width / 3) - 12 : 60,
                // boxShadow:theme.theme==="light" ? "1px 1px 5px #ddd8d8ff" :"",
                height: layout === "large" ? 250 : layout==="small" ? 150: 60,
                overflow: "hidden",
                textAlign: "center",
                zIndex: 10,
            },
            detailsWrapper:{
                width: layout === "large" ? (width / 2) - 15 : layout === "small" ? (width / 3) - 12 : width,
                alignItems: layout === "list" ? "left" : "center",
            },
            selectIcon: {
                position: "absolute",
                backgroundColor: selected.includes(id) ? "#aab6d2ff" : theme.theme==="light"?"#e3e7f3ff" : "#e3e7f3ff",
                width: 200,
                flex:1,
                left: 0,
                bottom:0,
                padding: layout==="list" ? 3 : layout==="small" ? 5 : 7
            },
            title:{
                width: layout==="list"?"75%":""
            }
        })
    )
}