import { PermissionsAndroid } from "react-native"
import * as FileSystem from "expo-file-system"
// import RNFS from "react-native-fs"

export const requestWriteFile = async () => {
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

// export const requestImagePermission = async () => {
//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.CAMERA ||
//             PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION ||
//             PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
//         )

//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log("Image file permission granted")
//             return true
//         } else {
//             console.log("Image file permission not granted...")

//             return false
//         }
//     } catch (error) {
//         console.warn(error)
//     }
// }

export const writeToFile = async (path,fileName, buffer, format) => {
    const mimeType = format === "pdf"
        ? "application/pdf" :
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    
    const fileURI = await FileSystem.StorageAccessFramework.
        createFileAsync(path, fileName,mimeType)

    await FileSystem.writeAsStringAsync(fileURI, buffer, {
        encoding:FileSystem.EncodingType.Base64
    })

    console.log("File successfully created")
    // const path = RNFS.ExternalDirectoryPath + `//${fileName}.${format}`
    
    // try {
    //     await RNFS.writeFile(path, buffer, "base64")
    //     console.log("File written at: ", path)
    // } catch (error) {
    //     console.error("File write error: ", error)
    // }
}

// export const moveFile = async (path,format) => {
//     const destPath = RNFS.ExternalDirectoryPath +`//${fileName}.${format}`
//     try {
//         await RNFS.moveFile(path, destPath)
//         console.log("File moved to: ", destPath)
//     } catch (error) {
//         console.error("File move error: ", error)
//     }
// }