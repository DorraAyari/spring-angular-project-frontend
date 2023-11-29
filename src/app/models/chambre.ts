import { Bloc } from "./bloc";

// chambre.ts
export interface Chambre {
  idChambre: number;
  numeroChambre: number;
  typeChambre: string;
  bloc?: Bloc; // Make bloc property optional
  bloc_id_bloc: number;
  isOccupied: boolean; // New property

}
