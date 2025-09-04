import { SideMenuContext } from '@/context/SideMenuContext';
import { AntDesign, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

export default function SideMenu({data}) {
  const {visible, setVisible} = useContext(SideMenuContext)
  const [isActive, setIsActive] = useState("")
  const [content, setContent] = useState("")

  const [hide, setHide] = useState(false)

  const router = useRouter()
  const routePath = useRoute();

  const clickNotes = () => {
      setIsActive("notes")
      router.push("/")
      setHide(!hide)
  }
    
  const clickFolders = () => {
      setIsActive("folders")
      router.push("/folders")
      setHide(!hide)
  }
    
  const clickFavorites = () => {
      setIsActive("favorite")
      router.push("/favorites")
      setHide(!hide)
  }

  useEffect(() => {
    setIsActive()
  },[hide])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        // { translateX: visible ? withSpring(200) :"0"},
        // { translateY: offset.value.y },
        // { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      // backgroundColor: isPressed.value ? 'yellow' : 'blue',
      left: visible ?
            withTiming("0%", {
            duration: 1000,
            easing: Easing.inOut(Easing.quad),
            reduceMotion: ReduceMotion.System,
          }) : withTiming("-100%")
    };
  });

   useEffect(() => {
        if (data) {
            setContent(data)
        }
    }, [data]);
  
  return (
    <>
      {visible &&
        <Animated.View
          style={[styles.sideContainer, animatedStyles]}>
          <TouchableOpacity
            style={[styles.menusItems, { backgroundColor: routePath.name==="index" ? "skyblue" : "transparent" }]}
            onPress={clickNotes}
          >
            <MaterialCommunityIcons name="note" size={24} color="white" />
            <Text style={{color:"white", flex:1}}>
                All notes
            </Text>
            <Text style={{color:"white"}}>
                {data ? data.length : 0}
            </Text>
            </TouchableOpacity>
          <TouchableOpacity
            onPress={clickFolders}
            style={[styles.menusItems, { backgroundColor: routePath.name === "folders" ? "skyblue" : "transparent" }]}
            disabled={true}
          > 
            <AntDesign name="folder1" size={24} color="white"/>
            <Text style={{color:"white", flex:1}}>
                Folders
            </Text>
            <Text style={{color:"white"}}>
                {data ? data.filter((el, i) => el.folder.length>0).length :0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clickFavorites}
            style={[styles.menusItems, { backgroundColor: routePath.name==="favorites" ? "skyblue" : "transparent" }]}
          >
            <Fontisto name="favorite" size={24} color="white" />
            <Text style={{color:"white", flex:1}}>
                Favorites
            </Text>
            <Text style={{color:"white"}}>
                {data? data.filter((el, i) => el.favorite===true).length:0}
            </Text>
          </TouchableOpacity>
        </Animated.View>}
      </>
  );
}

const styles = StyleSheet.create({
  sideContainer: {
    width: 350,
    height: 800,
    backgroundColor: "blue",
    position: "absolute",
    top: 80,
    left: 0,
    padding: 8,
    borderRadius: 10,
    zIndex: 10,
  },
  menusItems: {
    width: "100%",
    flexDirection:"row",
    marginHorizontal: "auto",
    borderRadius:10,
    gap: 10,
    // backgroundColor: "lightblue",
    padding: 15,
  },
  activeBtn: {
    backgroundColor:"skyblue"
  }
})
