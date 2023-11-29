<?php

namespace App\Http\Controllers;

use App\Models\eloado_mufaj;
use App\Http\Requests\Storeeloado_mufajRequest;
use App\Http\Requests\Updateeloado_mufajRequest;

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
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Storeeloado_mufajRequest $request)
    {
        $ujEloadoMufajKapcsolat = new Eloado_mufaj();
        $ujEloadoMufajKapcsolat->eloado_id = $request->input('eloado_id');
        $ujEloadoMufajKapcsolat->mufaj_id = $request->input('mufaj_id');

        $ujEloadoMufajKapcsolat->save();
        return response()->json(['üzenet'=>$ujEloadoMufajKapcsolat->id.' azonosítóval új előadó műfaj kapcsolat lett sikeresen létrehozva!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(eloado_mufaj $eloado_mufaj)
    {
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
        $tablaMezok = \Schema::getColumnListing($eloado_mufaj->getTable());

        $updateAdat = $request->only($tablaMezok);

        $eloado_mufaj->update($updateAdat);     

        return response()->json($eloado_mufaj);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(eloado_mufaj $eloado_mufaj)
    {
        $eloado_mufaj->delete();
        return response()->json(['üzenet'=>$eloado_mufaj->id.' azonosítójú előadó-műfaj kapcsolat sikeresen törölve!']);
    }
}
