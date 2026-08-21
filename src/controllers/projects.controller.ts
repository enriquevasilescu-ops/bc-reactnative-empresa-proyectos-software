// ============================================
// CONTROLLER — Interfaz HTTP
// ============================================

import { Request, Response, NextFunction } from 'express';

import * as service from '../services/projects.service';

import {
  CreateProjectDto,
  UpdateProjectDto,
  ErrorResponse,
} from '../types';

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await service.findAll({ page, limit });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const project = await service.findById(id);

    if (!project) {
      const response: ErrorResponse = {
        error: 'Not Found',
        message: `Project ${id} not found`,
      };

      res.status(404).json(response);
      return;
    }

    res.json({ data: project });
  } catch (err) {
    next(err);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dto = req.body as CreateProjectDto;

    const project = await service.create(dto);

    res.status(201).json({ data: project });
  } catch (err) {
    next(err);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const dto = req.body as UpdateProjectDto;

    const project = await service.update(id, dto);

    if (!project) {
      const response: ErrorResponse = {
        error: 'Not Found',
        message: `Project ${id} not found`,
      };

      res.status(404).json(response);
      return;
    }

    res.json({ data: project });
  } catch (err) {
    next(err);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const removed = await service.remove(id);

    if (!removed) {
      const response: ErrorResponse = {
        error: 'Not Found',
        message: `Project ${id} not found`,
      };

      res.status(404).json(response);
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}