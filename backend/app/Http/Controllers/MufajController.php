<?php

namespace App\Http\Controllers;

use App\Models\Mufaj;
use App\Http\Requests\StoreMufajRequest;
use App\Http\Requests\UpdateMufajRequest;
use Illuminate\Support\Facades\Schema;

class MufajController extends Controller
{

    public function index()
    {
        $mufajok = Mufaj::all();
        return response()->json($mufajok);
    }

    public function mufajNevek()
    {
        $mufajok = Mufaj::pluck('nev')->toArray();
        return response()->json($mufajok);
    }

    public function store(StoreMufajRequest $request)
    {
        $ujMufaj = new Mufaj();
        $ujMufaj->nev = $request->input('nev');
        $ujMufaj->leiras = $request->input('leiras');
        $ujMufaj->save();

        return response()->json(['üzenet' => $ujMufaj->nev.' nevű műfaj sikeresen létrehozva!']);
    }

    public function show(Mufaj $eloado)
    {
        return response()->json($eloado);
    }

    public function update(UpdateMufajRequest $request, Mufaj $mufaj)
    {
        $tablaMezok = Schema::getColumnListing($mufaj->getTable());

        $updateAdat = $request->only($tablaMezok);

        $mufaj->update($updateAdat);     

        return response()->json($mufaj);
    }

    public function destroy(Mufaj $mufaj)
    {
        $mufaj->delete();
        return response()->json(['üzenet'=>$mufaj->nev.' nevű műfaj sikeresen törölve!']);
    }
}
