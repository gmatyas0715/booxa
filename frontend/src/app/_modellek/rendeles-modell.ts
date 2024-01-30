import { JegyAdatModell } from "./jegy-adat-modell";

export class RendelesModell {
    public rendelesIdopont:Date = new Date();
    public userToken:string;
    public bankkartyaAdat:object;
    public szamlazasAdat:object;
    public jegyAdatok:string[]

    constructor(userToken:string,bankkartyaAdat:object,szamlazasAdat:object,jegyAdatok:string[]){
        this.userToken = userToken;
        this.bankkartyaAdat = bankkartyaAdat
        this.szamlazasAdat = szamlazasAdat;
        this.jegyAdatok = jegyAdatok;
    }
}
