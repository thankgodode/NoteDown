import { createContext, useEffect, useState } from "react";

export const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [data, setData] = useState([])  
   
    useEffect(() => {
        const file = async () => {
            const rawData = await readFile()
            setData(JSON.parse(rawData))

            console.log("RAW ", rawData)
        }    

        file()
    },[data])

    return (
        <DataContext.Provider
            value={{data, setData}}
        >
            {children}
        </DataContext.Provider>
    )
}