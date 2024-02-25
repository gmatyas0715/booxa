<?php

namespace App\Http\Controllers;

use App\Models\EloadoMufaj;

class EloadoMufajController extends Controller
{
    public static function kapcsolatBeszuras(int $eloadoId, String $mufajIdLista) {
        $mufajIdLista = explode(',',$mufajIdLista);

        foreach ($mufajIdLista as $mufajId) {
           EloadoMufaj::create([
            'eloado_id'=>$eloadoId,
            'mufaj_id'=>$mufajId
           ]);
        }
    }

    public static function kapcsolatEltavolitas(int $eloadoId){
        EloadoMufaj::where('eloado_id',$eloadoId)->delete();
    }
}
