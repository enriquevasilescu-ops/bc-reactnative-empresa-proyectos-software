// src/navigation/types.ts
// Define los tipos de parámetros para cada navigator.
// Esto habilita autocompletado y verificación en tiempo de compilación.

// ============================================
// TAB NAVIGATOR — pantallas de nivel raíz
// ============================================

export type RootTabParamList = {
  // Pestaña principal con Stack interno (lista → detalle)
  Home: undefined;
  // Pestaña secundaria de favoritos
  Favorites: undefined;
};

// ============================================
// STACK NAVIGATOR — anidado dentro de la pestaña Home
// ============================================

export type HomeStackParamList = {
  // Pantalla de lista (sin params)
  HomeList: undefined;
  // Pantalla de detalle — recibe los datos del proyecto seleccionado
  HomeDetail: {
    id: string;
    name: string;
    description: string;
    client: string;
    technology: string;
    status: 'planning' | 'development' | 'completed';
    active: boolean;
    createdAt: string;
  };
};
