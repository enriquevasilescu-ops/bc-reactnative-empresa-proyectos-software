// src/app.ts — Configuración de la aplicación Express
// Dominio: Empresa de Proyectos de Software

import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import projectsRouter from './routes/items.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1/projects', projectsRouter);

app.use(notFound);
app.use(errorHandler);

export { app };
