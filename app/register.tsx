import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const numbers = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", ""],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.numpad}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((number, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.numberInput, number === "" && styles.empty]}
                disabled={number === ""}
              >
                {number !== "" && <Text style={styles.numberText}>{number}</Text>}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Align numpad to bottom of the screen
    alignItems: "center",
  },
  numpad: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20, // Adds some space from the bottom
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10, // Spacing between rows
  },
  numberInput: {
    height: 60,
    width: 60,
    backgroundColor: "blue",
    borderRadius: 30,
    marginHorizontal: 10, // Spacing between columns
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    backgroundColor: "transparent", // Makes empty spaces invisible
  },
  numberText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});