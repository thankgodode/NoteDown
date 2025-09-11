import ActionBar from "@/components/ActionBar";
import DeleteModal from "@/components/DeleteModal";
import NavBar from "@/components/NavBar";
import NoteList from "@/components/NoteList";
import SelectAll from "@/components/SelectAll";
import SideMenu from "@/components/SideMenu";
import { SideMenuProvider } from "@/context/SideMenuContext";
import { readFile } from '@/services/api';
import useFetch from "@/services/useFetch";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Favorites() {
    const { data } = useFetch(() => readFile())
    
    const [content, setContent] = useState([])
    const [isPressed, setIsPressed] = useState(false)
    const [defaultSelection, setDefaultSelection] = useState(null)
    const [selected, setSelected] = useState([])
    const [isSelectedAll, setIsSelectedAll] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const selectAll = () => {
        const arr = []
        data.forEach((el) => {
            arr.push(el.id)
        })

        setSelected(arr)
        setIsSelectedAll(true)
    }

    const deselectAll = () => {
        setSelected([])
        setIsSelectedAll(false)
    }

    useEffect(() => {
        if (data) {
            setContent(data)
        }
    }, [data]);

    return content === "" ? null :
        (
            <>
                {loading &&
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        style={{alignSelf:"center", marginTop:20}}
                    />
                }
                {loading && <Text style={{fontSize:18,marginHorizontal:"auto",marginTop:30}}>Saving file...</Text>}
                <DeleteModal showModal={showModal} setShowModal={setShowModal}/>
                <View style={{flex:1}}>
                    <SideMenuProvider>
                        {!isPressed && <NavBar title="Favorites" />}
                        {isPressed && <SelectAll isSelectedAll={isSelectedAll} selectAll={selectAll} deselectAll={deselectAll} selected={selected} />}
                        <SideMenu data={content} />
                        <NoteList
                            content={content.filter((el,i) => el.favorite===true)}
                            isPressed={isPressed}
                            setIsPressed={setIsPressed}
                            defaultSelection={defaultSelection}
                            setDefaultSelection={setDefaultSelection}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {isPressed && 
                            <ActionBar
                                selected={selected}
                                content={content}
                                setContent={setContent}
                                setIsPressed={setIsPressed}
                                defaultSelection={defaultSelection}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        }
                    </SideMenuProvider>
                </View>
            </>
        )
}