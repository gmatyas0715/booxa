<?php

namespace App\Http\Controllers;

use App\Models\Cim;
use App\Http\Requests\StoreCimRequest;
use App\Http\Requests\UpdateCimRequest;

class CimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cimek = Cim::all();
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
    public function store(StoreCimRequest $request)
    {
        $ujCim = new Cim();
        $ujCim->iranyitoszam = $request->input('iranyitoszam');
        $ujCim->telepules = $request->input('telepules');
        $ujCim->kozterulet = $request->input('kozterulet');
        $ujCim->hazszam = $request->input('hazszam');
        $ujCim->save();

        return response()->json(['üzenet' => $ujCim->id.' azonosítójú cím sikeresen létrehozva!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cim $cim)
    {
        return response()->json($cim);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cim $cim)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCimRequest $request, Cim $cim)
    {
        $tablaMezok = \Schema::getColumnListing($cim->getTable());

        $updateAdat = $request->only($tablaMezok);

        $cim->update($updateAdat);     

        return response()->json($cim);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cim $cim)
    {
        $cim->delete();
        return response()->json(['üzenet'=>$cim->id.' azonosítójú cím sikeresen törölve!']);
    }
}

