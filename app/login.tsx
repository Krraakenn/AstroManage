import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { AstroYellow, url } from "../config";

export default function Login() {
  const [name, setName] = useState<string>("");
  const [passcode, setPasscode] = useState<string[]>([]);
  const [userExists, setUserExists] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const numbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["<", "0", "AC"],
  ];

  const findUser = async () => {
    const response = await fetch(`${url}/users/check-username/${name}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  };

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

  if (step === 1) {
    return (
      <SafeAreaView style={step1styles.container}>
        <View style={step1styles.main}>
          <Ionicons name="arrow-back" size={25} color="black" />
          <View style={step1styles.contentContainer}>
            <View>
              <Text style={step1styles.title}>Happy to see you again !</Text>
              <Text style={step1styles.subtitle}>Enter your username.</Text>
            </View>
            <View>
              <TextInput
                placeholder="Enter your username"
                style={step1styles.usernameInput}
                onChangeText={(text) => setName(text)}
              />
              <Pressable style={step1styles.continueButton}>
                <Text onPress={findUser} style={step1styles.continueButtonText}>
                  Continue
                </Text>
              </Pressable>
            </View>
            <View style={step1styles.orContainer}>
              <View style={step1styles.line} />
              <Text style={step1styles.orText}>Or</Text>
              <View style={step1styles.line} />
            </View>
            <View>
              <Pressable style={step1styles.continueButton}>
                <Ionicons
                  style={{ marginRight: 10 }}
                  name="id-card-outline"
                  size={25}
                  color="white"
                />
                <Text style={step1styles.continueButtonText}>Sign up</Text>
              </Pressable>
              <Pressable style={step1styles.AppleButton}>
                <Ionicons
                  style={{ marginRight: 10 }}
                  name="logo-apple"
                  size={25}
                  color="white"
                />
                <Text style={step1styles.AppleText}>Continue with Apple.</Text>
              </Pressable>
              <Pressable style={step1styles.GoogleButton}>
                <Ionicons
                  style={{ marginRight: 10 }}
                  name="logo-google"
                  size={25}
                  color="black"
                />
                <Text style={step1styles.GoogleText}>
                  Continue with Google.
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (step === 2) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upperpart}>
          <Ionicons name="person" size={50} color="black" />
          <Text style={{ fontSize: 24, marginBottom: 20 }}>Hello {name} !</Text>
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
      </SafeAreaView>
    );
  }
}

const step1styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    padding: 24,
    paddingTop: 10,
    gap: 30,
  },
  contentContainer: {
    gap: 10,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#38434D",
    opacity: 0.7,
  },
  usernameInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    width: "100%",
    borderColor: AstroYellow,
  },
  continueButton: {
    backgroundColor: AstroYellow,
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
  orText: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.7,
    color: "#38434D",
  },
  line: {
    height: 1,
    backgroundColor: "#38434D",
    opacity: 0.7,
    flex: 1,
  },
  AppleButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  GoogleButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  AppleText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  GoogleText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
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
