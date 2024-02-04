import { EloadoModell } from "./eloado-modell";
import { HelyszinModell } from "./helyszin-modell";

export class EsemenyModell {
    id:number;
    idopont:Date;
    jegy_alapar:number;
    helyszin:HelyszinModell;
    eloado:EloadoModell

    constructor(id:number,idopont:Date,jegy_alapar:number,helyszin:HelyszinModell,eloado:EloadoModell) {
        this.id = id
        this.idopont = idopont
        this.jegy_alapar = jegy_alapar
        this.helyszin = helyszin
        this.eloado = eloado
    }
}
