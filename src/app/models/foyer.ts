
import { Universite } from '../models/universite';

export interface Foyer {
    idFoyer: number ;
    nomFoyer: string ;
    capaciteFoyer: number;

  //  bloc: Bloc;
  //  reservations: Reservation[];
  universite: Universite | null;

  }