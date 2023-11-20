<?php

namespace App\Http\Controllers;

use App\Models\helyszin;
use App\Http\Requests\StorehelyszinRequest;
use App\Http\Requests\UpdatehelyszinRequest;
use Illuminate\Http\Request;

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
    public function create(Request $request)
    {
        $ujHelyszin = new Helyszin();
        $ujHelyszin->id = $request->input('id');
        $ujHelyszin->nev = $request->input('nev');
        $ujHelyszin->cim_id = $request->input('cim_id');
        $ujHelyszin->kapacitas = $request->input('kapacitas');
        $ujHelyszin->kontakt_informacio = $request->input('kontakt_informacio');
        $ujHelyszin->szabadteri = $request->input('szabadteri');
        $ujHelyszin->helyszin_kep_eleres = $request->input('helyszin_kep_eleres');


        $ujHelyszin->save();
        return response()->json(['üzenet'=>'Új helyszín létrehozva']);
    }   

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorehelyszinRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        if(!helyszin::find($id)){
            return response()->json(['üzenet'=>'Az adott id-val rendelkező helyszín nem létezik']);
        }

        return response()->json(helyszin::find($id));
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
        //
    }

    public function updateHelyszin(Request $request, $id)
    {
        if(!helyszin::find($id)){
            return response()->json(['üzenet'=>'A megadott id-val rendelkező helyszín nem létezik!']);
        }
        $id = $request->input('id');
        $nev = $request->input('nev');
        $cim_id = $request->input('cim_id');
        $kapacitas = $request->input('kapacitas');
        $kontaktInformacio = $request->input('kontakt_informacio');
        $szabadteri = $request->input('szabadteri');
        $helyszinKepEleres = $request->input('helyszin_kep_eleres');
        helyszin::where('id',$id)->update([
            'id'=>$id,
            'nev'=>$nev,
            'cim_id'=>$cim_id,
            'kapacitas'=>$kapacitas,
            'kontakt_informacio'=>$kontaktInformacio,
            'szabadteri'=> $szabadteri,
            'helyszin_kep_eleres'=>$helyszinKepEleres
        ]);

        return response()->json(['üzenet'=>'Helyszín sikeresen frissítve!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(helyszin $helyszin)
    {
        //
    }

    public function destroyHelyszin($id)
    {
        $helyszinTorol = Helyszin::find($id);

        if(!$helyszinTorol){
            return response()->json(['üzenet'=>'A megadott id-val rendelkező helyszín nem található!']);
        }

        $helyszinTorol->delete();
        return response()->json(['üzenet'=>'A(z) '.$helyszinTorol->nev.' nevű helyszín sikeresen törölve!']);
    }
}
