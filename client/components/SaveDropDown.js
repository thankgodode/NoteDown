import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Modal,
    Dimensions,
    View,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";

const deviceHeight = Dimensions.get("window").height

export const SaveAsOptions = ({}) => {
    const [show, setShow] = useState(false)

    const onShow = () => {
        setShow(true)   
    }

    const onClose = () => {
        setShow(false)
    }


    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={onShow}>
                <Text>
                    Show Popup
                </Text>
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

    const renderOutsideTouchable = (isShow) => {
        const view = <View style={{ flex: 1, width:"100%"}} />
        
        if (!isShow) return view
        
        return (
            <TouchableWithoutFeedback onPress={onTouchOutside}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    return (
        <Modal
            animationType="none"
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
                        <TouchableOpacity onPress={onTouchOutside}> 
                            <Text style={{fontSize:18}}>To PDF</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onTouchOutside}>
                            <Text style={{fontSize:18}}>To Word</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}