import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getUserData, removeUserData, UserData } from "../../utils/stores/userStore";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, [])

  useEffect(() => {
    if (!loading && user === null) {
      router.push("/startpage");
    }
  }, [user, loading])

  const clearStorage = () => {
    removeUserData();
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello {user?.username}</Text>
        <Pressable onPress={clearStorage}>
          <Text style={styles.button}>Clear storage</Text>
        </Pressable>
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
