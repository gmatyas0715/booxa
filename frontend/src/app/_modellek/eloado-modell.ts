export class EloadoModell {
    id:number;
    nev:string;
    leiras:string;
    kep_eleres: string;

    constructor(id:number = 0,nev:string,leiras:string,kep_eleres:string) {
        this.id = id
        this.nev = nev
        this.leiras = leiras
        this.kep_eleres = kep_eleres
    }
}
