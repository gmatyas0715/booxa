<?php

namespace App\Http\Controllers;

use App\Models\Szektor;
use App\Http\Requests\StoreszektorRequest;
use App\Http\Requests\UpdateszektorRequest;

class SzektorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $szektorok = Szektor::all();
        return response()->json($szektorok);
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
    public function store(StoreSzektorRequest $request)
    {
        $ujSzektor = new Szektor();
        $ujSzektor->szektor_id = $request->input('szektor_id');
        $ujSzektor->szektor_nev = $request->input('szektor_nev');
        $ujSzektor->szektor_tipus = $request->input('szektor_tipus');
        $ujSzektor->arszorzo = $request->input('arszorzo');
        $ujSzektor->max_kapacitas = $request->input('max_kapacitas');
        $ujSzektor->sorjelzes = $request->input('sorjelzes');
        $ujSzektor->helyszin_id = $request->input('helyszin_id');
        $ujSzektor->save();

        return response()->json(['üzenet' => $ujSzektor->szektor_id.' azonosítójú szektor sikeresen létrehozva!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Szektor $szektor)
    {
        return response()->json($szektor);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Szektor $szektor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSzektorRequest $request, Szektor $szektor)
    {
        $tablaMezok = \Schema::getColumnListing($szektor->getTable());

        $updateAdat = $request->only($tablaMezok);

        $szektor->update($updateAdat);     

        return response()->json($szektor);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Szektor $szektor)
    {
        $szektor->delete();
        return response()->json(['üzenet'=>$szektor->id.' azonosítójú szektor sikeresen törölve!']);
    }
}
