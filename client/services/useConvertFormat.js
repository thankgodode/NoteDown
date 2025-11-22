import { requestPermission, writeToFile } from "./utils"
import { ToastAndroid } from "react-native"
import {useNetInfo} from "@react-native-community/netinfo"
import {generatePDF} from "react-native-html-to-pdf"

export default useConvertFormat = () => {
    const {type, isConnected} = useNetInfo()

    async function convertToWord(data) {
        const fileName = data.title.length > 200 ? data.title.substr(0, 200) : data.length < 1 ? "Untitled" : data.title

        if (!isConnected) {
            ToastAndroid.showWithGravityAndOffset(
                'Please connect to the internet to access this feature.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );

            return
        }

        try {
            const response = await fetch("https://notedownapi.onrender.com/api/toDocx",
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
                await writeToFile(fileName, result.message, "docx")
                ToastAndroid.showWithGravityAndOffset(
                    'Successfully saved as Word!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            }
        } catch (error) {
            ToastAndroid.showWithGravityAndOffset(
                'Sorry, an unexpected error occured...',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            )
        }
    }

    const convertToPDF = async (data) => {
        const fileName = data.title.length > 200 ? data.title.substr(0, 200) : data.length < 1 ? "Untitled" : data.title
        console.log("File name ", fileName)
        
        const options = {
            html: data.content,
            fileName: fileName,
            base64: true,
            height: 842,
            width: 595,
        }
        try {
            const result = await generatePDF(options)
            const permission = await requestPermission()

            if (permission === true) {
                await writeToFile(fileName, result.base64, "pdf")
                 ToastAndroid.showWithGravityAndOffset(
                    'Successfully saved as PDF!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            }
        } catch (error) {
            ToastAndroid.showWithGravityAndOffset(
                'Sorry, an unexpected error occured...',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
            console.error(error)
        }
    }

    return {convertToWord,convertToPDF}
}