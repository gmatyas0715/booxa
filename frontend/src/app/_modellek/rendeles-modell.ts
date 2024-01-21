import { JegyAdatModell } from "./jegy-adat-modell";

export class RendelesModell {
    public rendelesIdopont:Date = new Date();
    public userToken:string;
    public fizetesAdat:object;
    public jegyAdatok:string[]

    constructor(userToken:string,fizetesAdat:object,jegyAdatok:string[]){
        this.userToken = userToken;
        this.fizetesAdat = fizetesAdat;
        this.jegyAdatok = jegyAdatok;
    }
}
