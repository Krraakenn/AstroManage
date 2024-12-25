import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { getUserData, UserData } from "../../utils/stores/userStore";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();
      setUser(user);
    };

    fetchUser();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello {user?.username}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'blue',
  },
});
