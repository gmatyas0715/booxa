<?php

namespace App\Http\Controllers;

use App\Models\eloado;
use App\Http\Requests\StoreeloadoRequest;
use App\Http\Requests\UpdateeloadoRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EloadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $eloadok = Eloado::all();
        return response()->json($eloadok);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreeloadoRequest $request)
    {
        $ujEloado = new Eloado();
        $ujEloado->nev = $request->input('nev');
        $ujEloado->leiras = $request->input('leiras');
        $ujEloado->arkategoria = $request->input('arkategoria');
        $ujEloado->kep_eleres = $request->input('kep_eleres');
        $ujEloado->save();

        return response()->json(['üzenet' => $ujEloado->nev.' nevű előadó sikeresen létrehozva!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(eloado $eloado)
    {
        return response()->json($eloado);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(eloado $eloado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateeloadoRequest $request, eloado $eloado)
    {
        $tablaMezok = \Schema::getColumnListing($eloado->getTable());

        $updateAdat = $request->only($tablaMezok);

        $eloado->update($updateAdat);     

        return response()->json($eloado);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(eloado $eloado)
    {
        $eloado->delete();
        return response()->json(['üzenet'=>$eloado->nev.' nevű előadó sikeresen törölve!']);
    }
}
