import { SzektorModell } from "./szektor-modell";

export class HelyszinModell {
    id:number;
    nev:string;
    kapacitas:number;
    helyszin_kep_eleres:string;
    svg_kep_eleres:string;
    szektor:SzektorModell[];

    
    constructor(id:number,nev:string,kapacitas:number,helyszin_kep_eleres:string,svg_kep_eleres:string,szektor:SzektorModell[] = []) {
        this.id = id
        this.nev = nev
        this.kapacitas = kapacitas
        this.helyszin_kep_eleres = helyszin_kep_eleres
        this.svg_kep_eleres = svg_kep_eleres
        this.szektor = szektor
    }
}
