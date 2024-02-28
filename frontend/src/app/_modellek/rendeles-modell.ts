export class RendelesModell {
    public rendelesIdopont:Date = new Date();
    public userToken:string;
    public szamlazasAdatok:object;
    public jegyAdatok:string

    constructor(userToken:string,szamlazasAdatok:object,jegyAdatok:string){
        this.userToken = userToken;
        this.szamlazasAdatok = szamlazasAdatok;
        this.jegyAdatok = jegyAdatok;
    }
}
