import {
    Modal, StyleSheet, Text, TouchableOpacity,
    View
} from "react-native";

export default function SuccessModal({message}) {
    
    return (
        <Modal transparent={true} animationType="fade" backdropColor="red" visible={message && true}>
            <View style={styles.modalView}>
                <Text style={styles.message}>{message}</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "#003a01ff",
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
    message:{
        fontSize: 20,
        fontWeight: 300,
        fontWeight:"400",
        color: "#b7ebb8ff",
     },
})