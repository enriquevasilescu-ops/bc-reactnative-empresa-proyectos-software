import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

import { Project } from "../types";

interface ItemCardProps {
  item: Project;
  onPress: (item: Project) => void;
}

export function ItemCard({
  item,
  onPress,
}: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Image
        source={{ uri: item.imageUri }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.client}>
          Cliente: {item.client}
        </Text>

        <Text style={styles.technology}>
          Tecnología: {item.technology}
        </Text>

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Ver proyecto
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161b22",
    borderRadius: 12,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#30363d",
  },

  cardPressed: {
    opacity: 0.7,
  },

  image: {
    width: "100%",
    height: 180,
  },

  content: {
    padding: 16,
  },

  name: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  client: {
    color: "#c9d1d9",
    fontSize: 15,
    marginBottom: 5,
  },

  technology: {
    color: "#58a6ff",
    fontSize: 14,
    marginBottom: 14,
  },

  button: {
    backgroundColor: "#238636",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
});