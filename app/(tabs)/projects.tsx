import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getProjects, ProjectData } from "../../utils/stores/projectStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectData[] | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const storedProjects = await getProjects();
      setProjects(storedProjects);
    };
    fetchProjects();
  }, []);

  if (projects === null || projects.length === 0) {
    return (
      <SafeAreaView>
        <Text>No projects</Text>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Projects</Text>
        <Text style={styles.subtitle}>This is your projects page.</Text>
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
});