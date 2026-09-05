// src/screens/CreateScreen.tsx
// Pantalla modal para crear un nuevo Project.
// Usa useCreateProject (useMutation) — al tener éxito, invalida la
// caché de la lista (dentro del hook) y regresa a HomeScreen.

import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, STATUS_COLORS, TYPOGRAPHY } from '../theme';
import { useCreateProject } from '../hooks/useItems';
import { PROJECT_STATUS_LABEL, PROJECT_STATUS_OPTIONS, type ProjectStatus } from '../types';
import type { RootStackParamList } from '../navigation/types';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

// Fecha de hoy en formato YYYY-MM-DD, para precargar el campo de inicio.
function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

// ============================================================
// PANTALLA: CreateScreen
// ============================================================

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();

  // Campos del formulario — mapean a CreateProjectPayload
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState(todayISO());
  const [status, setStatus] = useState<ProjectStatus>('PLANNING');

  const { mutate: createProject, isPending } = useCreateProject();

  const budgetValue = Number(budget.replace(',', '.'));
  const canSubmit =
    name.trim().length > 0 &&
    code.trim().length >= 3 &&
    budgetValue > 0 &&
    startDate.trim().length > 0 &&
    !isPending;

  function handleSubmit(): void {
    if (!canSubmit) return;

    createProject(
      {
        name: name.trim(),
        code: code.trim().toUpperCase(),
        description: description.trim() || undefined,
        status,
        budget: budgetValue,
        startDate,
      },
      {
        onSuccess: () => navigation.goBack(),
        onError: (error) => {
          Alert.alert('No se pudo crear el proyecto', error.message);
        },
      }
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionLabel}>Datos del nuevo proyecto</Text>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Nombre <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ej. Rediseño E-commerce"
            placeholderTextColor={COLORS.textMuted}
            returnKeyType="next"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Código <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={(text) => setCode(text.toUpperCase())}
            placeholder="Ej. PRJ-007"
            placeholderTextColor={COLORS.textMuted}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Presupuesto (USD) <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={budget}
            onChangeText={setBudget}
            placeholder="Ej. 15000"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Fecha de inicio <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={startDate}
            onChangeText={setStartDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={COLORS.textMuted}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Estado</Text>
          <View style={styles.statusRow}>
            {PROJECT_STATUS_OPTIONS.map((option) => {
              const selected = option === status;
              const color = STATUS_COLORS[option];
              return (
                <Pressable
                  key={option}
                  onPress={() => setStatus(option)}
                  style={[
                    styles.statusChip,
                    { borderColor: color },
                    selected && { backgroundColor: color },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusChipText,
                      { color: selected ? COLORS.background : color },
                    ]}
                  >
                    {PROJECT_STATUS_LABEL[option]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={description}
            onChangeText={setDescription}
            placeholder="Descripción opcional…"
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={COLORS.background} />
          ) : (
            <Text style={styles.buttonText}>Crear proyecto</Text>
          )}
        </Pressable>

        <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  sectionLabel: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.8 },
  field: { gap: SPACING.xs },
  fieldLabel: { ...TYPOGRAPHY.body, fontWeight: '600' },
  required: { color: COLORS.error },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  multiline: { minHeight: 96, paddingTop: SPACING.sm },
  statusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  statusChip: {
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  statusChipText: { fontSize: 12, fontWeight: '600' },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.background },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});
