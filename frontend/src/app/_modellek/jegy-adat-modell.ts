export class JegyAdatModell {
    public id: number;
    public eloadoNev:string;
    public helyszinNev:string;
    public szektorNev:string;
    public szektorTipus:string;
    public sorjelzes:string;
    public ulohely:string;
    public szektorAlegysegJegyar:number;
    public kepEleres:string;
    public helyszinKepEleres:string;

    constructor(id:number,eloadoNev:string,helyszinNev:string,szektorNev:string,szektorTipus:string,sorjelzes:string,ulohely:string,szektorAlegysegJegyar:number,kepEleres:string,helyszinKepEleres:string) {
        this.id = id
        this.eloadoNev = eloadoNev
        this.helyszinNev = helyszinNev
        this.szektorNev = szektorNev
        this.szektorTipus = szektorTipus
        this.sorjelzes = sorjelzes
        this.ulohely = ulohely
        this.szektorAlegysegJegyar = szektorAlegysegJegyar
        this.kepEleres = kepEleres
        this.helyszinKepEleres = helyszinKepEleres
    }
}
