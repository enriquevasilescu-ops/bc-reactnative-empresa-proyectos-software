// ============================================
// ROUTES — Rutas de proyectos
// ============================================

import { Router } from 'express';

import * as controller from '../controllers/projects.controller';

export const projectsRouter = Router();

projectsRouter.get('/', controller.getAll);

projectsRouter.get('/:id', controller.getById);

projectsRouter.post('/', controller.create);

projectsRouter.put('/:id', controller.update);

projectsRouter.delete('/:id', controller.remove);