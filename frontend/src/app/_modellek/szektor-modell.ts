import { SzektorAlegysegModell } from "./szektor-alegyseg-modell";

export interface SzektorModell {
    id:string;
    szektor_nev:string;
    szektor_tipus:string;
    helyszin_id:number;
    szektor_alegyseg:SzektorAlegysegModell[];
    szin:string;
}
