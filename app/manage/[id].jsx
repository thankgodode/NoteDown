import SelectList from "@/components/SelectList"
import { readFile } from "@/services/api"
import useFetch from "@/services/useFetch"
import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react"


export default function Manage() {
    const [items, setItems] = usState("")
    const { data } = useFetch(() => readFile())
    
    const { id } = useLocalSearchParams()
    
    useEffect(() => {
        if (data) {
            setItems(data)
        }
    },[])

    return items === "" ? null : (
        <>
            <SelectList
                item={items}
                defaultSelection={id}
            />   
        </>
    )
}