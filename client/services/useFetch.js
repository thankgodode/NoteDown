
import { useEffect, useState } from "react"

export default function useFetch(fetchFunction) {
    const [data, setData] = useState(null)


    const fetchData = async () => {
        try {
            const request = await fetchFunction()
            const response = JSON.parse(request)

            setData(response)
        } catch (error) {
            console.log("Error ", error)
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
    
    return {data, fetchData, writeData}
}