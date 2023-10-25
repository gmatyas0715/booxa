import { Injectable } from '@angular/core';
import { EloadoModell } from '../_modellek/eloado-modell';
import { HelyszinModell } from '../_modellek/helyszin-modell';
import { EsemenyModell } from '../_modellek/esemeny-modell';

@Injectable({
  providedIn: 'root'
})
export class EsemenyService {

  public esemenyLista:EsemenyModell[] = []

  constructor(
    public eloado:EloadoModell,
    public helyszin:HelyszinModell
  ) { }
}
