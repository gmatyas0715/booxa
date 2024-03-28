import { EsemenyModell } from "./esemeny-modell";
import { SzektorModell } from "./szektor-modell";
import { SzektorAlegysegModell } from "./szektor-alegyseg-modell";

export class JegyAdatModell {
    public esemeny:EsemenyModell;
    public szektor:SzektorModell|null;
    public szektorAlegyseg:SzektorAlegysegModell|null;
    public ulohely:number[];
    public jegyDarabszam:number;

    constructor(esemeny:EsemenyModell,szektor:SzektorModell|null,szektorAlegyseg:SzektorAlegysegModell|null,ulohely:number[]=[],jegyDarabszam:number) {
        this.esemeny=esemeny;
        this.szektor = szektor;
        this.szektorAlegyseg = szektorAlegyseg;
        this.ulohely=ulohely;
        this.jegyDarabszam = jegyDarabszam;
    }
}
