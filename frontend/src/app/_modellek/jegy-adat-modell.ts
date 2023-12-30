import { EsemenyModell } from "./esemeny-modell";
import { SzektorCsoportModell } from "./szektor-csoport-modell";
import { SzektorModell } from "./szektor-modell";

export class JegyAdatModell {
    public esemeny:EsemenyModell;
    public szektorCsoport:SzektorCsoportModell;
    public szektor:SzektorModell;
    public ulohely:number;
    public jegyDarabszam:number;

    constructor(esemeny:EsemenyModell,szektorCsoport:SzektorCsoportModell,szektor:SzektorModell,ulohely:number,jegyDarabszam:number) {
        this.esemeny=esemeny;
        this.szektorCsoport = szektorCsoport;
        this.szektor = szektor;
        this.ulohely=ulohely;
        this.jegyDarabszam = jegyDarabszam;
    }
}
