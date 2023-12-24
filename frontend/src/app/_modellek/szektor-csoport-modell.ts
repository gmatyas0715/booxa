import { SzektorModell } from "./szektor-modell";

export interface SzektorCsoportModell {
    id:string;
    szektor_csoport_nev:string;
    szektor_tipus:string;
    helyszin_id:number;
    szektor:SzektorModell[];
}
