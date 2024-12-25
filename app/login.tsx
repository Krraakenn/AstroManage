import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

export default function Login() {
  const [name, setName] = useState<string>("");
  const [passcode, setPasscode] = useState<string[]>([]);
  const [userExists, setUserExists] = useState<boolean>(false);

  const numbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["<", "0", "AC"],
  ];

  const handleNumberPress = (number: string) => {
    if (number === "") {
      return;
    }

    if (number === "<") {
      setPasscode((prev) => prev.slice(0, -1));
      return;
    }

    if (number === "Res") {
      setPasscode([]);
      return;
    }

    if (passcode.length < 6) {
      setPasscode((prev) => [...prev, number]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!userExists && (
        <Link href={"/findUser"}>
          Not logged in
        </Link>
      )}
      {userExists && (
        <>
          <View style={styles.upperpart}>
            <Ionicons name="person" size={50} color="black" />
            <Text style={{ fontSize: 24, marginBottom: 20 }}>
              Hello {name} !
            </Text>
            <View style={styles.passcodeRow}>
              <Ionicons
                name={
                  passcode.length >= 1 ? "radio-button-on" : "radio-button-off"
                }
                size={25}
                color="black"
              />
              <Ionicons
                name={
                  passcode.length >= 2 ? "radio-button-on" : "radio-button-off"
                }
                size={25}
                color="black"
              />
              <Ionicons
                name={
                  passcode.length >= 3 ? "radio-button-on" : "radio-button-off"
                }
                size={25}
                color="black"
              />
              <Ionicons
                name={
                  passcode.length >= 4 ? "radio-button-on" : "radio-button-off"
                }
                size={25}
                color="black"
              />
              <Ionicons
                name={
                  passcode.length >= 5 ? "radio-button-on" : "radio-button-off"
                }
                size={25}
                color="black"
              />
              <Ionicons
                name={
                  passcode.length >= 6 ? "radio-button-on" : "radio-button-off"
                }
                size={25}
                color="black"
              />
            </View>
          </View>
          <View style={styles.numpad}>
            {numbers.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((number, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.numberInput, number === "" && styles.empty]}
                    disabled={number === ""}
                    onPress={() => handleNumberPress(number)}
                  >
                    {number !== "" && (
                      <Text style={styles.numberText}>{number}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const stylesUserDoesntExist = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  textInput: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  upperpart: {
    alignItems: "center",
    marginBottom: 40,
  },
  numpad: {
    width: "100%",
    alignItems: "center",
  },
  passcodeRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    gap: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    gap: 50,
  },
  numberInput: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    backgroundColor: "transparent",
  },
  numberText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
});
