<?php

namespace App\Http\Controllers;

use App\Models\cim;
use App\Http\Requests\StorecimRequest;
use App\Http\Requests\UpdatecimRequest;

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
    public function store(StorecimRequest $request)
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
    public function show(cim $cim)
    {
        return response()->json($cim);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(cim $cim)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecimRequest $request, cim $cim)
    {
        $tablaMezok = \Schema::getColumnListing($cim->getTable());

        $updateAdat = $request->only($tablaMezok);

        $cim->update($updateAdat);     

        return response()->json($cim);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(cim $cim)
    {
        $cim->delete();
        return response()->json(['üzenet'=>$cim->id.' azonosítójú cím sikeresen törölve!']);
    }
}

