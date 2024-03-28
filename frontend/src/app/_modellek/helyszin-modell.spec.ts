import { HelyszinModell } from './helyszin-modell';

describe('HelyszinModell', () => {
  it('should create an instance', () => {
    expect(new HelyszinModell(1,'Minta helyszín 1',1000,'minta_helyszin_kep_eleres.jpg','minta_helyszin_kep_eleres.svg')).toBeTruthy();
  });
});
