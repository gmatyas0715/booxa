import { RendelesModell } from './rendeles-modell';

describe('RendelesModell', () => {
  it('should create an instance', () => {
    expect(new RendelesModell('minta_token',new Object,'jegyadatok')).toBeTruthy();
  });
});
