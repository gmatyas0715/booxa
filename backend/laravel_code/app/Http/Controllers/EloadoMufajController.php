<?php

namespace App\Http\Controllers;

use App\Models\EloadoMufaj;
use App\Http\Requests\StoreEloadoMufajRequest;
use App\Http\Requests\UpdateEloadoMufajRequest;

class EloadoMufajController extends Controller
{

    public function index()
    {
        $eloadoMufaj = EloadoMufaj::all();
        return response()->json($eloadoMufaj);
    }

    public function store(StoreEloadoMufajRequest $request)
    {
        $ujEloadoMufajKapcsolat = new EloadoMufaj();
        $ujEloadoMufajKapcsolat->eloado_id = $request->input('eloado_id');
        $ujEloadoMufajKapcsolat->mufaj_id = $request->input('mufaj_id');

        $ujEloadoMufajKapcsolat->save();
        return response()->json(['üzenet'=>$ujEloadoMufajKapcsolat->id.' azonosítóval új előadó műfaj kapcsolat lett sikeresen létrehozva!']);
    }

    public function show(EloadoMufaj $eloadoMufaj)
    {
        return response()->json($eloadoMufaj);
    }

    public function update(UpdateEloadoMufajRequest $request, EloadoMufaj $eloadoMufaj)
    {
        $tablaMezok = \Schema::getColumnListing($eloadoMufaj->getTable());

        $updateAdat = $request->only($tablaMezok);

        $eloadoMufaj->update($updateAdat);     

        return response()->json($eloadoMufaj);
    }

    public function destroy(EloadoMufaj $eloadoMufaj)
    {
        $eloado_mufaj->delete();
        return response()->json(['üzenet'=>$eloado_mufaj->id.' azonosítójú előadó-műfaj kapcsolat sikeresen törölve!']);
    }
}
