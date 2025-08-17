import { createContext, useState } from "react"

export const SideMenuContext = createContext({})

export const SideMenuProvider = ({ children }) => {
    const [visible, setVisible] = useState(false)

    return (
        <SideMenuContext.Provider value={{visible, setVisible}}>
            {children}
        </SideMenuContext.Provider>
    )
}