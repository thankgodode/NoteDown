import NavBar from "@/components/NavBar";
import SideMenu from "@/components/SideMenu";
import { SideMenuProvider } from "@/context/SideMenuContext";

export default function Folder() {
    return (
        <SideMenuProvider>
            <NavBar title="Folders"/>
            <SideMenu/>
        </SideMenuProvider>
    )
}