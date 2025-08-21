import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            {/* <Stack.Screen name="index" options={{headerShown:false}}/> */}
            <Stack.Screen name="index" options={{headerShown:false}}/>
            <Stack.Screen name="favorites" options={{headerShown:false}}/>
            <Stack.Screen name="folders" options={{headerShown:false}}/>
            <Stack.Screen name="create" options={{headerShown:false}}/>
            <Stack.Screen name="edit/[id]" options={{headerShown:false}}/>
            <Stack.Screen name="edit/[manage]" options={{headerShown:false}}/>
        </Stack>
    )
}