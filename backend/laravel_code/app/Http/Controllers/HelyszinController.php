<?php

namespace App\Http\Controllers;

use App\Models\helyszin;
use App\Http\Requests\StorehelyszinRequest;
use App\Http\Requests\UpdatehelyszinRequest;

class HelyszinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $helyszin = Helyszin::all();
        return response()->json($helyszin);
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
    public function store(StorehelyszinRequest $request)
    {
        $ujHelyszin = new Helyszin();
        $ujHelyszin->id = $request->input('id');
        $ujHelyszin->nev = $request->input('nev');
        $ujHelyszin->cim_id = $request->input('cim_id');
        $ujHelyszin->kapacitas = $request->input('kapacitas');
        $ujHelyszin->kontakt_informacio = $request->input('kontakt_informacio');
        $ujHelyszin->szabadteri = $request->input('szabadteri');
        $ujHelyszin->arkategoria = $request->input('arkategoria');
        $ujHelyszin->helyszin_kep_eleres = $request->input('helyszin_kep_eleres');

        $ujHelyszin->save();
        return response()->json(['üzenet'=>$ujHelyszin->id.' azonosítóval új helyszín lett létrehozva!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(helyszin $helyszin)
    {
        return response()->json($helyszin);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(helyszin $helyszin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatehelyszinRequest $request, helyszin $helyszin)
    {
        $tablaMezok = \Schema::getColumnListing($helyszin->getTable());

        $updateAdat = $request->only($tablaMezok);

        $helyszin->update($updateAdat);     

        return response()->json($helyszin);;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(helyszin $helyszin)
    {
        $helyszin->delete();
        return response()->json(['üzenet'=>$helyszin->id.' azonosítójú helyszín sikeresen törölve!']);
    }
}
