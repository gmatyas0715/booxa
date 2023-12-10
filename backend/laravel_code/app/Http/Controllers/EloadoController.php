<?php

namespace App\Http\Controllers;

use App\Models\Eloado;
use App\Http\Requests\StoreEloadoRequest;
use App\Http\Requests\UpdateEloadoRequest;
use Illuminate\Support\Facades\Schema;

class EloadoController extends Controller
{

    public function index()
    {
        $eloadok = Eloado::all();
        return response()->json($eloadok);
    }

    public function store(StoreEloadoRequest $request)
    {
        $ujEloado = new Eloado();
        $ujEloado->nev = $request->input('nev');
        $ujEloado->leiras = $request->input('leiras');
        $ujEloado->arkategoria = $request->input('arkategoria');
        $ujEloado->kep_eleres = $request->input('kep_eleres');
        $ujEloado->save();

        return response()->json(['üzenet' => $ujEloado->nev.' nevű előadó sikeresen létrehozva!']);
    }

    public function show(Eloado $eloado)
    {
        return response()->json($eloado);
    }

    public function update(UpdateEloadoRequest $request, Eloado $eloado)
    {
        $tablaMezok = Schema::getColumnListing($eloado->getTable());

        $updateAdat = $request->only($tablaMezok);

        $eloado->update($updateAdat);     

        return response()->json($eloado);
    }

    public function destroy(Eloado $eloado)
    {
        $eloado->delete();
        return response()->json(['üzenet'=>$eloado->nev.' nevű előadó sikeresen törölve!']);
    }
}
