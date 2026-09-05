// src/schemas/items.schema.ts — Validación Zod para el recurso "Project"

import { z } from 'zod';

export const projectStatusEnum = z.enum(['PLANNING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED']);

export const createItemSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(200),
  code: z
    .string()
    .min(3, 'El código debe tener al menos 3 caracteres')
    .max(20)
    .regex(/^[A-Z0-9-]+$/, 'El código solo puede contener mayúsculas, números y guiones'),
  description: z.string().max(2000).optional(),
  status: projectStatusEnum.default('PLANNING'),
  budget: z.number().positive('El presupuesto debe ser mayor a 0'),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  clientId: z.string().uuid('clientId debe ser un UUID válido').optional(),
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
