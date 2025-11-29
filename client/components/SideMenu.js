import { SideMenuContext } from '@/context/SideMenuContext';
import { ThemeContext } from '@/context/ThemeContext';
import { AntDesign, Entypo, Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

export default function SideMenu({data}) {
  const { visible,setVisible} = useContext(SideMenuContext)
  const {theme, toggleTheme} = useContext(ThemeContext)
  const [hide, setHide] = useState(false)

  
  const { height,width } = useWindowDimensions()
  const headerHeight = Math.max(70, height*0.115)

  const router = useRouter()
  const routePath = useRoute()

  const styles = createStyles(theme,headerHeight,width)
  
  const clickNotes = () => {
      router.push("/")
      setHide(!hide)
  }
    
  const clickFolders = () => {
      router.push("/folders")
      setHide(!hide)
  }
    
  const clickFavorites = () => {
      router.push("/favorites")
      setHide(!hide)
  }

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
            duration: 500,
            easing: Easing.inOut(Easing.quad),
            reduceMotion: ReduceMotion.System,
          }) : withTiming("-100%")
    };
  });

  const animatedStyles_two = useAnimatedStyle(() => {
    return {
      left: visible ?
            withTiming("0%", {
            duration: 200,
            easing: Easing.inOut(Easing.quad),
            reduceMotion: ReduceMotion.System,
          }) : withTiming("-100%")
    }
  })

  const onClose = () => {
    setVisible(false)
  }

  const renderOutsideTouchable = () => {
    const view = <Animated.View style={[{ height: "100%",
      position: "absolute",
      width:"100%",
      zIndex:3,
      left: 0,
      padding: 8,
      borderRadius: 10,
      backgroundColor: "#00000077" },animatedStyles_two]} />
    
    return (
      <TouchableWithoutFeedback onPress={onClose}>
        {view}
      </TouchableWithoutFeedback>
    )
  }

  return (
    <>
      {visible && renderOutsideTouchable()}
      {visible &&
        <Animated.View
          style={[styles.sideContainer, animatedStyles]}>
          <TouchableOpacity
            style={[styles.menusItems, { backgroundColor: routePath.name==="index" ? theme.tab : "transparent" }]}
            onPress={clickNotes}
          >
            <MaterialCommunityIcons name="note" size={24} color={theme.color} />
            <Text style={{color:theme.color, flex:1}}>
                All notes
            </Text>
            <Text style={{color:theme.color}}>
                {data ? data.length : 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clickFolders}
            style={[styles.menusItems, { backgroundColor: routePath.name === "folders" ? theme.tab : "transparent" }]}
            disabled={true}
          > 
            <AntDesign name="folder1" size={24} color={theme.color} />
            <Text style={{color:theme.color, flex:1}}>
                Folders
            </Text>
            <Text style={{color:theme.color }}>
                {data ? data.filter((el, i) => el.folder.length>0).length :0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clickFavorites}
            style={[styles.menusItems, { backgroundColor: routePath.name==="favorites" ? theme.tab : "transparent" }]}
          >
            <Fontisto name="favorite" size={24} color={theme.color} />
            <Text style={{color:theme.color, flex:1}}>
                Favorites
            </Text>
            <Text style={{color:theme.color}}>
                {data? data.filter((el, i) => el.favorite===true).length:0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menusItems]} onPress={toggleTheme}>
            {theme.theme === "light" && <Entypo name="light-up" size={34} color={theme.color} />}
            {theme.theme === "dark" && <MaterialIcons name="dark-mode" size={34} color={theme.color} />}
          </TouchableOpacity>
        </Animated.View>}
      </>
  );
}

function createStyles(theme,headerHeight,width) {
  return StyleSheet.create({
    sideContainer: {
      width: width*0.75,
      height: "100%",
      backgroundColor: theme.fill,
      position: "absolute",
      zIndex:100,
      top: headerHeight,
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
      padding: 15,
    },
    activeBtn: {
      backgroundColor:"skyblue"
    }
  })
}
