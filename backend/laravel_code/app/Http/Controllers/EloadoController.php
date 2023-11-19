<?php

namespace App\Http\Controllers;

use App\Models\eloado;
use App\Http\Requests\StoreeloadoRequest;
use App\Http\Requests\UpdateeloadoRequest;
use Illuminate\Http\Request;

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
    public function create(Request $request)
    {
        $ujEloado = new Eloado();
        $ujEloado->nev = $request->input('nev');
        $ujEloado->leiras = $request->input('leiras');
        $ujEloado->kep_eleres = $request->input('kep_eleres');
        $ujEloado->save();

        return response()->json(['üzenet' => $ujEloado->nev.' nevű előadó sikeresen létrehozva!']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreeloadoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(eloado $eloado)
    {
        if(!$eloado){
            return response()->json(['üzenet'=>'Az adott id-val rendelkező előadó nem létezik']);
        }

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
        //
    }

    public function updateLeiras(Request $request, $id)
    {
        $ujLeiras = $request->input('leiras');

        eloado::where('id', $id)->update(['leiras' => $ujLeiras]);

        return response()->json(['üzenet' => 'Leírás sikeresen frissítve!']);
    }

    public function updateEloadoNev(Request $request, $id)
    {
        $ujEloadoNev = $request->input('nev');

        eloado::where('id', $id)->update(['nev' => $ujEloadoNev]);

        return response()->json(['üzenet' => 'Előadó név sikeresen frissítve!']);
    }

    public function updateEloadoKepEleres(Request $request, $id)
    {
        $ujEloadoKepEleres = $request->input('kep_eleres');

        eloado::where('id', $id)->update(['kep_eleres' => $ujEloadoKepEleres]);

        return response()->json(['üzenet' => 'Előadó kép elérés sikeresen frissítve!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(eloado $eloado)
    {
        //
    }

    public function destroyEloado($id)
    {
        $eloadoTorol = Eloado::find($id);

        if(!$eloadoTorol){
            return response()->json(['üzenet'=>'A megadott id-val rendelkező előadó nem található!']);
        }

        $eloadoTorol->delete();
        return response()->json(['üzenet'=>$eloadoTorol->nev.' nevű előadó sikeresen törölve!']);
    }
}
