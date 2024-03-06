<?php

namespace App\Http\Controllers;

use App\Models\Helyszin;
use App\Http\Requests\StoreHelyszinRequest;
use App\Http\Requests\UpdateHelyszinRequest;
use Illuminate\Support\Facades\File;

class HelyszinController extends Controller
{

    public function index()
    {
        $helyszinek = Helyszin::select(['id','nev','cim_id','kapacitas','arkategoria','helyszin_kep_eleres','svg_kep_eleres'])->get();
        return response()->json($helyszinek);
    }

    public function helyszinek()
    {
        $helyszinek = Helyszin::pluck('nev')->toArray();
        return response()->json($helyszinek);
    }

    public function store(StoreHelyszinRequest $request)
    {
        $ujHelyszin = new Helyszin();
        $ujHelyszin->nev = $request->input('nev');
        $ujHelyszin->cim_id = $request->input('cim_id');
        $ujHelyszin->kapacitas = $request->input('kapacitas');
        $ujHelyszin->arkategoria = $request->input('arkategoria');

        $file = $request->file('svg_file');
        $ujHelyszin->svg_kep_eleres = 'location'.(Helyszin::max('id')+1).'.svg';
        $file->move(public_path('svg_helyszin'),$ujHelyszin->svg_kep_eleres);


        if ($request->hasFile('kep_file')){
            $file = $request->file('kep_file');
            $kepType = $file->getClientMimeType();
            $fileFormat = explode('/', $kepType)[1];
            $ujHelyszin->helyszin_kep_eleres = 'location'.(Helyszin::max('id')+1).'.'.$fileFormat;
            $file->move(public_path('helyszin_kep'),$ujHelyszin->helyszin_kep_eleres);
        }
        
        else {
            $ujHelyszin->helyszin_kep_eleres = '_default.jpg';
        }

        $ujHelyszin->save();
        return response()->json(['üzenet'=>$ujHelyszin->id.' azonosítóval új helyszín lett létrehozva!']);
    }

    public function show(Helyszin $helyszin)
    {
        return response()->json($helyszin);
    }

    public function update(UpdateHelyszinRequest $request, Helyszin $helyszin)
    {
        $helyszinNev = $request->input('nev');
        $helyszinCimId = $request->input('cim_id');
        $helyszinKapacitas = $request->input('kapacitas');
        $helyszinArkategoria = $request->input('arkategoria');

        if ($helyszinNev == null || $helyszinCimId==null || $helyszinKapacitas==null || $helyszinArkategoria ==null){
            return response()->json('Hiányzó helyszínadatok!',400);
        }

        $helyszin->nev = $helyszinNev;
        $helyszin->cim_id = $helyszinCimId;
        $helyszin->kapacitas = $helyszinKapacitas;
        $helyszin->arkategoria = $helyszinArkategoria;

        if ($request->hasFile('svg_file')){
            $file = $request->file('svg_file');
            File::delete(public_path('svg_helyszin'),$helyszin->svg_kep_eleres);
            $file->move(public_path('svg_helyszin'),$helyszin->svg_kep_eleres);
        }

        if ($request->hasFile('kep_file')){
            $file = $request->file('kep_file');
            $kepType = $file->getClientMimeType();
            $fileFormat = explode('/', $kepType)[1];
            $helyszin->helyszin_kep_eleres = 'location'.$helyszin->id.'.'.$fileFormat;
            $file->move(public_path('helyszin_kep'),$helyszin->helyszin_kep_eleres);
        }

        $helyszin->save();
        return response()->json(['üzenet'=>$helyszin->id.' azonosítóval helyszín lett módosítva!']);
    }

    public function destroy(Helyszin $helyszin)
    {
        $helyszin->delete();
        return response()->json(['üzenet'=>$helyszin->id.' azonosítójú helyszín sikeresen törölve!']);
    }
}
