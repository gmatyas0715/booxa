import { SzektorModell } from "./szektor-modell";

export interface JegyAdatModell {
    id:number;
    esemeny_id:string;
    szektor:SzektorModell;
    sorjelzes:number;
    ulohely:number;
    jegyar:number;
}
