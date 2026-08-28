// src/screens/HomeScreen.tsx

import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { ITEMS } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { HomeStackParamList } from '../navigation/types';

type HomeScreenNavProp = NativeStackNavigationProp
  HomeStackParamList,
  'HomeList'
>;

interface ItemCardProps {
  item: Item;
  onPress: () => void;
}

function ItemCard({
  item,
  onPress,
}: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
      testID={`item-card-${item.id}`}
    >
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailText}>
          {item.name.charAt(0)}
        </Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            ⏱ {item.duration} semanas
          </Text>

          <Text style={styles.infoText}>
            {item.modality}
          </Text>
        </View>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavProp>();

  const items = ITEMS;

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <ItemCard
      item={item}
      onPress={() =>
        navigation.navigate('HomeDetail', {
          id: item.id,
          name: item.name,
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>
              Proyectos DEVCORE
            </Text>

            <Text style={styles.subtitle}>
              Proyectos de software activos y disponibles
              para asignación.
            </Text>

            <Text style={styles.sectionLabel}>
              {items.length} proyectos disponibles
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No hay proyectos disponibles.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  list: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },

  header: {
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },

  title: {
    ...TYPOGRAPHY.h1,
  },

  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  sectionLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: SPACING.sm,
  },

  separator: {
    height: SPACING.sm,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },

  cardPressed: {
    opacity: 0.7,
  },

  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  thumbnailText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.accent,
  },

  cardContent: {
    flex: 1,
    gap: SPACING.xs,
  },

  cardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },

  cardDescription: {
    ...TYPOGRAPHY.caption,
    lineHeight: 18,
  },

  infoRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },

  infoText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent,
  },

  chevron: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textMuted,
  },

  emptyText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginTop: SPACING.xl,
    color: COLORS.textSecondary,
  },
});