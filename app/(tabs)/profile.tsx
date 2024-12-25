import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getUserData, UserData } from "../../utils/stores/userStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.ppandusername}>
          <View style={styles.ppcontainer}>
            {!user?.profilePicture ? (
              <Ionicons name="person" size={50} color="#FECC2E" />
            ) : (
              <Image
                source={{ uri: user?.profilePicture }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </View>
          <Text>@{user?.username}</Text>
        </View>
        <View style={styles.settingsbrowser}>
          <View style={styles.setting}>
            <Text style={styles.settingtitle}>Account</Text>
            <View style={styles.settingbuttons}>
              <Pressable style={styles.settingbutton}>
                <Text>Your profile</Text>
              </Pressable>
              <Pressable>
                <Text>Modify password</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text>Notifs</Text>
            <Pressable>
              <Text>Push notifications</Text>
            </Pressable>
            <Pressable>
              <Text>Mail notitifications</Text>
            </Pressable>
          </View>
          <View>
            <Text>Divers</Text>
            <Pressable>
              <Text>Language</Text>
            </Pressable>
            <Pressable>
              <Text>Report a bug</Text>
            </Pressable>
            <Pressable>
              <Text>Contact us</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  main: {
    flex: 1,
    width: "100%",
    // borderWidth: 1,
    // borderColor: "black",
  },
  settingsbrowser: {
  },
  setting: {
    gap: 10,
  },
  settingtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  settingbuttons: {
    gap: 10
  },
  settingbutton: {
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  ppandusername: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  ppcontainer: {
    width: 100,
    height: 100,
    // Use half the width or height for a perfect circle
    borderRadius: 50,

    // Center the icon or image
    justifyContent: "center",
    alignItems: "center",

    // Border
    borderWidth: 2,
    borderColor: "#FECC2E",

    // **Important**: solid background color so shadow is visible
    backgroundColor: "#ffffff",

    // iOS Shadow Props
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
