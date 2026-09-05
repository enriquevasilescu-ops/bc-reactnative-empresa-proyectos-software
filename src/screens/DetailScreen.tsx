// src/screens/DetailScreen.tsx
// Pantalla de detalle: muestra todos los campos de un Project,
// obtenidos frescos del servidor con useProjectById (useQuery).

import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, STATUS_COLORS, TYPOGRAPHY } from '../theme';
import { useProjectById } from '../hooks/useItems';
import { PROJECT_STATUS_LABEL } from '../types';
import type { RootStackParamList } from '../navigation/types';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

function formatDate(isoDate?: string | null): string {
  if (!isoDate) return '—';
  return new Date(isoDate).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatBudget(budget: string): string {
  const value = Number(budget);
  if (Number.isNaN(value)) return budget;
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

// ============================================================
// SUB-COMPONENTE: FieldRow
// ============================================================

function FieldRow({ label, value }: { label: string; value: string }): React.JSX.Element {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

// ============================================================
// PANTALLA: DetailScreen
// ============================================================

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id, name } = route.params;

  const { data: project, isLoading, isError, refetch } = useProjectById(id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (isError || !project) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el detalle</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const statusColor = STATUS_COLORS[project.status] ?? COLORS.textSecondary;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header del proyecto */}
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Text style={styles.heroLetter}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>{project.name}</Text>
        <View style={[styles.statusBadge, { borderColor: statusColor }]}>
          <Text style={[styles.statusBadgeText, { color: statusColor }]}>
            {PROJECT_STATUS_LABEL[project.status]}
          </Text>
        </View>
      </View>

      {/* Campos del proyecto */}
      <View style={styles.fieldsCard}>
        <FieldRow label="Código" value={project.code} />
        <FieldRow label="Descripción" value={project.description || 'Sin descripción'} />
        <FieldRow label="Presupuesto" value={formatBudget(project.budget)} />
        <FieldRow label="Fecha de inicio" value={formatDate(project.startDate)} />
        <FieldRow label="Fecha de fin" value={formatDate(project.endDate)} />
      </View>

      {/* Cliente asociado */}
      <View style={styles.fieldsCard}>
        <Text style={styles.sectionTitle}>Cliente</Text>
        {project.client ? (
          <>
            <FieldRow label="Nombre" value={project.client.name} />
            <FieldRow label="Empresa" value={project.client.company || '—'} />
            <FieldRow label="Correo" value={project.client.email} />
            <FieldRow label="Teléfono" value={project.client.phone || '—'} />
          </>
        ) : (
          <Text style={styles.infoText}>Este proyecto no tiene cliente asignado.</Text>
        )}
      </View>
    </ScrollView>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: SPACING.xxl },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },
  hero: { alignItems: 'center', gap: SPACING.sm },
  heroIcon: {
    width: 88,
    height: 88,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLetter: { fontSize: 36, fontWeight: '700', color: COLORS.accent },
  title: { ...TYPOGRAPHY.h2, textAlign: 'center' },
  statusBadge: {
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  statusBadgeText: { fontSize: 12, fontWeight: '600' },
  sectionTitle: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  fieldsCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  fieldRow: { gap: 2 },
  fieldLabel: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.5 },
  fieldValue: { ...TYPOGRAPHY.body },
  infoText: { ...TYPOGRAPHY.caption, color: COLORS.textMuted },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.error },
  retryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  retryButtonText: { ...TYPOGRAPHY.body, color: COLORS.background, fontWeight: '600' },
});
