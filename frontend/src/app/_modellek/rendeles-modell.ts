export class RendelesModell {
    public rendelesIdopont:Date = new Date();
    public userToken:string;
    public szamlazasAdatok:object;

    constructor(userToken:string,szamlazasAdatok:object){
        this.userToken = userToken;
        this.szamlazasAdatok = szamlazasAdatok;
    }
}
