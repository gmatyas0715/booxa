import { EloadoModell } from './eloado-modell';
import { EsemenyModell } from './esemeny-modell';
import { HelyszinModell } from './helyszin-modell';
import { JegyAdatModell } from './jegy-adat-modell';

describe('JegyAdatModell', () => {
  it('should create an instance', () => {
    var eloado = new EloadoModell(2,'Minta előadó 2','Minta előadó 2 leírás.','minta_eloado_kep_eleres_2.jpg')
    var helyszin = new HelyszinModell(1,'Minta helyszín 1',1000,'minta_helyszin_kep_eleres.jpg','minta_helyszin_kep_eleres.svg')
    var esemeny = new EsemenyModell(1,new Date(),10000,helyszin,eloado)
    expect(new JegyAdatModell(esemeny,null,null,[],2)).toBeTruthy();
  });
});
