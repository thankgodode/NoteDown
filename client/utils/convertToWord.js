import { PermissionsAndroid } from "react-native"

import RNFS from "react-native-fs"

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
            writeToFile(data.title,result.message)
        }
    } catch (error) {
        console.error("Sorry an error just occured ", error)
    }
}

const requestPermission = async() => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Storage Permission",
                message: "App needs access to your storate to write files.",
                buttonNeutral: "Ask me later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Permission granted!")
            return true
        } else {
            console.log("Permission not granted...")
            return false
        }
    } catch (error) {
        console.warn(error)
    }
}

const writeToFile = async(fileName,buffer) => {
    const path = RNFS.ExternalDirectoryPath + `//${fileName}.docx`
    
    try {
        await RNFS.writeFile(path, buffer, "base64")
        console.log("File written at: ", path)
    } catch (error) {
        console.error("File write error: ", error)
    }
}

export default convertToWord