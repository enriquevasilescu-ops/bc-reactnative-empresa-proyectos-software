// src/screens/DetailScreen.tsx

import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useRoute, type RouteProp } from '@react-navigation/native';

import { ITEMS } from '../data/mockData';
import type { HomeStackParamList } from '../navigation/types';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

type DetailRouteProp = RouteProp
  HomeStackParamList,
  'HomeDetail'
>;

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();

  const { id, name } = route.params;

  const item = ITEMS.find((project) => project.id === id);

  const isItemSaved = useSavedStore(
    (state) => state.isItemSaved,
  );

  const addItem = useSavedStore(
    (state) => state.addItem,
  );

  const removeItem = useSavedStore(
    (state) => state.removeItem,
  );

  const isSaved = isItemSaved(id);

  const handleToggleSave = (): void => {
    if (isSaved) {
      removeItem(id);
    } else if (item) {
      addItem(item);
    }
  };

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Proyecto no encontrado
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroLetter}>
          {name.charAt(0)}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>
          {item.name}
        </Text>

        <Text style={styles.id}>
          Código: {item.id}
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>
            Líder de proyecto
          </Text>

          <Text style={styles.detailValue}>
            {item.lead}
          </Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>
            Duración
          </Text>

          <Text style={styles.detailValue}>
            {item.duration} semanas
          </Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>
            Modalidad
          </Text>

          <Text style={styles.detailValue}>
            {item.modality}
          </Text>
        </View>

        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>
            Equipo
          </Text>

          <Text style={styles.detailValue}>
            {item.teamSize} personas
          </Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          isSaved && styles.saveButtonActive,
          pressed && styles.saveButtonPressed,
        ]}
        onPress={handleToggleSave}
        testID="save-button"
      >
        <Text
          style={[
            styles.saveButtonText,
            isSaved && styles.saveButtonTextActive,
          ]}
        >
          {isSaved
            ? '★  Proyecto guardado'
            : '☆  Guardar proyecto'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    gap: SPACING.lg,
  },

  hero: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  heroLetter: {
    fontSize: 42,
    fontWeight: '700',
    color: COLORS.accent,
  },

  info: {
    gap: SPACING.sm,
  },

  title: {
    ...TYPOGRAPHY.h2,
  },

  id: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginTop: SPACING.sm,
  },

  details: {
    gap: SPACING.sm,
  },

  detailBox: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
  },

  detailLabel: {
    ...TYPOGRAPHY.caption,
    marginBottom: SPACING.xs,
  },

  detailValue: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },

  saveButton: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: 'auto',
  },

  saveButtonActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },

  saveButtonPressed: {
    opacity: 0.7,
  },

  saveButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  saveButtonTextActive: {
    color: COLORS.background,
  },
});