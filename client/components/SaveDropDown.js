import {
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Modal,
    Dimensions,
    View,
    TouchableOpacity,
} from "react-native";
import { useContext, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {InteractionContext} from "@/context/InteractionContext";
import useConvertFormat from "@/services/useConvertFormat";
import SuccessModal from "./SuccessModal";

const deviceHeight = Dimensions.get("window").height

export const SaveAsOptions = () => {
    const [show, setShow] = useState(false)
    const { selected } = useContext(InteractionContext)
    
    const onShow = () => {
        setShow(true)   
    }

    const onClose = () => {
        setShow(false)
    }

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={onShow}>
                <View style={{alignItems:"center"}}>
                    <Entypo name="save" size={24} color={selected.length>1 || selected.length<1?"#ccc":"black"}/>
                    <Text>
                        Save as
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <OptionsMenu
                onTouchOutside={onClose}
                title="Save text as?"
                show={show}
            />
        </SafeAreaView>
    )
}

const OptionsMenu = ({show, onTouchOutside,title}) => {
    const { selectedNote } = useContext(InteractionContext)
    const { convertToWord, convertToPDF, isSaved } = useConvertFormat()

    const renderOutsideTouchable = (isShow) => {
        const view = <View style={{ flex: 1, width:"100%"}} />
        
        if (!isShow) return view
        
        return (
            <TouchableWithoutFeedback onPress={onTouchOutside}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    const saveAsWord = () => {
        convertToWord(selectedNote[0])
        onTouchOutside()
    }
    
    const saveAsPDF = () => {
        convertToPDF(selectedNote[0])
        onTouchOutside()
    }

    if (isSaved) {
        return <SuccessModal message="File successfully saved!" isSaved={isSaved}/>
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={onTouchOutside}
        >
            <View
                style={{
                    flex:1,                    
                    backgroundColor: "#00000077",
                    justifyContent: "flex-end",
                }}
            >
                {renderOutsideTouchable(show)}
                <View
                    style={{
                        backgroundColor: "#ffff",
                        width: "100%",
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        paddingHorizontal: 16,
                        paddingVertical:16,
                        minHeight:deviceHeight*0.15
                    }}
                >
                    <View>
                        <Text
                            style={{
                                color: "#0080ffff",
                                fontSize: 20,
                                fontWeight:"500"
                            }}
                        >
                            {title}
                        </Text>
                    </View>
                    <View style={{marginTop:10,gap:14}}>
                        <TouchableOpacity onPress={saveAsPDF}> 
                            <Text style={{fontSize:18}}>To PDF</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={saveAsWord}>
                            <Text style={{fontSize:18}}>To Word</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}