// src/controllers/items.controller.ts — Capa HTTP para "Project"

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/items.service';
import { createItemSchema, updateItemSchema } from '../schemas/items.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, Number.parseInt(String(req.query['page'] ?? '1'), 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(String(req.query['limit'] ?? '10'), 10) || 10));

    const result = await service.listItems(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const project = await service.getItem(id as string);
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = createItemSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ status: 'error', message: 'Datos inválidos', errors: parsed.error.flatten() });
      return;
    }

    const project = await service.createItem(parsed.data);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const parsed = updateItemSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ status: 'error', message: 'Datos inválidos', errors: parsed.error.flatten() });
      return;
    }

    const project = await service.updateItem(id as string, parsed.data);
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    await service.deleteItem(id as string);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
