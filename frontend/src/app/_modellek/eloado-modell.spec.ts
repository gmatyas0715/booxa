import { EloadoModell } from './eloado-modell';

describe('EloadoModell', () => {
  it('should create an instance', () => {
    expect(new EloadoModell(undefined,'Minta előadó 1','Minta előadó leírás 1.','minta_eloado_kep_eleres.jpg')).toBeTruthy();
    expect(new EloadoModell(2,'Minta előadó 2','Minta előadó 2 leírás.','minta_eloado_kep_eleres_2.jpg')).toBeTruthy();
  });
});
