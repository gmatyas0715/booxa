<?php

namespace App\Http\Controllers;

use App\Models\esemeny;
use App\Http\Requests\StoreesemenyRequest;
use App\Http\Requests\UpdateesemenyRequest;

class EsemenyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $esemenyek = Esemeny::all();
        return response()->json($cimek);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreesemenyRequest $request)
    {
        $ujEsemeny = new Esemeny();
        $ujEsemeny->eloado_id = $request->input('eloado_id');
        $ujEsemeny->mufaj_id = $request->input('mufaj_id');
        $ujEsemeny->save();
        return response()->json(['üzenet'=>$ujEsemeny->id.' azonosítóval új előadó műfaj kapcsolat lett sikeresen létrehozva!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(esemeny $esemeny)
    {
        return response()->json($esemeny);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(esemeny $esemeny)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateesemenyRequest $request, esemeny $esemeny)
    {
        $tablaMezok = \Schema::getColumnListing($esemeny->getTable());

        $updateAdat = $request->only($tablaMezok);

        $esemeny->update($updateAdat);     

        return response()->json($esemeny);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(esemeny $esemeny)
    {
        $esemeny->delete();
        return response()->json(['üzenet'=>$esemeny->id.' azonosítójú esemény sikeresen törölve!']);
    }
}
