import { EsemenyModell } from "./esemeny-modell";
import { SzektorModell } from "./szektor-modell";
import { SzektorAlegysegModell } from "./szektor-alegyseg-modell";

export class JegyAdatModell {
    public id: number = 0;
    public esemeny:EsemenyModell;
    public szektor:SzektorModell|null;
    public szektorAlegyseg:SzektorAlegysegModell|null;
    public ulohely:number;

    constructor(esemeny:EsemenyModell,szektor:SzektorModell|null,szektorAlegyseg:SzektorAlegysegModell|null,ulohely:number) {
        this.esemeny=esemeny;
        this.szektor = szektor;
        this.szektorAlegyseg = szektorAlegyseg;
        this.ulohely=ulohely;
    }
}
