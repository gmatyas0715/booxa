<?php

namespace App\Http\Controllers;

use App\Models\SzektorCsoport;
use App\Models\Esemeny;
use App\Http\Requests\StoreSzektorCsoportRequest;
use App\Http\Requests\UpdateSzektorCsoportRequest;

class SzektorCsoportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $szektorcsoportok = SzektorCsoport::with('szektor')->get();
        return response()->json($szektorcsoportok);
    }


    public function kivalasztottSzektorCsoportok(Esemeny $esemeny){

        $jegyAlapar = $esemeny->jegy_alapar;
        $szektorCsoportok = SzektorCsoport::query()
        ->whereHas('helyszin.esemeny', function ($query) use ($esemeny){
            $query->where('id', $esemeny->id);
        })
        ->get(['id','szektor_csoport_nev','szektor_tipus','helyszin_id']);

        $szektorCsoportok->load([
            'szektor' => function($query){
                $query->select('id','arszorzo','max_kapacitas','sorjelzes','szektor_csoport_id');
            }
        ]);

        $szektorCsoportok->each(function ($szektorCsoport) use ($jegyAlapar){
            $szektorCsoport->szektor->each(function ($szektor) use ($jegyAlapar){
                $szektor->szektor_jegyar = round($jegyAlapar * $szektor->arszorzo-$jegyAlapar * $szektor->arszorzo%100-1);
            });
        });

    return response()->json($szektorCsoportok);
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
    public function store(StoreSzektorCsoportRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SzektorCsoport $szektorcsoport)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SzektorCsoport $szektorcsoport)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSzektorCsoportRequest $request, SzektorCsoport $szektorcsoport)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SzektorCsoport $szektorcsoport)
    {
        //
    }
}
