import { useState } from "react"
import { requestPermission, writeToFile } from "./utils"
import * as Print from "expo-print"
import { shareAsync } from "expo-sharing"
import {generatePDF} from "react-native-html-to-pdf"

export default useConvertFormat = () => {
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
                await writeToFile(data.title, result.message,"docx")
                setIsSaved(true)

                setTimeout(() => {
                    setIsSaved(false)
                },1000)
            }
        } catch (error) {
            console.error("Sorry an error just occured ", error)
        }
    }

    const convertToPDF = async (data) => {
        const options = {
            html: data.content,
            fileName: data.title,
            base64: true,
            height: 842,
            width: 595,
        }
        try {
            const result = await generatePDF(options)
         
            const permission = await requestPermission()

            if (permission === true) {
                await writeToFile(data.title, result.base64,"pdf")
                setIsSaved(true)

                setTimeout(() => {
                    setIsSaved(false)
                },1000)
            }

        } catch (error) {
            console.error(error)
        }
    }

    return {convertToWord,convertToPDF, isSaved}
}