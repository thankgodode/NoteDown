import CreateButton from "@/components/CreateButton";
import NavBar from "@/components/NavBar";
import NoteList from "@/components/NoteList";
import SideMenu from "@/components/SideMenu";
import { SideMenuProvider } from "@/context/SideMenuContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { readFile } from '@/services/api';
import useFetch from "@/services/useFetch";
import { StyleSheet, useWindowDimensions, View } from "react-native";

export default function Index() {
    const {width,height} = useWindowDimensions()
    const placeholder = [
        {
            content: "Title",
            fileName: "File name",
            createdAt: "August 12",
            id:1
        },
        {
            content: "Title",
            fileName: "File name",
            createdAt: "August 12",
            id:2,
        },
        {
            content: "Title",
            fileName: "File name",
            createdAt: "August 12",
            id:3
        },
        {
            content: "Title",
            fileName: "File name",
            createdAt: "August 12",
            id:4
        },
        {
            content: "Title",
            fileName: "File name",
            createdAt: "August 12",
            id:5
            
        },
        {
            content: "Title",
            fileName: "File name",
            createdAt: "August 12",
            id:6
            
        },
    ]

    const {data}  = useFetch(() => readFile())

    // useEffect(() => {
    //     const file = async () => {
    //         const rawData = await readFile()
    //         setData(JSON.parse(rawData))
    //     }

    //     file()
    // }, [])
      
    return (
        <View style={{flex:1}}>
            <ThemeProvider>
                <SideMenuProvider>
                    <NavBar title="All notes"/>
                    <SideMenu />
                    <NoteList data={data} width={width} />
                    <CreateButton />
                </SideMenuProvider>
            </ThemeProvider>
        </View>
    )
}


const styles = StyleSheet.create({
    fileContainer: {
        padding: 14,
        borderRadius: 15,
        backgroundColor: "#e3e7f3ff",
        marginTop: 20,
        width: 180,
        height: 250,
        overflow: "hidden",
        position:"relative"
    },
    detailsWrapper: {
        padding:8,
        alignItems: "center"
        
    }
})