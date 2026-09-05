// src/repositories/items.repository.ts — Acceso a datos con Prisma para "Project"

import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';
import type { CreateItemDto, UpdateItemDto } from '../schemas/items.schema';

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export async function findAll(page: number, limit: number): Promise<PaginatedResult<unknown>> {
  const [data, total] = await Promise.all([
    prisma.project.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: { client: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.project.count(),
  ]);

  return { data, total, page, limit };
}

export async function findById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: { client: true },
  });
}

export async function create(data: CreateItemDto) {
  try {
    return await prisma.project.create({ data: data as Prisma.ProjectUncheckedCreateInput });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError(409, 'Ya existe un proyecto con ese código');
    }
    throw err;
  }
}

export async function update(id: string, data: UpdateItemDto) {
  try {
    return await prisma.project.update({
      where: { id },
      data: data as Prisma.ProjectUncheckedUpdateInput,
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw new AppError(404, 'Proyecto no encontrado');
      }
      if (err.code === 'P2002') {
        throw new AppError(409, 'Ya existe un proyecto con ese código');
      }
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    await prisma.project.delete({ where: { id } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Proyecto no encontrado');
    }
    throw err;
  }
}
