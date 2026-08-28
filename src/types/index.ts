// src/types/index.ts

export interface Item {
  id: string;
  name: string;
  description: string;
  lead: string;
  duration: number;
  modality: 'Remoto' | 'Presencial';
  teamSize: number;
}