import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { url } from "../config";
import { storeUserData } from "../utils/stores/userStore";
import { useRouter } from "expo-router";
import { addProject, getProjects, ProjectData, storeProjects } from "../utils/stores/projectStore";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [passcode, setPasscode] = useState<string[]>([]);
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const numbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["<", "0", "AC"],
  ];

  const handleCheckAvailability = async () => {
    console.log(`Checking if "${name}" is available`);
    if (name === "") {
      console.log("Name is empty");
      return;
    }
    const response = await fetch(`${url}/users/check-username/${name}`, {
      method: "GET",
    });
    const data = await response.json();
    if (data === true) {
      console.log(`"${name}" is ${data}`);
      setIsNameValid(true);
    } else {
      console.log(`"${name}" is ${data}`);
      setIsNameValid(false);
    }
  };

  const handleRegister = async (passcodeyeah: string[]) => {
    const passcodezer: string = passcodeyeah.join("");
    const response = await fetch(`${url}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: name, passcode: passcodezer }),
    });
    const status = await response.status;
    const data = await response.json();
    if (status === 201) {
      console.log("User created successfully", data);
      await storeUserData({ id: data.id, username: data.username });
      router.replace("/");
    } else {
      console.log("User creation failed", data);
    }
  };

  const handleNumberPress = (number: string) => {
    if (number === "") {
      return;
    }

    if (number === "<") {
      setPasscode((prev) => prev.slice(0, -1));
      return;
    }

    if (number === "AC") {
      setPasscode([]);
      return;
    }

    if (passcode.length < 6) {
      const newPasscode: string[] = [...passcode, number];
      setPasscode(newPasscode);
      if (newPasscode.length === 6) {
        handleRegister(newPasscode);
      }
    }
  };

  if (step === 1) {
    return (
      <SafeAreaView style={stylesStep1.container}>
        <Text>Enter your name</Text>
        <TextInput
          placeholder="Enter your name"
          onChangeText={(text) => {
            setName(text);
            setIsNameValid(false);
          }}
          style={stylesStep1.textInput}
        />
        <Pressable
          style={stylesStep1.button}
          onPress={!isNameValid ? handleCheckAvailability : () => setStep(2)}
        >
          <Text>{isNameValid ? "Continue" : "Check availability"}</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (step === 2) {
    return (
      <SafeAreaView style={styles.container}>
        <Ionicons
          name="arrow-back-outline"
          size={30}
          color="black"
          onPress={() => {
            setStep(1);
            setIsNameValid(false);
          }}
        />
        <View style={styles.upperpart}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>
            Now chose a passcode
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
      </SafeAreaView>
    );
  }
}

const stylesStep1 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 20,
  },
  button: {
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  textInput: {
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
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
