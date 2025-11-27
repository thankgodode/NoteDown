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

export default function NavEditor({ children }) {
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
            {children}
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
        })
    )
}