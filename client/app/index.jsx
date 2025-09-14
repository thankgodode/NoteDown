import DeleteModal from "@/components/DeleteModal";
import Home from "@/components/HomeComponent";
import InteractionProvider from "@/context/InteractionContext";

import { SideMenuProvider } from "@/context/SideMenuContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { BackHandler, View } from "react-native";

export default function IndexRoute() {
    const [showModal, setShowModal] = useState(false)
    
    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp()
            return true
        }

        const handler = BackHandler.addEventListener("hardwareBackPress", backAction)

        return () => handler.remove()
    },[])

    return (
        <>
        <DeleteModal showModal={showModal} setShowModal={setShowModal}/>
        <View style={{flex:1}}>
            <ThemeProvider>
                <SideMenuProvider>
                    <InteractionProvider>
                        <Home />
                    </InteractionProvider>
                </SideMenuProvider>
            </ThemeProvider>
        </View>
        </>
    )
}