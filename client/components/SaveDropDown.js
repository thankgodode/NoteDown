import {
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    Modal,
    Dimensions,
    View,
    TouchableOpacity,
    ToastAndroid
} from "react-native";
import { useContext, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {InteractionContext} from "@/context/InteractionContext";
import useConvertFormat from "@/services/useConvertFormat";
import { ThemeContext } from "@/context/ThemeContext";

const deviceHeight = Dimensions.get("window").height

export const SaveAsOptions = () => {
    const [show, setShow] = useState(false)
    const {theme} = useContext(ThemeContext)
    const { selected } = useContext(InteractionContext)
    
    const onShow = () => {
        setShow(true)   
    }

    const onClose = () => {
        setShow(false)
    }

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={onShow} disabled={selected.length > 1 ? true:selected.length<1 ? true:false}>
                <View style={{alignItems:"center"}}>
                    <Entypo name="save" size={24} color={selected.length>1 || selected.length<1?"grey":theme.saveIcon}/>
                    <Text style={{color:theme.color}}>
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

const OptionsMenu = ({ show, onTouchOutside, title }) => {
    const { selectedNote } = useContext(InteractionContext)
    const { convertToWord, convertToPDF, msg } = useConvertFormat()

    const renderOutsideTouchable = () => {
        const view = <View style={{ flex: 1, backgroundColor: "transparent"}}
        />
        
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

    return (
        <Modal
            animationType="slide"
            // transparent={true}
            backdropColor={"#00000077"}
            visible={show}
            // onRequestClose={onTouchOutside}
        >
            {renderOutsideTouchable()}
            <View
                style={{
                    backgroundColor: "#ffff",
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    paddingHorizontal: 16,
                    paddingVertical:16,
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
        </Modal>
    )
}