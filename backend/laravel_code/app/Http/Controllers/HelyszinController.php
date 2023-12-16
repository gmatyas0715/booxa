<?php

namespace App\Http\Controllers;

use App\Models\Helyszin;
use App\Models\Cim;
use App\Http\Requests\StoreHelyszinRequest;
use App\Http\Requests\UpdateHelyszinRequest;
use Illuminate\Support\Facades\Schema;

class HelyszinController extends Controller
{

    public function index()
    {
        $helyszinek = Helyszin::all();
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
        $ujHelyszin->id = $request->input('id');
        $ujHelyszin->nev = $request->input('nev');
        $ujHelyszin->cim_id = $request->input('cim_id');
        $ujHelyszin->kapacitas = $request->input('kapacitas');
        $ujHelyszin->kontakt_informacio = $request->input('kontakt_informacio');
        $ujHelyszin->szabadteri = $request->input('szabadteri');
        $ujHelyszin->arkategoria = $request->input('arkategoria');
        $ujHelyszin->helyszin_kep_eleres = $request->input('helyszin_kep_eleres');
        $ujHelyszin->svg_kep_eleres = $request->input('svg_kep_eleres');

        $ujHelyszin->save();
        return response()->json(['üzenet'=>$ujHelyszin->id.' azonosítóval új helyszín lett létrehozva!']);
    }

    public function show(Helyszin $helyszin)
    {
        return response()->json($helyszin);
    }

    public function update(UpdateHelyszinRequest $request, Helyszin $helyszin)
    {
        $tablaMezok = Schema::getColumnListing($helyszin->getTable());

        $updateAdat = $request->only($tablaMezok);

        $helyszin->update($updateAdat);     

        return response()->json($helyszin);;
    }

    public function destroy(Helyszin $helyszin)
    {
        $helyszin->delete();
        return response()->json(['üzenet'=>$helyszin->id.' azonosítójú helyszín sikeresen törölve!']);
    }
}
