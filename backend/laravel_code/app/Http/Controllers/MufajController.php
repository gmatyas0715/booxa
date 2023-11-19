<?php

namespace App\Http\Controllers;

use App\Models\mufaj;
use App\Http\Requests\StoremufajRequest;
use App\Http\Requests\UpdatemufajRequest;
use Illuminate\Http\Request;

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
    public function create(Request $request)
    {
        $ujMufaj = new Mufaj();
        $ujMufaj->nev = $request->input('nev');
        $ujMufaj->leiras = $request->input('leiras');
        $ujMufaj->save();
        return response()->json(['üzenet'=>$ujMufaj->nev.' nevű műfaj sikeresen hozzáadva!']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoremufajRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(mufaj $mufaj)
    {
        if(!$mufaj){
            return response()->json(['üzenet'=>'Az adott id-val rendelkező műfaj nem létezik']);
        }

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
        //
    }

    public function updateMufaj(Request $request,$id){

        $nev = $request->input('nev');
        $leiras = $request->input('leiras');
        $modositandoMufaj = mufaj::where('id',$id)->update([
            'nev' => $nev,
            'leiras' => $leiras
        ]);
        if($modositandoMufaj===0){
            return response()->json(['üzenet'=>$id.' azonosító nem létezik!']);
        }

        return response()->json(['üzenet'=>$id.' azonosítójú műfaj sikeresen frissítve!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(mufaj $mufaj)
    {
        //
    }

    public function destroyMufaj($id)
    {
        $mufajTorol = Mufaj::find($id);

        if(!$mufajTorol){
            return response()->json(['üzenet'=>'A megadott id-val rendelkező műfaj nem található!']);
        }

        $mufajTorol->delete();
        return response()->json(['üzenet'=>'Műfaj sikeresen törölve!']);
    }
}
