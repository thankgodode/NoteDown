import { createContext, useState } from "react";

export const DeleteModalContext = createContext({})

export const DeleteModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <DeleteModalContext.Provider
            value={{showModal,setShowModal}}
        >
            {children}
        </DeleteModalContext.Provider>
    )
}