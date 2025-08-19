import CreateButton from "@/components/CreateButton";
import NavBar from "@/components/NavBar";
import NoteList from "@/components/NoteList";
import SideMenu from "@/components/SideMenu";
import { SideMenuProvider } from "@/context/SideMenuContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { readFile } from '@/services/api';
import useFetch from "@/services/useFetch";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, useWindowDimensions, View } from "react-native";

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

    const { data } = useFetch(() => readFile())
    
    return (
        <View style={{flex:1}}>
            <ThemeProvider>
                <SideMenuProvider>
                    <NavBar title="All notes"/>
                    <SideMenu data={data} />
                    <FlatList
                        numColumns={2}
                        data={data}
                        keyExtractor={(item)=> item.id}
                        columnWrapperStyle={{
                            gap: 15,
                            paddingRight: 5,
                            marginBottom: 5,
                            justifyContent: "center",
                        }}
                        contentContainerStyle={{
                            paddingBottom: 100,
                            
                        }}
                        renderItem={({item}) =>
                            <NoteList item={item} width={width} />
                        }
                        ListEmptyComponent={<EmptyComponent/>}
                    />
                    <CreateButton />
                </SideMenuProvider>
            </ThemeProvider>
        </View>
    )
}

export const EmptyComponent = () => {
    return (
        <View style={{height:500, justifyContent:"center", alignItems:"center"}}>
            <FontAwesome5 name="box-open" size={100} color="black"/>
            <Text style={{fontSize:20}}>No note file found...</Text>
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