<?php

namespace App\Http\Controllers;

use App\Models\Szektor;
use App\Http\Requests\StoreszektorRequest;
use App\Http\Requests\UpdateszektorRequest;

class SzektorController extends Controller
{

    public function index()
    {
        $szektorok = Szektor::all();
        return response()->json($szektorok);
    }

    public function store(StoreSzektorRequest $request)
    {
        $ujSzektor = new Szektor();
        $ujSzektor->szektor_id = $request->input('szektor_id');
        $ujSzektor->szektor_nev = $request->input('szektor_nev');
        $ujSzektor->szektor_tipus = $request->input('szektor_tipus');
        $ujSzektor->arszorzo = $request->input('arszorzo');
        $ujSzektor->max_kapacitas = $request->input('max_kapacitas');
        $ujSzektor->sorjelzes = $request->input('sorjelzes');
        $ujSzektor->helyszin_id = $request->input('helyszin_id');
        $ujSzektor->save();

        return response()->json(['üzenet' => $ujSzektor->szektor_id.' azonosítójú szektor sikeresen létrehozva!']);
    }

    public function show(Szektor $szektor)
    {
        return response()->json($szektor);
    }

    public function update(UpdateSzektorRequest $request, Szektor $szektor)
    {
        $tablaMezok = \Schema::getColumnListing($szektor->getTable());

        $updateAdat = $request->only($tablaMezok);

        $szektor->update($updateAdat);     

        return response()->json($szektor);
    }

    public function destroy(Szektor $szektor)
    {
        $szektor->delete();
        return response()->json(['üzenet'=>$szektor->id.' azonosítójú szektor sikeresen törölve!']);
    }
}
