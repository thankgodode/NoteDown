import * as FileSystem from "expo-file-system";

export const readFile = async () => {
    const fileUri = await FileSystem.documentDirectory + 'data.json';
    const checkFile = await FileSystem.getInfoAsync(fileUri)

    if (!checkFile.exists) {
        console.log("File does not exists")
        return
    }
    
    const contents = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
    });
    
    return contents
    
}

export const writeFile = async (fileContents) => {
    const filePath = await FileSystem.documentDirectory + "data.json"
    
    await FileSystem.writeAsStringAsync(filePath, fileContents, {
        encoding: FileSystem.EncodingType.UTF8,
    });
}

export const deleteFile = async() => {
    const fileUri = await FileSystem.documentDirectory + 'data.json';

    const contents = await FileSystem.deleteAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
    });
}
