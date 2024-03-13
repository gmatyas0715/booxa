<?php

namespace App\Http\Controllers;

use App\Models\Eloado;
use App\Models\Esemeny;
use App\Http\Requests\StoreEsemenyRequest;
use App\Http\Requests\UpdateEsemenyRequest;
use App\Models\Cim;
use App\Models\Helyszin;
use App\Models\Mufaj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EsemenyController extends Controller
{    
    public function helyszinEloadoNevId(){
        $helyszinek = Helyszin::select(['id','nev'])->get();
        $eloadok = Eloado::select(['id','nev'])->get();

        return response()->json(['helyszinek'=>$helyszinek,'eloadok'=>$eloadok]);
    }

    public function index()
    {
        $esemenyek = Esemeny::select(['id','idopont','jegy_alapar','helyszin_id','eloado_id'])->get();
        return response()->json($esemenyek);
    }

    public function esemenyKereso(Request $request)
    {
        $eloado = "%";
        $helyszin = "%";
        $datum = "";
        $keresettTelepulesek = Cim::pluck('telepules');
        $keresettMufajok = Mufaj::pluck('nev');
        $minJegyar = 0;
        $maxJegyar = 60000;

        if ($request->has('eloado')){
            $eloado = '%'.$request->query('eloado').'%';
        }

        if ($request->has('helyszin')){
            $helyszin = '%'.$request->query('helyszin').'%';
        }

        if ($request->has('datum')){
            $datum = $request->query('datum');
        }

        if ($request->has('keresett-telepulesek')){
            $keresettTelepulesek = explode(',',$request->query('keresett-telepulesek'));
        }

        if ($request->has('keresett-mufajok')){
            $keresettMufajok = explode(',',$request->query('keresett-mufajok'));
        }

        if ($request->has('min-jegyar')){
            $minJegyar = $request->query('min-jegyar');
            $maxJegyar = $request->query('max-jegyar');
        }

        //$query = Esemeny::select('id', 'idopont', 'jegy_alapar', 'helyszin_id', 'eloado_id');

        $query = DB::table('esemeny')->select('esemeny.id as id', 'esemeny.idopont', 'esemeny.jegy_alapar','helyszin.nev as helyszin_nev','helyszin.helyszin_kep_eleres','eloado.nev as eloado_nev','eloado.kep_eleres')
                ->join('eloado','eloado.id','=','esemeny.eloado_id')
                ->join('helyszin','helyszin.id','=','esemeny.helyszin_id')
                ->join('cim','cim.id','=','helyszin.cim_id')
                ->join('eloado_mufaj','eloado.id','=','eloado_mufaj.eloado_id')
                ->join('mufaj','mufaj.id','=','eloado_mufaj.mufaj_id')
                ->where('eloado.nev','like',$eloado)
                ->where('helyszin.nev','like',$helyszin)
                ->whereIn('cim.telepules',$keresettTelepulesek)
                ->whereIn('mufaj.nev',$keresettMufajok)
                ->whereBetween('jegy_alapar',[$minJegyar,$maxJegyar]);
        
        if ($datum!="") {
            // Apply the date filter
            $query->whereDate('esemeny.idopont','=',$datum);
        }

        $esemenyek = $query->distinct()->get();

        return response()->json($esemenyek);
    }

    public function store(StoreEsemenyRequest $request)
    {
        $ujEsemeny = new Esemeny();
        $ujEsemeny->idopont = $request->input('idopont');
        $ujEsemeny->jegy_alapar = $this->getEsemenyJegyar($request->input('eloado_id'),$request->input('helyszin_id'));
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
        $esemeny->idopont = $request->input('idopont');
        $esemeny->jegy_alapar = $this->getEsemenyJegyar($request->input('eloado_id'),$request->input('helyszin_id'));
        $esemeny->eloado_id = $request->input('eloado_id');
        $esemeny->helyszin_id = $request->input('helyszin_id');
        $esemeny->save();
        return response()->json(['üzenet'=>$esemeny->id.' azonosítóval új esemény lett sikeresen létrehozva!']);
    }

    public function destroy(Esemeny $esemeny)
    {
        $esemeny->delete();
        return response()->json(['üzenet'=>$esemeny->id.' azonosítójú esemény sikeresen törölve!']);
    }

    public static function getEsemenyJegyar(int $eloadoId,int $helyszinId):int{
        $EGYSEG_JEGYAR = 4000;
        $eloadoArszorzo = Eloado::find($eloadoId)->arkategoria;
        $helyszinArszorzo = Helyszin::find($helyszinId)->arkategoria;
        $jegyAlapar = round($eloadoArszorzo*$helyszinArszorzo*$EGYSEG_JEGYAR/100)*100-1;

        return $jegyAlapar;
    }
}
