import { useState } from "react";
import { View } from "react-native";

import DeleteModal from "@/components/DeleteModal";
import Favorites from "@/components/FavoritesComponent";
import { SideMenuProvider } from "@/context/SideMenuContext";
import InteractionProvider from "@/context/InteractionContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function FavoritesRoute() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DeleteModal showModal={showModal} setShowModal={setShowModal} />
      <View style={{ flex: 1 }}>
        <ThemeProvider>
          <SideMenuProvider>
            <InteractionProvider>
              <Favorites />
            </InteractionProvider>
          </SideMenuProvider>
        </ThemeProvider>
      </View>
    </>
  );
}
