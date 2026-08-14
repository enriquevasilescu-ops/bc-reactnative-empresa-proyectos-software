export type ProjectStatus =
  | "Planificación"
  | "En desarrollo"
  | "Pruebas"
  | "Completado";

export interface Project {
  id: string;
  name: string;
  client: string;
  technology: string;
  status: ProjectStatus;
  team: string;
  imageUri: string;
}