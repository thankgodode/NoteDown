import { useState } from "react"
import { requestPermission, writeToFile } from "../services/utils"


export default useConverToWord = () => {
    const [isSaved, setIsSaved] = useState(false)

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
                await writeToFile(data.title, result.message)
                setIsSaved(true)

                setTimeout(() => {
                    setIsSaved(false)
                },1000)
            }
        } catch (error) {
            console.error("Sorry an error just occured ", error)
        }
    }

    return {convertToWord,isSaved}
}