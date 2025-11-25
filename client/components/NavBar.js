import { SideMenuContext } from "@/context/SideMenuContext";
import { ThemeContext } from "@/context/ThemeContext";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NavBar({ title }) {
    const { visible, setVisible } = useContext(SideMenuContext)
    const { toggleLayout, layout, theme} = useContext(ThemeContext)

    const router = useRouter()
    const { height} = useWindowDimensions()
    const headerHeight = Math.max(60, height*0.1)
    
    const styles = createStyles(theme,headerHeight);
    
    return (
        <SafeAreaView style={styles.navContainer} edges={["top"]}>
            <StatusBar
                backgroundColor={theme.fill}
            />
            <View style={styles.rightSide}>
                <TouchableOpacity onPress={() => {
                    setVisible(!visible)
                }}>
                    {!visible ?
                        <AntDesign name="menu-fold" size={24} color={theme.color} />
                        :
                        <AntDesign name="closecircleo" size={24} color={theme.color} />
                    }
                </TouchableOpacity>
                <Text style={styles.text}>{title}</Text>
            </View>
            <View style={styles.leftSide}>
                <TouchableOpacity onPress={()=>router.push("/search")}>
                    <FontAwesome name="search" size={23} color={theme.layoutIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> toggleLayout()}>
                    {layout==="large" && <Entypo name="grid" size={24} color={theme.layoutIcon} />}
                    {layout==="small" && <MaterialCommunityIcons name="dots-grid" size={24} color={theme.layoutIcon} />}
                    {layout==="list" && <FontAwesome6 name="list-ul" size={20} color={theme.layoutIcon} />}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

function createStyles(theme,headerHeight) {
    return (
        StyleSheet.create({
            navContainer: {
                flexDirection: "row",
                width: "100%",
                height:headerHeight,
                justifyContent: "space-between",
                // flex: 1,
                // marginTop: StatusBar.currentHeight,
                alignItems: "center",
                paddingHorizontal: 15,
                backgroundColor: theme.fill,
            },
            rightSide: {
                flexDirection: "row",
                alignItems: "center",
                gap:20
            },
            leftSide: {
                flexDirection: "row",
                alignItems: "center",
                gap:20
            },
            text: {
                fontSize: 20,
                color:theme.color
            }
        })
    )
}