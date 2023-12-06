<?php

namespace App\Http\Controllers;

use App\Models\JegyAdat;
use App\Http\Requests\StoreJegyAdatRequest;
use App\Http\Requests\UpdateJegyAdatRequest;

class JegyAdatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jegyAdatok = JegyAdat::all();
        return response()->json($jegyAdatok);
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
    public function store(StoreJegyAdatRequest $request)
    {
        $ujJegyAdat = new JegyAdat();
        $ujJegyAdat->esemeny_id = $request->input('esemeny_id');
        $ujJegyAdat->helyszin_id = $request->input('helyszin_id');
        $ujJegyAdat->rendeles_id = $request->input('rendeles_id');
        $ujJegyAdat->szektor = $request->input('szektor');
        $ujJegyAdat->sorjelzes = $request->input('sorjelzes');
        $ujJegyAdat->ulohely = $request->input('ulohely');
        $ujJegyAdat->save();

        return response()->json(['üzenet' => $ujJegyAdat->id.' azonosítójú jegyadat sikeresen létrehozva!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(JegyAdat $jegy_adat)
    {
        return response()->json($jegy_adat);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JegyAdat $jegy_adat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJegyAdatRequest $request, JegyAdat $jegy_adat)
    {
        $tablaMezok = \Schema::getColumnListing($jegy_adat->getTable());

        $updateAdat = $request->only($tablaMezok);

        $jegy_adat->update($updateAdat);     

        return response()->json($jegy_adat);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JegyAdat $jegy_adat)
    {
        $jegy_adat->delete();
        return response()->json(['üzenet'=>$jegy_adat->id.' azonosítójú jegy adat sikeresen törölve!']);
    }
}
