import { View } from "react-native";
import SearchComponent from "@/components/SearchComponent"
import { ThemeProvider } from "@/context/ThemeContext";
import InteractionProvider from "@/context/InteractionContext";

export default function Search() {
    return (
        <>
            <View style={{ flex: 1 }}>
                <ThemeProvider>
                    <InteractionProvider>
                        <SearchComponent/>
                    </InteractionProvider>
                </ThemeProvider>
            </View>
        </>
    )
}