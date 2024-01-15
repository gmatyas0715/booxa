<?php

namespace App\Http\Controllers;

use App\Models\SzektorAlegyseg;
use App\Http\Requests\StoreSzektorAlegysegRequest;
use App\Http\Requests\UpdateSzektorAlegysegRequest;
use App\Models\Esemeny;
use Illuminate\Support\Facades\Schema;

class SzektorAlegysegController extends Controller
{

    public function index()
    {
        $szektorAlegysegek = SzektorAlegyseg::with('szektor')->get();
        return response()->json($szektorAlegysegek);
    }

    public function store(StoreSzektorAlegysegRequest $request)
    {
        $ujSzektorAlegyseg = new SzektorAlegyseg();
        $ujSzektorAlegyseg->szektor_alegyseg_id = $request->input('szektor_alegyseg_id');
        $ujSzektorAlegyseg->szektor_alegyseg_nev = $request->input('szektor_alegyseg_nev');
        $ujSzektorAlegyseg->arszorzo = $request->input('arszorzo');
        $ujSzektorAlegyseg->max_kapacitas = $request->input('max_kapacitas');
        $ujSzektorAlegyseg->sorjelzes = $request->input('sorjelzes');
        $ujSzektorAlegyseg->helyszin_id = $request->input('helyszin_id');
        $ujSzektorAlegyseg->save();

        return response()->json(['üzenet' => $ujSzektorAlegyseg->szektor_alegyseg_id.' azonosítójú szektor alegység sikeresen létrehozva!']);
    }

    public function show(SzektorAlegyseg $szektorAlegyseg)
    {
        return response()->json($szektorAlegyseg);
    }

    public function update(UpdateSzektorAlegysegRequest $request, SzektorAlegyseg $szektorAlegyseg)
    {
        $tablaMezok = Schema::getColumnListing($szektorAlegyseg->getTable());

        $updateAdat = $request->only($tablaMezok);

        $szektorAlegyseg->update($updateAdat);     

        return response()->json($szektorAlegyseg);
    }

    public function destroy(SzektorAlegyseg $szektorAlegyseg)
    {
        $szektorAlegyseg->delete();
        return response()->json(['üzenet'=>$szektorAlegyseg->id.' azonosítójú szektor alegység sikeresen törölve!']);
    }
}
