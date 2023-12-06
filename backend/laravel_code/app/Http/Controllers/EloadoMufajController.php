<?php

namespace App\Http\Controllers;

use App\Models\EloadoMufaj;
use App\Http\Requests\StoreEloadoMufajRequest;
use App\Http\Requests\UpdateEloadoMufajRequest;

class EloadoMufajController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $eloadoMufaj = EloadoMufaj::all();
        return response()->json($eloadoMufaj);
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
    public function store(StoreEloadoMufajRequest $request)
    {
        $ujEloadoMufajKapcsolat = new EloadoMufaj();
        $ujEloadoMufajKapcsolat->eloado_id = $request->input('eloado_id');
        $ujEloadoMufajKapcsolat->mufaj_id = $request->input('mufaj_id');

        $ujEloadoMufajKapcsolat->save();
        return response()->json(['üzenet'=>$ujEloadoMufajKapcsolat->id.' azonosítóval új előadó műfaj kapcsolat lett sikeresen létrehozva!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(EloadoMufaj $eloadoMufaj)
    {
        return response()->json($eloadoMufaj);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EloadoMufaj $eloadoMufaj)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEloadoMufajRequest $request, EloadoMufaj $eloadoMufaj)
    {
        $tablaMezok = \Schema::getColumnListing($eloadoMufaj->getTable());

        $updateAdat = $request->only($tablaMezok);

        $eloadoMufaj->update($updateAdat);     

        return response()->json($eloadoMufaj);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EloadoMufaj $eloadoMufaj)
    {
        $eloado_mufaj->delete();
        return response()->json(['üzenet'=>$eloado_mufaj->id.' azonosítójú előadó-műfaj kapcsolat sikeresen törölve!']);
    }
}
