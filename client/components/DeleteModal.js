import {InteractionContext} from "@/context/InteractionContext";
import { useNotes } from "@/context/NotesContext";
import { useContext } from "react";
import {
    Modal, StyleSheet, Text, TouchableOpacity,
    View
} from "react-native";

export default function DeleteModal({showModal, setShowModal,id,route}) {
    const { deleteNote } = useNotes()
    const {isPressed, setIsPressed, setSelected,setIsSelectedAll}  = useContext(InteractionContext)

    return (
        <Modal transparent={true} animationType="slide" backdropColor="red" visible={showModal}>
            <View style={styles.modalView}>
                <Text style={styles.deleteMsg}>Move note to the Trash?</Text>
                <View style={styles.deleteOptionWrapper}>
                    <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                        <Text style={[styles.deleteOptions]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        deleteNote(id,route)
                        setShowModal(!showModal)
                        if (route === "index") {
                            setIsPressed(!isPressed)
                            setSelected([])
                            setIsSelectedAll(false)
                        }
                    }}>
                        <Text style={[styles.deleteOptions]}>Move to Trash</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "#e7f7fcff",
        marginHorizontal: "auto",
        marginVertical: "auto",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        boxShadow: "2px 2px 15px rgba(0,0,0,0.4)",
        width: 300,
        borderRadius:10
    },
    deleteMsg:{
        fontSize: 20,
        fontWeight: 300,
        color: "black",
     },
    deleteOptionWrapper:{
        flexDirection: "row",
        gap: 40,
        justifyContent:"center",
        marginTop: 18,
        marginTop: 30,
        fontWeight:800
    },
    deleteOptions: {
        fontSize: 18,
        fontWeight:500
    }
})