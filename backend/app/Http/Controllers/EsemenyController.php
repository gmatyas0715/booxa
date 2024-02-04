<?php

namespace App\Http\Controllers;

use App\Models\Esemeny;
use App\Http\Requests\StoreEsemenyRequest;
use App\Http\Requests\UpdateEsemenyRequest;
use App\Models\Cim;
use App\Models\Mufaj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class EsemenyController extends Controller
{

    public function index()
    {
        $esemenyek = Esemeny::all();
        return response()->json($esemenyek);
    }

    public function esemenyKereso(Request $request)
    {
        $eloado = "";
        $helyszin = "";
        $datum = "";
        $keresettTelepulesek = Cim::pluck('telepules');
        Log::info($keresettTelepulesek);
        $keresettMufajok = Mufaj::pluck('nev');
        Log::info($keresettMufajok);
        $minJegyar = 0;
        $maxJegyar = 60000;

        if ($request->has('eloado')){
            $eloado = $request->query('eloado');
            Log::info($eloado);
        }

        if ($request->has('helyszin')){
            $helyszin = $request->query('helyszin');
            Log::info($helyszin);
        }

        if ($request->has('datum')){
            $datum = $request->query('datum');
            Log::info($datum);
        }

        if ($request->has('keresett-telepulesek')){
            $keresettTelepulesek = explode(',',$request->query('keresett-telepulesek'));
            Log::info($keresettTelepulesek);
        }

        if ($request->has('keresett-mufajok')){
            $keresettMufajok = explode(',',$request->query('keresett-mufajok'));
            Log::info($keresettMufajok);
        }

        if ($request->has('min-jegyar')){
            $minJegyar = $request->query('min-jegyar');
            Log::info($minJegyar);
            $maxJegyar = $request->query('max-jegyar');
            Log::info($maxJegyar);
        }

        //$query = Esemeny::select('id', 'idopont', 'jegy_alapar', 'helyszin_id', 'eloado_id');

        $query = DB::table('esemeny')->select('esemeny.id as id', 'esemeny.idopont', 'esemeny.jegy_alapar','helyszin.nev as helyszin_nev','helyszin.helyszin_kep_eleres','eloado.nev as eloado_nev','eloado.kep_eleres')
                ->join('eloado','eloado.id','=','eloado_id')
                ->join('helyszin','helyszin.id','=','helyszin_id')
                ->join('cim','cim.id','=','cim_id')
                ->join('eloado_mufaj','eloado.id','=','eloado_mufaj.eloado_id')
                ->join('mufaj','mufaj.id','=','eloado_mufaj.mufaj_id')
                ->where('eloado.nev','like','%'.$eloado.'%')
                ->where('helyszin.nev','like','%'.$helyszin.'%')
                ->whereIn('cim.telepules',$keresettTelepulesek)
                ->whereIn('mufaj.nev',$keresettMufajok)
                ->whereBetween('jegy_alapar',[$minJegyar,$maxJegyar]);

        if ($datum!=="") {
            // Apply the date filter
            $query->whereDate('esemeny.idopont','=',$datum);
        }

        return response()->json($query->get());
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
        $esemenyToReturn = Esemeny::with([
            'helyszin' => function ($query) {
                $query->select('id', 'nev','helyszin_kep_eleres','svg_kep_eleres');
            },
            'eloado' => function ($query) {
                $query->select('id','nev','leiras','kep_eleres');
            },
        ])->find($esemeny->id, ['id', 'idopont', 'jegy_alapar', 'helyszin_id', 'eloado_id']);

        return response()->json($esemenyToReturn);
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
