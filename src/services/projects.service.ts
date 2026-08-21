// ============================================
// SERVICE — Lógica de negocio
// ============================================

import {
  CreateProjectDto,
  UpdateProjectDto,
  Project,
  PaginatedResponse,
  PaginationParams,
} from '../types';

import * as repo from '../repositories/projects.repository';

export async function findAll(
  params: PaginationParams
): Promise<PaginatedResponse<Project>> {
  const { page, limit } = params;

  const all = await repo.findAll();

  const start = (page - 1) * limit;

  const data = all.slice(start, start + limit);

  return {
    data,
    total: all.length,
    page,
    limit,
  };
}

export async function findById(
  id: number
): Promise<Project | undefined> {
  return repo.findById(id);
}

export async function create(
  dto: CreateProjectDto
): Promise<Project> {
  if (!dto.name || !dto.client || !dto.technology) {
    throw new Error(
      'Name, client and technology are required'
    );
  }

  return repo.create(dto);
}

export async function update(
  id: number,
  dto: UpdateProjectDto
): Promise<Project | undefined> {
  const exists = await repo.findById(id);

  if (!exists) {
    return undefined;
  }

  return repo.update(id, dto);
}

export async function remove(id: number): Promise<boolean> {
  const exists = await repo.findById(id);

  if (!exists) {
    return false;
  }

  return repo.remove(id);
}