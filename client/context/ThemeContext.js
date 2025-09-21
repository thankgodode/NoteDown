import { createContext, useEffect, useState } from "react"
import { Appearance } from "react-native"
import { Colors } from "../constants/Colors"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
    const [count, setCount] = useState(0)
    const [layout, setLayout] = useState("large")
    
    const layoutOptions = ["large", "small", "list"]
    const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

    const toggleLayout = async () => {
        if (count >= 2) {
            setCount(0)
        } else {
            setCount(count+1)
        }
    }

    useEffect(() => {
        async function fetchData(){
            try {
                const storedOpt = await AsyncStorage.getItem("layout")
                console.log("Layout: ", storedOpt)

                if (storedOpt) {
                    const parsed = JSON.parse(storedOpt)
                    setCount(JSON.parse(parsed.id))
                    
                } else {
                    await AsyncStorage.setItem("layout", JSON.stringify({id:count, option:layoutOptions[count]}))
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])
    
    useEffect(() => {
        async function fetchLS(){
            try {
                await AsyncStorage.setItem("layout", JSON.stringify({ id: count, option: layoutOptions[count] }))
                setLayout(layoutOptions[count])
            } catch (error) {
                console.error(error)
            }
        }

        fetchLS()
    },[count])

    return (
        <ThemeContext.Provider
            value={{
                theme,
                colorScheme,
                setColorScheme,
                toggleLayout,
                layout
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}