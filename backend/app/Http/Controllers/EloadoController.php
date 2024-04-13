<?php

namespace App\Http\Controllers;

use App\Models\Eloado;
use App\Http\Requests\StoreEloadoRequest;
use App\Http\Requests\UpdateEloadoRequest;
use Illuminate\Support\Facades\File;

class EloadoController extends Controller
{
    public function index()
    {
        $eloadok = Eloado::select('id','nev','leiras','arkategoria','kep_eleres',)->with(['mufaj'=>function ($query){
            $query->select('mufaj.id','mufaj.nev');
        }])->get();
        return response()->json($eloadok);
    }

    public function eloadoNevek()
    {
        $eloadok = Eloado::pluck('nev')->toArray();
        return response()->json($eloadok);
    }

    public function store(StoreEloadoRequest $request)
    {
        $eloadoNev =  $request->input('nev');
        $eloadoLeiras =  $request->input('leiras');
        $eloadoArKategoria =  $request->input('arkategoria');

        if ($eloadoNev==null || $eloadoLeiras==null || $eloadoArKategoria==null){
            return response()->json('Hiányzó előadóadatok!',400);
        }

        $ujEloado = new Eloado();
        $ujEloado->nev = $eloadoNev;
        $ujEloado->leiras = $eloadoLeiras;
        $ujEloado->arkategoria = $eloadoArKategoria;

        if ($request->hasFile('file')){
            $file = $request->file('file');
            $kepEleres = $file->getClientOriginalName();
            $ujEloado->kep_eleres = $kepEleres;
            $file->move(public_path('egyuttes_kepek'),$kepEleres);
        }
        
        else {
            $ujEloado->kep_eleres = '_default.jpg';
        }

        $ujEloado->save();
        $ujEloadoId = $ujEloado->id;

        EloadoMufajController::kapcsolatBeszuras($ujEloadoId,$request->input('mufajok'));

        return response()->json(['üzenet' => $ujEloado->nev.' nevű előadó sikeresen létrehozva!']);
    }

    public function show(Eloado $eloado)
    {
        return response()->json($eloado);
    }

    public function update(UpdateEloadoRequest $request, Eloado $eloado)
    {
        $eloadoNev =  $request->input('nev');
        $eloadoLeiras =  $request->input('leiras');
        $eloadoArKategoria =  $request->input('arkategoria');

        if ($eloadoNev == null || $eloadoLeiras==null || $eloadoArKategoria==null){
            return response()->json('Hiányzó előadóadatok!',400);
        }

        $eloado->nev = $eloadoNev;
        $eloado->leiras = $eloadoLeiras;
        $eloado->arkategoria = $eloadoArKategoria;

        if ($request->hasFile('file')){
            $file = $request->file('file');
            $kepEleres = $file->getClientOriginalName();
            File::delete(public_path('egyuttes_kepek/'.$eloado->kep_eleres));
            $file->move(public_path('egyuttes_kepek'),$kepEleres);
            $eloado->kep_eleres = $kepEleres;
        }

        $mufajok = $request->input('mufajok');
        EloadoMufajController::kapcsolatEltavolitas($eloado->id);
        EloadoMufajController::kapcsolatBeszuras($eloado->id,$mufajok);

        $eloado->save();

        return response()->json($eloado);
    }

    public function destroy(Eloado $eloado)
    {
        $eloado->delete();
        return response()->json(['üzenet'=>$eloado->nev.' nevű előadó sikeresen törölve!']);
    }

    public function random10Eloado(){
        $eloadok = Eloado::with('mufaj')->inRandomOrder()->limit(10)->get();
        return response()->json($eloadok);
    }
}
