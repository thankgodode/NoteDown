import NavBar from "@/components/NavBar";
import NoteList from "@/components/NoteList";
import SideMenu from "@/components/SideMenu";
import { SideMenuProvider } from "@/context/SideMenuContext";
import { readFile } from '@/services/api';
import useFetch from "@/services/useFetch";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";



export default function Favorites() {
    const [favorites, setFavorites] = useState("")
    const { data } = useFetch(() => readFile())

    useEffect(() => {
        if (data) {
            setFavorites(data.filter((el,i)=>el.favorite===true))
        }
    }, [data]);

    return favorites === "" ? null :
        (
        <View>
            <SideMenuProvider>
                <NavBar title="Favorites"/>
                <SideMenu data={data} />
                 <FlatList
                    numColumns={2}
                    data={favorites}
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
                        <NoteList item={item}/>
                    }
                    ListEmptyComponent={<EmptyComponent/>}
                />
            </SideMenuProvider>
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