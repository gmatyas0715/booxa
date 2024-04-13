import { JegyAdatModell } from './jegy-adat-modell';

describe('JegyAdatModell', () => {
  it('should create an instance', () => {
    expect(new JegyAdatModell(2,'TesztEloado','TesztHelyszin','a_szektor','allo','VIP','1',10000,'teszt_kep_eleres.jpg','teszt_helyszin_kep_eleres.jpg')).toBeTruthy();
  });
});
