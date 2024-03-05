<?php

namespace App\Http\Controllers;

use App\Models\Cim;
use App\Http\Requests\StoreCimRequest;
use App\Http\Requests\UpdateCimRequest;
use Illuminate\Support\Facades\Schema;

class CimController extends Controller
{

    public function index()
    {
        $cimek = Cim::select(['id','iranyitoszam','telepules','kozterulet','hazszam'])->get();
        return response()->json($cimek);
    }

    public function helyszinCimek()
    {
        $cimek = Cim::whereHas('helyszin')->pluck('telepules')->toArray();
        return response()->json($cimek);
    }

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

    public function show(Cim $cim)
    {
        return response()->json($cim);
    }

    public function update(UpdateCimRequest $request, Cim $cim)
    {
        $cim->iranyitoszam = $request->iranyitoszam;
        $cim->telepules = $request->telepules;
        $cim->kozterulet = $request->kozterulet;
        $cim->hazszam = $request->hazszam;
        $cim->save();

        return response()->json($cim);
    }

    public function destroy(Cim $cim)
    {
        $cim->delete();
        return response()->json(['üzenet'=>$cim->id.' azonosítójú cím sikeresen törölve!']);
    }
}

