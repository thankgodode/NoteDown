import { createContext, useEffect, useState} from "react";

export const InteractionContext = createContext({})

export default InteractionProvider = ({ children }) => {
    const [isPressed, setIsPressed] = useState(false)
    const [defaultSelection, setDefaultSelection] = useState(null)
    const [selected, setSelected] = useState([])
    const [isSelectedAll, setIsSelectedAll] = useState(false)
    const [selectedNote, setSelectedNote] = useState([])
    
    return (
        <InteractionContext.Provider
            value={{
                isPressed,
                setIsPressed,
                defaultSelection,
                setDefaultSelection,
                selected,
                isSelectedAll,
                setIsSelectedAll,
                setSelected,
                selectedNote,
                setSelectedNote
            }}
        >
            {children}
        </InteractionContext.Provider>
    )
}