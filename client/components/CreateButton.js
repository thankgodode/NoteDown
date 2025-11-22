import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from 'react';

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from 'expo-router';

export default function CreateButton() {
  const { theme } = useContext(ThemeContext)
  const router = useRouter();

  const styles = createStyles(theme)

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

function createStyles(theme) {
  return (
    StyleSheet.create({
      container: {
        backgroundColor: theme.createBtn,
        position: "absolute",
        // zIndex:50,
        right: 40,
        top:580,
        padding: 15,
        borderRadius: 50,
        // boxShadow: theme.theme==="light"?"1px 1px 10px #e8e2e2ff":"1px 1px 10px #233D4C"
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