<?php

namespace App\Http\Controllers;

use App\Models\Esemeny;
use App\Http\Requests\StoreEsemenyRequest;
use App\Http\Requests\UpdateEsemenyRequest;
use Illuminate\Support\Facades\Schema;

class EsemenyController extends Controller
{

    public function index()
    {
        $esemenyek = Esemeny::all();
        return response()->json($esemenyek);
    }

    public function store(StoreEsemenyRequest $request)
    {
        $ujEsemeny = new Esemeny();
        $ujEsemeny->eloado_id = $request->input('eloado_id');
        $ujEsemeny->mufaj_id = $request->input('mufaj_id');
        $ujEsemeny->save();
        return response()->json(['üzenet'=>$ujEsemeny->id.' azonosítóval új előadó műfaj kapcsolat lett sikeresen létrehozva!']);
    }

    public function show(Esemeny $esemeny)
    {
        return response()->json($esemeny);
    }

    function update(UpdateEsemenyRequest $request, Esemeny $esemeny)
    {
        $tablaMezok = Schema::getColumnListing($esemeny->getTable());

        $updateAdat = $request->only($tablaMezok);

        $esemeny->update($updateAdat);     

        return response()->json($esemeny);
    }

    public function destroy(Esemeny $esemeny)
    {
        $esemeny->delete();
        return response()->json(['üzenet'=>$esemeny->id.' azonosítójú esemény sikeresen törölve!']);
    }
}
