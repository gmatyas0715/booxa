<?php

namespace App\Http\Controllers;

use App\Models\JegyAdat;
use App\Models\Esemeny;
use App\Models\Rendeles;
use App\Models\SzektorAlegyseg;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
class JegyAdatController extends Controller
{
    public function jegyAdatLista(int $rendeles_id) {
        Log::info($rendeles_id);
        $jegyAdatLista = DB::table('jegy_adat')->select('jegy_adat.id as id','eloado.nev as eloadoNev','helyszin.nev as helyszinNev','szektor_nev as szektorNev','szektor_tipus as szektorTipus','sorjelzes','ulohely','szektor_alegyseg_ar as szektorAlegysegJegyar','kep_eleres as kepEleres','helyszin_kep_eleres as helyszinKepEleres')
        ->join('esemeny','esemeny.id','=','jegy_adat.esemeny_id')
        ->join('eloado','eloado.id','=','esemeny.eloado_id')
        ->join('rendeles','rendeles.id','=','jegy_adat.rendeles_id')
        ->join('helyszin','helyszin.id','=','jegy_adat.helyszin_id')
        ->join('szektor','szektor.id','=','jegy_adat.szektor_id')
        ->join('szektor_alegyseg','szektor_alegyseg.id','=','jegy_adat.szektor_alegyseg_id')
        ->join('szektor_alegyseg_jegyar', function ($join) {
            $join->on('szektor_alegyseg_jegyar.esemeny_id', '=', 'esemeny.id')
                 ->whereRaw('szektor_alegyseg_jegyar.id IN (SELECT MIN(id) FROM szektor_alegyseg_jegyar GROUP BY esemeny_id)');
        })
        ->where('jegy_adat.rendeles_id',$rendeles_id)
        ->distinct()
        ->get();
        Log::info($jegyAdatLista);
        return response()->json($jegyAdatLista);
    }

    public function jegyKosarbaHelyezes(Request $request, string $rendeles_id) {

        $jegyAdatok = $request->all();
        if ($rendeles_id!=0){
            foreach ($jegyAdatok as $jegyAdat) {
                $ujJegyAdat = new JegyAdat();
                $ujJegyAdat-> rendeles_id = $rendeles_id;
                $ujJegyAdat-> esemeny_id = $jegyAdat['esemeny_id'];
                $ujJegyAdat-> helyszin_id = $jegyAdat['helyszin_id'];
                $ujJegyAdat-> szektor_id = $jegyAdat['szektor_id'];
                $ujJegyAdat-> szektor_alegyseg_id = $jegyAdat['szektor_alegyseg_id'];
                $ujJegyAdat-> ulohely = $jegyAdat['ulohely'];
                $ujJegyAdat->save();
            }
        }

        else{
            $rendeles = new Rendeles();
            $rendeles->save();
            foreach ($jegyAdatok as $jegyAdat) {
                $ujJegyAdat = new JegyAdat();
                $ujJegyAdat-> rendeles_id = $rendeles->id;
                $ujJegyAdat-> esemeny_id = $jegyAdat['esemeny_id'];
                $ujJegyAdat-> helyszin_id = $jegyAdat['helyszin_id'];
                $ujJegyAdat-> szektor_id = $jegyAdat['szektor_id'];
                $ujJegyAdat-> szektor_alegyseg_id = $jegyAdat['szektor_alegyseg_id'];
                $ujJegyAdat-> ulohely = $jegyAdat['ulohely'];
                $ujJegyAdat -> save();
            }
            return response()->json(['rendeles_id'=>$rendeles->id]);
        }
    }

    public function destroy(int $jegyId)
    {
        $jegy_adat = JegyAdat::find($jegyId);
        $rendeles = $jegy_adat->rendeles;
        $jegy_adat->delete();
        if(!$rendeles->jegyAdat()->exists()){
            $rendeles->delete();
            return response()->json(['rendeles_torles'=>true]);
        }
        return response()->json(['rendeles_torles'=>false]);
    }
    
    public function szabadHelySzam(Request $request){
        
        $szektorAlegyseg = $request->input('szektor_alegyseg');
        $esemeny = $request->input('esemeny');
        $szektor_tipus = $request->input('szektor_tipus');
        $jegyAdatok = Esemeny::find($esemeny)->jegy_adat()->where('szektor_alegyseg_id',$szektorAlegyseg)->get();
        $kivalasztottSzektor = SzektorAlegyseg::find($szektorAlegyseg);

        if ($szektor_tipus=='allo'){
            return $kivalasztottSzektor->max_kapacitas-count($jegyAdatok); 
        }

        else if($szektor_tipus=='ulo'){
            $ulohelyLista = [];
            $szabadUlohelyLista = [];
            foreach ($jegyAdatok as $jegyAdat) {
                $ulohelyLista[] = $jegyAdat->ulohely;
            }
            for ($ulohely=1; $ulohely <= $kivalasztottSzektor->max_kapacitas ; $ulohely++) { 
                if (!in_array($ulohely,$ulohelyLista)){
                    $szabadUlohelyLista[] = $ulohely;
                }
            }
            return $szabadUlohelyLista;
        }
        return;
    }

    public function foglaltsagLekerdezes(Esemeny $esemeny) {

        $szektorAlegysegMap = array();
        $foglaltsagMap = array();

        $jegyAdatok = $esemeny->jegy_adat()->get();
        foreach ($jegyAdatok as $jegyAdat) {
            $szektorAlegysegId = $jegyAdat->szektor_alegyseg_id;
            if ($jegyAdat->ulohely!=null){
                if (!isset($szektorAlegysegMap[$szektorAlegysegId])) {
                    $szektorAlegysegMap[$jegyAdat->szektor_alegyseg_id] = [$jegyAdat->ulohely];
                }
                else{
                    $szektorAlegysegMap[$jegyAdat->szektor_alegyseg_id][] = $jegyAdat->ulohely;
                }
            }

            else {
                if (!isset($szektorAlegysegMap[$szektorAlegysegId])) {
                    $szektorAlegysegMap[$jegyAdat->szektor_alegyseg_id] = 1;
                }
                else{
                    $szektorAlegysegMap[$jegyAdat->szektor_alegyseg_id] += 1;
                }
            }
        }

        foreach ($szektorAlegysegMap as $szektorAlegyseg => $szektorAlegysegUlohelyek) {
            Log::info($szektorAlegyseg);
            $kapacitas = SzektorAlegyseg::find($szektorAlegyseg)->max_kapacitas;
            if (is_int($szektorAlegysegUlohelyek)){
                $foglaltsagMap[$szektorAlegyseg] = [$kapacitas-$szektorAlegysegUlohelyek>0,$szektorAlegysegUlohelyek];
            }

            else{
                $foglaltsagMap[$szektorAlegyseg] = [$kapacitas-count($szektorAlegysegUlohelyek)>0,$szektorAlegysegUlohelyek];
            }
        }
        return $foglaltsagMap;
    }
}
