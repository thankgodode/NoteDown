import NavBar from "@/components/NavBar";
import SideMenu from "@/components/SideMenu";
import { SideMenuProvider } from "@/context/SideMenuContext";
import { Text, View } from "react-native";

export default function Favorites() {
    return (
        <View>
            <SideMenuProvider>
                <NavBar title="Favorites"/>
                <SideMenu/>
                <Text>Favorites</Text>
            </SideMenuProvider>
        </View>
            
    )
}