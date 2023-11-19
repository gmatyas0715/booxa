<?php

namespace App\Http\Controllers;

use App\Models\eloado_mufaj;
use App\Http\Requests\Storeeloado_mufajRequest;
use App\Http\Requests\Updateeloado_mufajRequest;
use Illuminate\Http\Request;

class EloadoMufajController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $eloado_mufaj = Eloado_mufaj::all();
        return response()->json($eloado_mufaj);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $ujEloadoMufajKapcsolat = new Eloado_mufaj();
        $ujEloadoMufajKapcsolat->eloado_id = $request->input('eloado_id');
        $ujEloadoMufajKapcsolat->mufaj_id = $request->input('mufaj_id');

        $ujEloadoMufajKapcsolat->save();
        return response()->json(['üzenet'=>'Új előadó műfaj kapcsolat létrehozva']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Storeeloado_mufajRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(eloado_mufaj $eloado_mufaj)
    {
        if(!$eloado_mufaj){
            return response()->json(['üzenet'=>'Az adott id-val rendelkező előadó-műfaj kapcsolat nem létezik']);
        }

        return response()->json($eloado_mufaj);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(eloado_mufaj $eloado_mufaj)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updateeloado_mufajRequest $request, eloado_mufaj $eloado_mufaj)
    {

    }

    public function updateEloadoMufajKapcsolat(Request $request, $id)
    {
        $eloadoId = $request->input('eloado_id');
        $mufajId = $request->input('mufaj_id');
        eloado_mufaj::where('id',$id)->update([
            'eloado_id'=>$eloadoId,
            'mufaj_id'=>$mufajId
        ]);

        return response()->json(['üzenet'=>'Előadő műfaj kapcsolat sikeresen frissítve!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(eloado_mufaj $eloado_mufaj)
    {
        //
    }
}
