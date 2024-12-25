import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useEffect } from "react";
import { TextInput, View, StyleSheet, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { url } from "../config";

export default function FindUser() {

  const findUser = async () => {
    const response = await fetch(`${url}/users`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={{fontWeight: "bold", fontSize: 20}} >Enter your username</Text>        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter username"
          />
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color="black"
          />
        </View>
        <Text>Not a user ?</Text>
        <Link href="/register" style={{color: "blue"}}>
          Click here
        </Link>
      </View>
      <Pressable onPress={findUser}>
        <Text>Find user</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 20,
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "80%",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginLeft: 10,
  },
});