// prisma/seed.ts — Datos iniciales del dominio "Empresa de Proyectos de Software"
// Ejecutar con: pnpm dlx prisma db seed

import { PrismaClient, ProjectStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  // 1. Limpiar datos existentes para idempotencia (orden importa por la FK)
  await prisma.project.deleteMany();
  await prisma.client.deleteMany();

  // 2. Crear clientes (recurso secundario)
  const acme = await prisma.client.create({
    data: {
      name: 'Ana Torres',
      email: 'ana.torres@acmecorp.com',
      phone: '+57 300 111 2222',
      company: 'Acme Corp',
    },
  });

  const globex = await prisma.client.create({
    data: {
      name: 'Carlos Ríos',
      email: 'carlos.rios@globex.com',
      phone: '+57 301 222 3333',
      company: 'Globex S.A.S.',
    },
  });

  const initech = await prisma.client.create({
    data: {
      name: 'Laura Gómez',
      email: 'laura.gomez@initech.com',
      phone: '+57 302 333 4444',
      company: 'Initech',
    },
  });

  console.log(`✅ 3 clientes creados`);

  // 3. Crear proyectos (recurso principal) — mínimo 5 registros
  const result = await prisma.project.createMany({
    data: [
      {
        name: 'Rediseño E-commerce Acme',
        code: 'PRJ-001',
        description: 'Rediseño completo de la plataforma de e-commerce de Acme Corp.',
        status: ProjectStatus.IN_PROGRESS,
        budget: 45000.0,
        startDate: new Date('2026-01-15'),
        clientId: acme.id,
      },
      {
        name: 'App Móvil de Fidelización',
        code: 'PRJ-002',
        description: 'Aplicación móvil de puntos y recompensas para clientes de Acme.',
        status: ProjectStatus.PLANNING,
        budget: 32000.0,
        startDate: new Date('2026-03-01'),
        clientId: acme.id,
      },
      {
        name: 'Migración a Microservicios',
        code: 'PRJ-003',
        description: 'Migración del monolito de Globex a una arquitectura de microservicios.',
        status: ProjectStatus.IN_PROGRESS,
        budget: 80000.0,
        startDate: new Date('2025-11-01'),
        clientId: globex.id,
      },
      {
        name: 'Portal de Facturación',
        code: 'PRJ-004',
        description: 'Portal web para gestión y consulta de facturas de Globex.',
        status: ProjectStatus.COMPLETED,
        budget: 21000.0,
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-10-15'),
        clientId: globex.id,
      },
      {
        name: 'Dashboard de Analítica Interna',
        code: 'PRJ-005',
        description: 'Dashboard interno de métricas de negocio para Initech.',
        status: ProjectStatus.ON_HOLD,
        budget: 18000.0,
        startDate: new Date('2026-02-10'),
        clientId: initech.id,
      },
      {
        name: 'Sitio Web Corporativo',
        code: 'PRJ-006',
        description: 'Rediseño del sitio web institucional de Initech.',
        status: ProjectStatus.CANCELLED,
        budget: 9000.0,
        startDate: new Date('2025-09-01'),
        clientId: initech.id,
      },
    ],
  });

  console.log(`✅ ${result.count} proyectos creados`);
}

main()
  .catch((err: unknown) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
