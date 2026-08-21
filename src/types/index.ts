// src/types/index.ts
// Dominio: Empresa de Proyectos de Software.
// Item representa un proyecto de software gestionado por la empresa.

// ============================================
// INTERFACE PRINCIPAL DEL DOMINIO
// ============================================

export type ProjectStatus = 'planning' | 'development' | 'completed';

export interface Item {
  id: string;
  // Nombre del proyecto
  name: string;
  // Descripción general del proyecto
  description: string;

  // Cliente para el que se desarrolla el proyecto
  client: string;
  // Tecnología principal utilizada
  technology: string;
  // Estado actual del proyecto
  status: ProjectStatus;
  // Si el proyecto sigue activo
  active: boolean;
  // Fecha de creación (ISO string)
  createdAt: string;
}

// Etiquetas legibles para mostrar el status en pantalla
export const STATUS_LABEL: Record<ProjectStatus, string> = {
  planning: 'Planeación',
  development: 'En desarrollo',
  completed: 'Completado',
};
