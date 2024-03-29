<?php

namespace App\Http\Controllers;

use App\Models\JegyAdat;
use App\Http\Requests\StoreJegyAdatRequest;
use App\Http\Requests\UpdateJegyAdatRequest;
use App\Models\Esemeny;
use App\Models\Rendeles;
use App\Models\Szektor;
use App\Models\SzektorAlegyseg;
use App\Models\SzektorAlegysegAr;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Barryvdh\DomPDF\Facade\PDF;
class JegyAdatController extends Controller
{

    public function index()
    {
        $jegyAdatok = JegyAdat::all();
        return response()->json($jegyAdatok);
    }

    public function store(StoreJegyAdatRequest $request)
    {
        $ujJegyAdat = new JegyAdat();
        $ujJegyAdat->esemeny_id = $request->input('esemeny_id');
        $ujJegyAdat->helyszin_id = $request->input('helyszin_id');
        $ujJegyAdat->rendeles_id = $request->input('rendeles_id');
        $ujJegyAdat->szektor = $request->input('szektor');
        $ujJegyAdat->sorjelzes = $request->input('sorjelzes');
        $ujJegyAdat->ulohely = $request->input('ulohely');
        $ujJegyAdat->save();

        return response()->json(['üzenet' => $ujJegyAdat->id.' azonosítójú jegyadat sikeresen létrehozva!']);
    }

    public function show(JegyAdat $jegy_adat)
    {
        return response()->json($jegy_adat);
    }

    public function update(UpdateJegyAdatRequest $request, JegyAdat $jegy_adat)
    {
        $tablaMezok = Schema::getColumnListing($jegy_adat->getTable());

        $updateAdat = $request->only($tablaMezok);

        $jegy_adat->update($updateAdat);     

        return response()->json($jegy_adat);
    }

    public function destroy(JegyAdat $jegy_adat)
    {
        $jegy_adat->delete();
        return response()->json(['üzenet'=>$jegy_adat->id.' azonosítójú jegy adat sikeresen törölve!']);
    }
        
    public function szektorFoglaltsag(Esemeny $esemeny)
    {
        $jegyMap = new Collection(); 
        $jegyAdatok = JegyAdat::whereHas('esemeny',function ($query) use ($esemeny){
            $query->where('esemeny_id',$esemeny);
        })->get();

        foreach($jegyAdatok as $jegyadat)
        {
            if (!$jegyMap.hasKey($jegyadat->szektor_alegyseg->max_kapacitas)){
                $jegyMap->put($jegyadat->szektor_alegyseg->max_kapacitas,1);
            }
            else{
                $jegyMap->put($jegyadat->szektor_alegyseg->max_kapacitas,$jegyMap->get($jegyadat->szektor_alegyseg->max_kapacitas) + 1);
            }
        }
        return response()->json([$jegyAdatok]);
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

    public static function pdfJegyGeneralas(Rendeles $rendeles) {

        $jegyAdatok = $rendeles->jegyAdat;
        $jegyek = [];
        $rendeles_id = $rendeles->id;

        foreach ($jegyAdatok as $jegy) {
            $esemeny = Esemeny::find($jegy->esemeny_id);
            $cim = $esemeny->helyszin->cim->first();            

            $jegyPrint = [
                'idopont' => $esemeny->idopont,
                'eloado' => $esemeny->eloado->nev,
                'helyszin' => $esemeny->helyszin->nev,
                'helyszin_cim' => $cim->iranyitoszam.', '.$cim->telepules.' '.$cim->kozterulet.' '.$cim->hazszam,
                'szektor' => Szektor::find($jegy->szektor_id)->szektor_nev,
                'sor' => SzektorAlegyseg::find($jegy->szektor_alegyseg_id)->sorjelzes,
                'ulohely' => $jegy->ulohely,
                'jegyar' => SzektorAlegysegAr::where('esemeny_id',$jegy->esemeny_id)->where('szektor_alegyseg_id',$jegy->szektor_alegyseg_id)->first()->szektor_alegyseg_ar
            ];
            $jegyek[] = $jegyPrint;
        }

        $pdf = PDF::loadView('jegy',['jegyek' => $jegyek,'rendeles_id' => $rendeles_id]);

        return $pdf;
    }

    public static function pdfSzamlaGeneralas(Rendeles $rendeles) {

        $jegyAdatok = $rendeles->jegyAdat;
        $jegyek = [];
        $cim = $rendeles->szamlazasi_cim;  
        $teljesCim = $cim->iranyitoszam.', '.$cim->telepules.' '.$cim->kozterulet.' '.$cim->hazszam;

        foreach ($jegyAdatok as $jegy) {
            $esemeny = Esemeny::find($jegy->esemeny_id);

            $jegyView = [
                'idopont' => $esemeny->idopont,
                'eloado' => $esemeny->eloado->nev,
                'helyszin' => $esemeny->helyszin->nev,
                'jegyar' => SzektorAlegysegAr::where('esemeny_id',$jegy->esemeny_id)->where('szektor_alegyseg_id',$jegy->szektor_alegyseg_id)->first()->szektor_alegyseg_ar
            ];
            $jegyek[] = $jegyView;
        }

        $pdf = PDF::loadView('szamla',['jegyek' => $jegyek,'rendeles' => $rendeles,'teljes_cim'=>$teljesCim]);

        return $pdf;
    }

    public function pdfJegyLetoltes(Rendeles $rendeles) {
        $pdf = $this->pdfJegyGeneralas($rendeles);
        return $pdf->stream('jegy.pdf');
    }

    public function pdfSzamlaLetoltes(Rendeles $rendeles) {
        $pdf = $this->pdfSzamlaGeneralas($rendeles);
        return $pdf->stream('szamla.pdf');
    }
}
