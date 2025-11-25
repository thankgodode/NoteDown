import { useEffect, useState } from "react";
import { BackHandler} from "react-native";

import DeleteModal from "@/components/DeleteModal";
import Favorites from "@/components/FavoritesComponent";
import { SideMenuProvider } from "@/context/SideMenuContext";
import InteractionProvider from "@/context/InteractionContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useRouter } from "expo-router";

export default function FavoritesRoute() {
  const [showModal, setShowModal] = useState(false);
  const navigation = useRouter()

  useEffect(() => {
    const backAction = () => {
      navigation.push("/")
      return true
    }

    const handler = BackHandler.addEventListener("hardwareBackPress", backAction)

    return () => handler.remove()
  },[navigation])

  return (
    <ThemeProvider>
      <DeleteModal showModal={showModal} setShowModal={setShowModal} />
        <SideMenuProvider>
          <InteractionProvider>
            <Favorites />
          </InteractionProvider>
        </SideMenuProvider>
    </ThemeProvider>
  );
}
