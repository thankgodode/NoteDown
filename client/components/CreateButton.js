import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from 'react';

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from 'expo-router';

export default function CreateButton() {
  const { theme } = useContext(ThemeContext)
  const router = useRouter();

  const { height,width } = useWindowDimensions()
  const headerHeight = Math.max(60,height*0.1)
  const styles = createStyles(theme,headerHeight,width/2)

  const navCreateNote = () => {
    router.push("/create")
  }
  
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navCreateNote}  
      >
        <FontAwesome6 name="notes-medical" size={25} color={theme.createBtnIcon} />
      </TouchableOpacity>
    </View>
  );
}

function createStyles(theme,headerHeight) {
  return (
    StyleSheet.create({
      container: {
        backgroundColor: theme.createBtn,
        // position: "absolute",
        // zIndex:50,
        bottom: headerHeight,
        left:"70%",
        padding: 15,
        height: 60,
        width: 60,
        justifyContent: "center",
        alignItems:"center",
        borderRadius: 50,
        boxShadow: theme.theme===
        "light"?"1px 5px 10px #dcdadaff":""
      }
  }))
}

const styless = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center",
        backgroundColor: "#030d7fff",
        position: "absolute",
        zIndex:100,
        bottom: 40,
        borderRadius: 30,
        width: "80%",
        // padding: 8,
    },
    tabItem: {
        flex:1,
        flexDirection: "row",
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        gap: 5,
        backgroundColor: "blue",
        transitionDuration: "0.3s",
    },
    text: {
        color: "black",
        marginLeft: 0,
    }
})