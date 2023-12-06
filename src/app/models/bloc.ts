import { Foyer } from "./foyer";

export class Bloc {
    idBloc!: number;
    nomBloc!: String;
    capaciteBloc!: number;
    foyer?: Foyer;
   foyer_id_foyer: number;

    constructor() {
        this.foyer_id_foyer = 0; // ou toute autre valeur par défaut que vous souhaitez attribuer
    }
}
