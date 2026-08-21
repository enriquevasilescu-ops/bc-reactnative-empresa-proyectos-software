// ============================================
// TYPES — Dominio: Empresa de proyectos de software
// ============================================

export interface Project {
  id: number;
  name: string;
  client: string;
  technology: string;
  status: 'planning' | 'development' | 'completed';
  active: boolean;
  createdAt: string;
}

// DTO para crear
export type CreateProjectDto = Omit<Project, 'id' | 'createdAt'>;

// DTO para actualizar
export type UpdateProjectDto = Partial<CreateProjectDto>;

// Respuesta individual
export interface SingleResponse<T> {
  data: T;
}

// Respuesta paginada
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Respuesta de error
export interface ErrorResponse {
  error: string;
  message: string;
}

// Parámetros de paginación
export interface PaginationParams {
  page: number;
  limit: number;
}