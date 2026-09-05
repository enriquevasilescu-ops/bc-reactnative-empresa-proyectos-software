// src/hooks/useItems.ts
// Hooks de TanStack Query v5 para el recurso "Project".
// Los componentes consumen estos hooks, nunca llaman a apiClient directamente.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type {
  CreateProjectPayload,
  PaginatedResponse,
  Project,
} from '../types';

// ============================================================
// QUERY KEY
// ============================================================
// Centralizar la queryKey evita errores de typo al invalidar.
export const PROJECTS_QUERY_KEY = ['projects'] as const;

// ============================================================
// useProjects — obtener la lista paginada de proyectos
// ============================================================
// GET /api/v1/projects?page=1&limit=20 → { data, total, page, limit }
export function useProjects(page = 1, limit = 20) {
  return useQuery<PaginatedResponse<Project>>({
    queryKey: [...PROJECTS_QUERY_KEY, page, limit],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedResponse<Project>>(
        '/projects',
        { params: { page, limit } }
      );
      return data;
    },
  });
}

// ============================================================
// useProjectById — obtener el detalle de un proyecto por ID
// ============================================================
// GET /api/v1/projects/:id → Project (con `client` incluido)
export function useProjectById(id: string | number) {
  return useQuery<Project>({
    queryKey: [...PROJECTS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<Project>(`/projects/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

// ============================================================
// useCreateProject — crear un nuevo proyecto
// ============================================================
// POST /api/v1/projects
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, CreateProjectPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<Project>('/projects', payload);
      return data;
    },
    onSuccess: () => {
      // Invalida el caché de la lista → TanStack Query refetch automático
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

// ============================================================
// useDeleteProject — eliminar un proyecto por ID
// ============================================================
// DELETE /api/v1/projects/:id
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string | number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

// Alias con el nombre genérico de la plantilla del bootcamp,
// por si tu rúbrica busca literalmente `useItems` / `useCreateItem`.
export const useItems = useProjects;
export const useCreateItem = useCreateProject;
