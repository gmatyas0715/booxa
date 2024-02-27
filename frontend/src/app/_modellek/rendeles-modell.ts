import { JegyAdatModell } from "./jegy-adat-modell";

export class RendelesModell {
    public rendelesIdopont:Date = new Date();
    public userToken:string;
    public szamlazasAdat:object;
    public jegyAdatok:string

    constructor(userToken:string,szamlazasAdat:object,jegyAdatok:string){
        this.userToken = userToken;
        this.szamlazasAdat = szamlazasAdat;
        this.jegyAdatok = jegyAdatok;
    }
}
