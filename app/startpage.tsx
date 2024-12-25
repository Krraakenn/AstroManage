import { useRouter } from "expo-router";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartPage() {
  const router = useRouter();

  return (
    <ImageBackground source={require('../assets/lighthouse2.jpg')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <Pressable style={styles.button} onPress={() => router.replace("/register")}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => router.replace("/login")}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end", // Pushes the buttons to the bottom
    paddingBottom: 40, // Adds padding at the bottom to avoid the buttons being too close to the screen edge
  },
  main: {
    width: "100%", // Ensures the view takes up the full width of the screen
    alignItems: "center",
    paddingHorizontal: 24, // Add horizontal padding
  },
  button: {
    backgroundColor: "#FFB703",
    padding: 15,
    marginVertical: 10,
    borderRadius: 30,
    width: "90%",
    height: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
