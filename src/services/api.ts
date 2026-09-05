// src/services/api.ts
// Instancia Axios centralizada para el proyecto.
// Dominio: Empresa de Proyectos de Software — consume la API de la Semana 04
// (Express + Prisma, ver carpeta raíz: src/app.ts, prisma/schema.prisma).

import axios from 'axios';

// ============================================================
// BASE URL
// ============================================================
// La API real corre localmente en http://localhost:3000 (ver src/server.ts
// y `pnpm dev` en la raíz del proyecto backend).
//
// IMPORTANTE — "localhost" desde el dispositivo/emulador NO apunta a tu
// computador. Usa según dónde corras la app:
//   - Android Emulator ............ http://10.0.2.2:3000/api/v1
//   - iOS Simulator ................ http://localhost:3000/api/v1
//   - Dispositivo físico (misma wifi) http://<IP-DE-TU-PC>:3000/api/v1
//   - Expo Go ...................... usa la IP que te muestra `expo start`
//
// Configura tu caso en un archivo .env.local (no se sube a git):
//   EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api/v1
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ============================================================
// INTERCEPTOR DE RESPUESTA — manejo global de errores
// ============================================================
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      console.error('[API Error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  }
);
