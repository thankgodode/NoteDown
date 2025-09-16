import { PermissionsAndroid } from "react-native"
import RNFS from "react-native-fs"

export const requestPermission = async () => {
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

export const writeToFile = async(fileName,buffer,format) => {
    const path = RNFS.ExternalDirectoryPath + `//${fileName}.${format}`
    
    try {
        await RNFS.writeFile(path, buffer, "base64")
        console.log("File written at: ", path)
    } catch (error) {
        console.error("File write error: ", error)
    }
}

export const moveFile = async (path,format) => {
    const destPath = RNFS.ExternalDirectoryPath +`//${fileName}.${format}`
    try {
        await RNFS.moveFile(path, destPath)
        console.log("File moved to: ", destPath)
    } catch (error) {
        console.error("File move error: ", error)
    }
}