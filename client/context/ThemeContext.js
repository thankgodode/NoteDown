import { createContext, useEffect, useState } from "react"
import { Appearance } from "react-native"
import { Colors } from "../constants/Colors"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
    const [colorScheme, setColorScheme] = useState("")
    const [count, setCount] = useState(0)
    const [layout, setLayout] = useState("large")
    
    const layoutOptions = ["large", "small", "list"]
    const theme = colorScheme ==="dark"? Colors.dark : Colors.light

    const toggleTheme = async() => {
        const newTheme = colorScheme ==="light" ? "dark" : "light"
        setColorScheme(newTheme)
        await AsyncStorage.setItem("theme", JSON.stringify({theme:newTheme}))
    }

    const toggleLayout = async () => {
        if (count >= 2) {
            setCount(0)
        } else {
            setCount(count+1)
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const storedOpt = await AsyncStorage.getItem("layout")

                if (storedOpt) {
                    const parsed = JSON.parse(storedOpt)
                    setCount((parsed.id))
                    
                } else {
                    await AsyncStorage.setItem("layout", JSON.stringify({id:count, option:layoutOptions[count]}))
                }
            } catch (error) {
                console.error(error)
            }
        }

        async function fetchTheme() {
            const storedTheme = await AsyncStorage.getItem("theme")
            const parseTheme = JSON.parse(storedTheme)
            
            if (storedTheme) {
                setColorScheme(parseTheme.theme)
            } else {
                const systemTheme = Appearance.getColorScheme()
                setColorScheme(systemTheme)
                await AsyncStorage.setItem("theme", JSON.stringify({theme:parseTheme.theme}))
            }
        }
        
        fetchTheme()
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
                toggleTheme,
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