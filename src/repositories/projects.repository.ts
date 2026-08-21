// ============================================
// REPOSITORY — Capa de acceso a datos
// ============================================

import {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
} from '../types';

// Store temporal en memoria
const store: Project[] = [
  {
    id: 1,
    name: 'Sistema de Inventario',
    client: 'Empresa ABC',
    technology: 'React + Node.js',
    status: 'development',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Plataforma de Ventas',
    client: 'Comercial XYZ',
    technology: 'Angular + Java',
    status: 'completed',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Aplicación de Citas',
    client: 'Servicios Médicos',
    technology: 'React + Express',
    status: 'planning',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Sistema de Facturación',
    client: 'Distribuciones SAS',
    technology: 'Vue + Node.js',
    status: 'development',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Portal Empresarial',
    client: 'Grupo Empresarial',
    technology: 'React + TypeScript',
    status: 'completed',
    active: false,
    createdAt: new Date().toISOString(),
  },
];

let nextId = 6;

export async function findAll(): Promise<Project[]> {
  return store.map((project) => ({ ...project }));
}

export async function findById(
  id: number
): Promise<Project | undefined> {
  const project = store.find((project) => project.id === id);

  return project ? { ...project } : undefined;
}

export async function create(
  dto: CreateProjectDto
): Promise<Project> {
  const project: Project = {
    id: nextId++,
    ...dto,
    createdAt: new Date().toISOString(),
  };

  store.push(project);

  return { ...project };
}

export async function update(
  id: number,
  dto: UpdateProjectDto
): Promise<Project | undefined> {
  const index = store.findIndex((project) => project.id === id);

  if (index === -1) {
    return undefined;
  }

  store[index] = {
    ...store[index]!,
    ...dto,
  };

  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((project) => project.id === id);

  if (index === -1) {
    return false;
  }

  store.splice(index, 1);

  return true;
}