import {
    Modal, StyleSheet, Text,
    View
} from "react-native";

export default function SuccessModal({message,isSaved}) {
    return (
        <Modal transparent={true} animationType="fade" backdropColor="red" visible={isSaved}>
            <View style={styles.modalView}>
                <Text style={styles.message}>{ }{message}</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "#c7f1c8ff",
        marginHorizontal: "auto",
        marginVertical: "auto",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        boxShadow: "2px 2px 15px rgba(0,0,0,0.4)",
        width: 200,
        top:200,
        borderRadius:10
    },
    message:{
        fontSize: 15,
        fontWeight: 300,
        fontWeight:"400",
        color: "black"
     },
})