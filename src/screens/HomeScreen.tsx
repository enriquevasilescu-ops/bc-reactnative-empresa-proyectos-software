import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";

import { Project } from "../types";
import { MOCK_ITEMS } from "../data/mockData";
import { ItemCard } from "../components/ItemCard";

export function HomeScreen(): React.JSX.Element {
  const handleProjectPress = (project: Project): void => {
    Alert.alert(
      "Proyecto seleccionado",
      `${project.name}\nCliente: ${project.client}\nTecnología: ${project.technology}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0d1117"
      />

      <View style={styles.header}>
        <Text style={styles.title}>
          Empresa de Proyectos de Software
        </Text>

        <Text style={styles.subtitle}>
          Gestión de proyectos tecnológicos
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {MOCK_ITEMS.map((project) => (
          <ItemCard
            key={project.id}
            item={project}
            onPress={handleProjectPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1117",
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },

  title: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#8b949e",
    fontSize: 15,
    marginTop: 6,
  },

  list: {
    padding: 16,
  },
});