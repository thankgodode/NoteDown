import { useState } from "react"
import { requestPermission, writeToFile } from "../services/utils"


export default useConverToWord = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    async function convertToWord(data) {
        try {
            const response = await fetch("http://192.168.43.38:5000/api/toDocx",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({html:data.content})
                }
            )

            const result = await response.json()

            const permission = await requestPermission()

            if (permission === true) {
                setLoading(true)
                console.log("Writing...")
                await writeToFile(data.title, result.message)
                console.log("Written!")
                setMessage("File successfully saved!")
                setTimeout(() => {
                    setMessage("")
                }, 2000)
                
                setLoading(false)
            }
        } catch (error) {
            console.error("Sorry an error just occured ", error)
        }
    }

    return {convertToWord,loading,message}
}