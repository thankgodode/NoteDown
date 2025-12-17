
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"

export default function useFetch(fetchFunction) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    const fetchData = async () => {
        try {
            const request = await fetchFunction()
            const response = JSON.parse(request)

            setTimeout(() => {
                setLoading(false)
            },500)
            
            setData(response)
        } catch (error) {
            console.log("Error ", error)
            setLoading(false)
        }
    }

    const writeData = async () => {
        try {
            const request = await fetchFunction()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [router.canGoBack()])
    
    return {data, fetchData, writeData,loading}
}