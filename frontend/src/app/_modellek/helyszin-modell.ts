import { SzektorCsoportModell } from "./szektor-csoport-modell";

export interface HelyszinModell {
    id:number;
    nev:string;
    cim_id:number;
    kapacitas:number;
    szabadteri:boolean;
    helyszin_kep_eleres:string;
    svg_kep_eleres:string;
    szektorcsoport:SzektorCsoportModell[];
}
