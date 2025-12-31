import { useLocalSearchParams } from "expo-router";
import { createContext, useEffect, useState} from "react";

export const InteractionContext = createContext({})

export default InteractionProvider = ({ children }) => {
    const [isPressed, setIsPressed] = useState(false)
    const [defaultSelection, setDefaultSelection] = useState(null)
    const [selected, setSelected] = useState([])
    const [isSelectedAll, setIsSelectedAll] = useState(false)
    const [selectedNote, setSelectedNote] = useState([])
    const [toggleSaved, setToggleSaved] = useState(false)
    const [activeNoteId, setActiveNoteId] = useState(null)

    const selectAll = (data) => {
        const arr = []
        
        data.forEach((el) => {
            arr.push(el.id)
        })

        setSelected(arr)
        setIsSelectedAll(true)
    }
    
    const deselectAll = () => {
        setSelected([])
        setIsSelectedAll(false)
    }

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
                toggleSaved,
                activeNoteId,
                setActiveNoteId,
                setToggleSaved,
                setSelectedNote,
                selectAll,
                deselectAll
            }}
        >
            {children}
        </InteractionContext.Provider>
    )
}