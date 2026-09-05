// src/services/items.service.ts — Lógica de negocio para "Project"

import * as repo from '../repositories/items.repository';
import { AppError } from '../errors/AppError';
import type { CreateItemDto, UpdateItemDto } from '../schemas/items.schema';

export async function listItems(page: number, limit: number) {
  return repo.findAll(page, limit);
}

export async function getItem(id: string) {
  const project = await repo.findById(id);
  if (!project) {
    throw new AppError(404, 'Proyecto no encontrado');
  }
  return project;
}

export async function createItem(data: CreateItemDto) {
  return repo.create(data);
}

export async function updateItem(id: string, data: UpdateItemDto) {
  return repo.update(id, data);
}

export async function deleteItem(id: string): Promise<void> {
  await repo.remove(id);
}
