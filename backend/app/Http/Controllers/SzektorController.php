<?php

namespace App\Http\Controllers;

use App\Models\Szektor;
use App\Models\Esemeny;
use App\Http\Requests\StoreSzektorRequest;
use App\Http\Requests\UpdateSzektorRequest;

class SzektorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $szektorok = Szektor::with('szektor_alegyseg')->get();
        return response()->json($szektorok);
    }


    public function kivalasztottSzektorok(Esemeny $esemeny){

        $jegyAlapar = $esemeny->jegy_alapar;
        $szektorok = Szektor::query()
        ->whereHas('helyszin.esemeny', function ($query) use ($esemeny){
            $query->where('id', $esemeny->id);
        })
        ->get(['id','szektor_nev','szektor_tipus','helyszin_id']);

        $szektorok->load([
            'szektor_alegyseg' => function($query){
                $query->select('id','arszorzo','max_kapacitas','sorjelzes','szektor_id');
            }
        ]);

        $szektorok->each(function ($szektor) use ($jegyAlapar){
            $szektor->szektor_alegyseg->each(function ($szektorAlegyseg) use ($jegyAlapar){
                $szektorAlegyseg->szektor_alegyseg_jegyar = round($jegyAlapar * $szektorAlegyseg->arszorzo-$jegyAlapar * $szektorAlegyseg->arszorzo%100-1);
            });
        });

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Szektor $szektor)
    {

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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Szektor $szektor)
    {
        //
    }
}
