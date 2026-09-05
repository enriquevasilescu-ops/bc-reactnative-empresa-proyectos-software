// src/types/index.ts
// Interfaces del dominio: Empresa de Proyectos de Software.
// Reflejan el modelo Prisma expuesto por la API (prisma/schema.prisma).

// ============================================================
// ENUM DE ESTADO
// ============================================================
export type ProjectStatus =
  | 'PLANNING'
  | 'IN_PROGRESS'
  | 'ON_HOLD'
  | 'COMPLETED'
  | 'CANCELLED';

export const PROJECT_STATUS_OPTIONS: ProjectStatus[] = [
  'PLANNING',
  'IN_PROGRESS',
  'ON_HOLD',
  'COMPLETED',
  'CANCELLED',
];

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  PLANNING: 'Planeación',
  IN_PROGRESS: 'En progreso',
  ON_HOLD: 'En pausa',
  COMPLETED: 'Completado',
  CANCELLED: 'Cancelado',
};

// ============================================================
// RECURSO SECUNDARIO — Client
// ============================================================
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
}

// ============================================================
// RECURSO PRINCIPAL — Project
// ============================================================
// Este es el modelo que consume HomeScreen, DetailScreen y CreateScreen.
export interface Project {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  status: ProjectStatus;
  // Prisma serializa Decimal como string en JSON.
  budget: string;
  startDate: string;
  endDate?: string | null;
  clientId?: string | null;
  client?: Client | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// RESPUESTA PAGINADA
// ============================================================
// GET /api/v1/projects devuelve { data, total, page, limit }
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ============================================================
// PAYLOAD DE CREACIÓN
// ============================================================
// Lo que se envía en el POST — debe cumplir src/schemas/items.schema.ts
export interface CreateProjectPayload {
  name: string;
  code: string;
  description?: string;
  status?: ProjectStatus;
  budget: number;
  startDate: string; // ISO string, ej. '2026-04-01'
  endDate?: string;
  clientId?: string;
}

// Alias genérico usado por la plantilla del bootcamp (Item = Project).
export type Item = Project;
export type CreateItemPayload = CreateProjectPayload;
