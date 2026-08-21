// src/screens/DetailScreen.tsx
// Pantalla de detalle — recibe los datos del ítem seleccionado via params.
// Los params llegan del Stack Navigator cuando se llama navigate('HomeDetail', {...}).

import type { NativeStackRouteProp } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { STATUS_LABEL } from '../types';
import type { HomeStackParamList } from '../navigation/types';

// Tipo del route hook para leer los params tipados de esta pantalla
type DetailScreenRouteProp = NativeStackRouteProp<HomeStackParamList, 'HomeDetail'>;

export function DetailScreen(): React.JSX.Element {
  // useRoute devuelve los params pasados desde HomeScreen
  const route = useRoute<DetailScreenRouteProp>();
  const { id, name, description, client, technology, status, active, createdAt } =
    route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Título del proyecto */}
      <Text style={styles.name}>{name}</Text>

      {/* Badge con el ID */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>ID: {id}</Text>
      </View>

      {/* Descripción */}
      <Text style={styles.description}>{description}</Text>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Cliente</Text>
        <Text style={styles.fieldValue}>{client}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Tecnología</Text>
        <Text style={styles.fieldValue}>{technology}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Estado</Text>
        <Text style={styles.fieldValue}>{STATUS_LABEL[status]}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Activo</Text>
        <Text style={styles.fieldValue}>{active ? 'Sí' : 'No'}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Fecha de creación</Text>
        <Text style={styles.fieldValue}>{createdAt}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.base,
    gap: SPACING.md,
  },
  name: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentDim,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginBottom: SPACING.md,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.accent,
  },
  description: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  field: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
  },
});
