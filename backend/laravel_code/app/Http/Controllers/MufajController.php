<?php

namespace App\Http\Controllers;

use App\Models\mufaj;
use App\Http\Requests\StoremufajRequest;
use App\Http\Requests\UpdatemufajRequest;

class MufajController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mufajok = Mufaj::all();
        return response()->json($mufajok);
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
    public function store(StoremufajRequest $request)
    {
        $ujMufaj = new Mufaj();
        $ujMufaj->nev = $request->input('nev');
        $ujMufaj->leiras = $request->input('leiras');
        $ujMufaj->save();
        return response()->json(['üzenet'=>$ujMufaj->id.' azonosítóval új műfaj lett létrehozva!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(mufaj $mufaj)
    {
        return response()->json($mufaj);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(mufaj $mufaj)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatemufajRequest $request, mufaj $mufaj)
    {
        $mufaj->nev = $request->input('nev');
        $mufaj->leiras = $request->input('leiras');

        return response()->json(['üzenet'=>$mufaj->id.' azonosítójú műfaj sikeresen frissítve!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(mufaj $mufaj)
    {
        $mufaj->delete();
        return response()->json(['üzenet'=>$mufaj->id.' azonosítójú műfaj sikeresen törölve!']);
    }
}
