import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="startpage" options={{headerShown: false}}/>
      <Stack.Screen name="register" options={{headerShown: false}}/>
      <Stack.Screen name="login" options={{headerShown: false}}/>
      <Stack.Screen name="findUser" options={{headerShown: false}}/>
    </Stack>
  );
}
