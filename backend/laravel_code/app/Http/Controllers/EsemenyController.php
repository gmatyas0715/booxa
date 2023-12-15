<?php

namespace App\Http\Controllers;

use App\Models\Esemeny;
use App\Http\Requests\StoreEsemenyRequest;
use App\Http\Requests\UpdateEsemenyRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

class EsemenyController extends Controller
{

    public function index()
    {
        $esemenyek = Esemeny::all();
        return response()->json($esemenyek);
    }

    public function esemenyKereso(Request $request)
    {
        $eloado = $request->query('eloado');
        $helyszin = $request->query('helyszin');

        $query = Esemeny::select('id', 'idopont', 'jegy_alapar', 'helyszin_id', 'eloado_id');

        // Check if $eloado is not empty, then add the eloado condition
        if ($eloado !== null) {
            $query->whereHas('eloado', function ($subquery) use ($eloado) {
                $subquery->where('nev', $eloado);
            });
        }

        // Check if $helyszin is not empty, then add the helyszin condition
        if ($helyszin !== null) {
            $query->whereHas('helyszin', function ($subquery) use ($helyszin) {
                $subquery->where('nev', $helyszin);
            });
        }
        
        $query->with([
            'helyszin' => function ($query) {
                $query->select('id', 'nev','helyszin_kep_eleres','svg_kep_eleres');
            },
            'eloado' => function ($query) {
                $query->select('id','nev','leiras','kep_eleres');
            },
        ]);
        $esemenyek = $query->get();
        
        Log::info($esemenyek);

        return response()->json($esemenyek);
    }

    public function store(StoreEsemenyRequest $request)
    {
        $ujEsemeny = new Esemeny();
        $ujEsemeny->idopont = $request->input('idopont');
        $ujEsemeny->jegy_alapar = $request->input('jegy_alapar');
        $ujEsemeny->eloado_id = $request->input('eloado_id');
        $ujEsemeny->helyszin_id = $request->input('helyszin_id');
        $ujEsemeny->save();
        return response()->json(['üzenet'=>$ujEsemeny->id.' azonosítóval új esemény lett sikeresen létrehozva!']);
    }

    public function show(Esemeny $esemeny)
    {
        return response()->json($esemeny);
    }

    function update(UpdateEsemenyRequest $request, Esemeny $esemeny)
    {
        $tablaMezok = Schema::getColumnListing($esemeny->getTable());

        $updateAdat = $request->only($tablaMezok);

        $esemeny->update($updateAdat);     

        return response()->json($esemeny);
    }

    public function destroy(Esemeny $esemeny)
    {
        $esemeny->delete();
        return response()->json(['üzenet'=>$esemeny->id.' azonosítójú esemény sikeresen törölve!']);
    }
}
