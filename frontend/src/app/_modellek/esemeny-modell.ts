import { EloadoModell } from "./eloado-modell";
import { HelyszinModell } from "./helyszin-modell";

export interface EsemenyModell {
    id:number;
    idopont:Date;
    jegy_alapar:number;
    eloado_id:number;
    helyszin_id:number;
    helyszin:HelyszinModell;
    eloado:EloadoModell
}
