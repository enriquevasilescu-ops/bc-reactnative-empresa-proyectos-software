// src/data/mockData.ts
// Datos de prueba para el dominio: Empresa de Proyectos de Software.

import type { Item } from '../types';

// ============================================
// LISTA PRINCIPAL DE PROYECTOS
// ============================================

export const ITEMS: Item[] = [
  {
    id: '1',
    name: 'Sistema de Facturación Electrónica',
    description: 'Plataforma para generar y validar facturas electrónicas ante la DIAN.',
    client: 'Grupo Éxito',
    technology: 'Node.js + PostgreSQL',
    status: 'development',
    active: true,
    createdAt: '2026-02-10',
  },
  {
    id: '2',
    name: 'App de Domicilios',
    description: 'Aplicación móvil para pedidos y seguimiento de domicilios en tiempo real.',
    client: 'Rappi Colombia',
    technology: 'React Native',
    status: 'planning',
    active: true,
    createdAt: '2026-04-02',
  },
  {
    id: '3',
    name: 'Portal de Recursos Humanos',
    description: 'Gestión de nómina, vacaciones y evaluaciones de desempeño.',
    client: 'Bancolombia',
    technology: 'Angular + .NET',
    status: 'completed',
    active: false,
    createdAt: '2025-09-18',
  },
  {
    id: '4',
    name: 'Plataforma de E-learning',
    description: 'Cursos en línea con seguimiento de progreso y certificados.',
    client: 'Universidad de los Andes',
    technology: 'React + Django',
    status: 'development',
    active: true,
    createdAt: '2026-01-22',
  },
  {
    id: '5',
    name: 'Sistema de Inventarios',
    description: 'Control de stock, alertas de reabastecimiento y reportes.',
    client: 'Almacenes Éxito',
    technology: 'Vue.js + Spring Boot',
    status: 'planning',
    active: true,
    createdAt: '2026-05-14',
  },
  {
    id: '6',
    name: 'App de Telemedicina',
    description: 'Consultas médicas virtuales y gestión de historias clínicas.',
    client: 'Sura EPS',
    technology: 'Flutter + Firebase',
    status: 'development',
    active: true,
    createdAt: '2026-03-05',
  },
  {
    id: '7',
    name: 'Dashboard de Analítica',
    description: 'Visualización de KPIs operativos y financieros en tiempo real.',
    client: 'Ecopetrol',
    technology: 'React + Python',
    status: 'completed',
    active: false,
    createdAt: '2025-11-30',
  },
  {
    id: '8',
    name: 'Sistema de Reservas',
    description: 'Reserva y gestión de vuelos con integración de pagos.',
    client: 'Avianca',
    technology: 'Next.js + AWS',
    status: 'planning',
    active: true,
    createdAt: '2026-06-01',
  },
];

// ============================================
// LISTA DE FAVORITOS
// ============================================
// Proyectos marcados como favoritos por el usuario.

export const FAVORITES: Item[] = [
  ITEMS[0],
  ITEMS[3],
  ITEMS[5],
];
