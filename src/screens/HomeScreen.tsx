import React, {
  useState,
  useMemo,
  useCallback,
} from "react";

import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { Project } from "../types";
import { MOCK_ITEMS } from "../data/mockData";
import { ItemCard } from "../components/ItemCard";

import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
} from "../theme";

export function HomeScreen(): React.JSX.Element {
  const [search, setSearch] = useState<string>("");

  /*
   * useMemo:
   * Filtra los proyectos solamente cuando cambia
   * la búsqueda.
   */
  const filteredProjects = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (searchText === "") {
      return MOCK_ITEMS;
    }

    return MOCK_ITEMS.filter((project) => {
      return (
        project.name.toLowerCase().includes(searchText) ||
        project.client.toLowerCase().includes(searchText) ||
        project.technology.toLowerCase().includes(searchText) ||
        project.status.toLowerCase().includes(searchText) ||
        project.team.toLowerCase().includes(searchText)
      );
    });
  }, [search]);

  /*
   * useCallback:
   * Acción al seleccionar un proyecto.
   */
  const handleProjectPress = useCallback(
    (project: Project): void => {
      Alert.alert(
        "Proyecto seleccionado",
        `${project.name}\n\nCliente: ${project.client}\nTecnología: ${project.technology}\nEstado: ${project.status}\nEquipo: ${project.team}`
      );
    },
    []
  );

  /*
   * useCallback:
   * Renderiza cada elemento de la FlatList.
   */
  const renderItem = useCallback(
    ({ item }: { item: Project }): React.JSX.Element => {
      return (
        <ItemCard
          item={item}
          onPress={handleProjectPress}
        />
      );
    },
    [handleProjectPress]
  );

  /*
   * useCallback:
   * Estado que aparece cuando la búsqueda
   * no encuentra resultados.
   */
  const renderEmptyState = useCallback((): React.JSX.Element => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          No se encontraron proyectos
        </Text>

        <Text style={styles.emptyText}>
          No hay proyectos que coincidan con "{search}".
        </Text>

        <Text style={styles.emptyText}>
          Intenta buscar por nombre, cliente,
          tecnología, estado o equipo.
        </Text>
      </View>
    );
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >
          <View style={styles.content}>
            
            {/* ENCABEZADO */}
            <View style={styles.header}>
              <Text style={styles.title}>
                Empresa de Proyectos de Software
              </Text>

              <Text style={styles.subtitle}>
                Gestión de proyectos tecnológicos
              </Text>
            </View>

            {/* BUSCADOR */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar proyecto..."
                placeholderTextColor={COLORS.textMuted}
                value={search}
                onChangeText={setSearch}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* LISTA */}
            <FlatList
              data={filteredProjects}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              
              ItemSeparatorComponent={() => (
                <View style={styles.separator} />
              )}

              ListEmptyComponent={renderEmptyState}

              contentContainerStyle={
                filteredProjects.length === 0
                  ? styles.emptyList
                  : styles.list
              }

              showsVerticalScrollIndicator={false}

              keyboardShouldPersistTaps="handled"
            />

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  keyboardContainer: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  header: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  title: {
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.size.sm,
    marginTop: SPACING.xs,
  },

  searchContainer: {
    padding: SPACING.base,
  },

  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.base,
  },

  list: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.xl,
  },

  separator: {
    height: SPACING.md,
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },

  emptyContainer: {
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },

  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },

  emptyText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.size.base,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
});