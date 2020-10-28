export class Fichier {
  id: number;
  name: string;
  path: string;
  size: number;
  inscription: string;
  extension: {
    id: number;
    libelle: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  };
}
