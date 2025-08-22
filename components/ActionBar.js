import { Pressable, StyleSheet, Text, View } from "react-native";


export default function ActionBar() {
    return (
        <>
            <View style={styles.container}>
                <Pressable>
                    <Text>Move</Text>
                </Pressable>
                <Pressable>
                    <Text>Favorite</Text>
                </Pressable>
                <Pressable>
                    <Text>Delete All</Text>
                </Pressable>
                <Pressable>
                    <Text>Save as</Text>
                </Pressable>
            </View>
        </>
    )
}

const styles =
    StyleSheet.create({
      container: {
        width:200,
        heigh:200,
        backgroundColor:"orange",
        position:"fixed"
      }
  })
