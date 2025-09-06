import axios from "axios"

import RNFS from "react-native-fs"

async function convertToWord(html) {
    try {
        const response = await fetch("http://192.168.43.38:5000/api/toDocx",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({content:html})
            }
        )

        const result = await response.json()

        console.log("Result: ", result)
    } catch (error) {
        console.error("Sorry an error just occured ", error)
    }
}

export default convertToWord