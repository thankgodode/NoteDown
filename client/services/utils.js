import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"


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
}

