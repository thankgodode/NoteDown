
import { useEffect, useState } from "react"

export default function useFetch(fetchFunction) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)


    const fetchData = async () => {
        try {
            setLoading(true)
            const request = await fetchFunction()
            const response = JSON.parse(request)
            setLoading(false)
            
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
    }, [])
    
    return {data, fetchData, writeData,loading}
}