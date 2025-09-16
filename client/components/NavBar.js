import { SideMenuContext } from "@/context/SideMenuContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NavBar({title}) {
    const { visible, setVisible } = useContext(SideMenuContext)
    const router = useRouter()
    
    const styles = createStyles();
    return (
        <View style={styles.navContainer}>
            <StatusBar style="auto" />
            <View style={styles.rightSide}>
                <TouchableOpacity onPress={() => {
                    setVisible(!visible)
                }}>
                    {!visible ?
                        <AntDesign name="menu-fold" size={24} color="black" />
                        :
                        <AntDesign name="closecircleo" size={24} color="black" />
                    }
                </TouchableOpacity>
                <Text style={styles.text}>{title}</Text>
            </View>
            <View style={styles.leftSide}>
                <TouchableOpacity onPress={()=>router.push("/search")}>
                    <FontAwesome name="search" size={23} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo name="dots-three-vertical" size={24} color="black"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function createStyles() {
    return (
        StyleSheet.create({
            navContainer: {
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                // flex: 1,
                marginTop: StatusBar.currentHeight || 0,
                alignItems: "center",
                padding:15
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
                fontSize:20
            }
        })
    )
}