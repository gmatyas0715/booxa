<?php

namespace App\Http\Controllers;

use App\Models\Fizetes;
use App\Http\Requests\StoreFizetesRequest;
use App\Http\Requests\UpdateFizetesRequest;

class FizetesController extends Controller
{

    public function index()
    {
        $fizetesek = Fizetes::all();
        return response()->json($fizetesek);
    }

    public function store(StoreFizetesRequest $request)
    {
        $ujFizetes = new Fizetes();
        $ujFizetes->fizetes_idopont = $request->input('fizetes_idopont');
        $ujFizetes->fizetes_osszeg = $request->input('fizetes_osszeg');
        $ujFizetes->fizetes_tipusa = $request->input('fizetes_tipusa');
        $ujFizetes->szamlazasi_cim_id = $request->input('szamlazasi_cim_id');
        $ujFizetes->save();

        return response()->json(['üzenet' => $ujFizetes->id.' azonosítójú fizetés sikeresen létrehozva!']);
    }

    public function show(Fizetes $fizetes)
    {
        return response()->json($fizetes);
    }

    public function update(UpdateFizetesRequest $request, Fizetes $fizetes)
    {
        $tablaMezok = \Schema::getColumnListing($fizetes->getTable());

        $updateAdat = $request->only($tablaMezok);

        $fizetes->update($updateAdat);     

        return response()->json($fizetes);
    }

    public function destroy(Fizetes $fizetes)
    {
        $fizetes->delete();
        return response()->json(['üzenet'=>$fizetes->id.' azonosítójú cím sikeresen törölve!']);
    }
}
