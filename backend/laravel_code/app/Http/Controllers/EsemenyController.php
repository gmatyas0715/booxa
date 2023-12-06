<?php

namespace App\Http\Controllers;

use App\Models\Esemeny;
use App\Http\Requests\StoreEsemenyRequest;
use App\Http\Requests\UpdateEsemenyRequest;

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
    public function store(StoreEsemenyRequest $request)
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
    public function show(Esemeny $esemeny)
    {
        return response()->json($esemeny);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Esemeny $esemeny)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEsemenyRequest $request, Esemeny $esemeny)
    {
        $tablaMezok = \Schema::getColumnListing($esemeny->getTable());

        $updateAdat = $request->only($tablaMezok);

        $esemeny->update($updateAdat);     

        return response()->json($esemeny);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Esemeny $esemeny)
    {
        $esemeny->delete();
        return response()->json(['üzenet'=>$esemeny->id.' azonosítójú esemény sikeresen törölve!']);
    }
}
