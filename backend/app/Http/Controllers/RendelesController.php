<?php

namespace App\Http\Controllers;

use App\Models\Rendeles;
use App\Models\SzektorAlegysegAr;
use App\Models\Cim;
use App\Http\Requests\StoreRendelesRequest;
use App\Http\Requests\UpdateRendelesRequest;
use App\Mail\RendelesElkuldese;
use App\Models\Fizetes;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class RendelesController extends Controller
{

    public function index()
    {
        $rendelesek = Rendeles::all();
        return response()->json($rendelesek);
    }

    public function store(StoreRendelesRequest $request)
    {   
        $rendelesOsszeg = 390;
        $jegyAdatok = $request->input('jegyAdatok');
        Log::info($request);

        /*$userId = DB::table('oauth_access_tokens')->where('id', $request->userToken)
        ->first();*/

        /*$userId = DB::select('select * from personal_access_tokens where token = :token',['token'=>$request->userToken]);
        */
        $userId = $request->user();
        //Log::info($userId);

        foreach ($request->$jegyAdatok as $jegyAdat) {
            $jegyAdatUlohelyek = $jegyAdat['ulo_helyek'];
            $szektorAr = SzektorAlegysegAr::where('esemeny_id',$jegyAdat['esemeny_id'])->where('szektor_alegyseg_id',$jegyAdat['szektor_alegyseg_id'])->value('szektor_alegyseg_ar');
            Log::info($szektorAr);
            for ($i=0; $i< count($jegyAdatUlohelyek); $i++) { 
                $rendelesOsszeg+=$szektorAr;
            }
        }
        Log::info($rendelesOsszeg);

        $rendelesCim = new Cim();
        $rendelesCim->iranyitoszam = $request->input('szamlazasAdat')['iranyitoszam'];
        $rendelesCim->telepules = $request->input('szamlazasAdat')['telepules'];
        $rendelesCim->kozterulet = $request->input('szamlazasAdat')['kozterulet'];
        $rendelesCim->hazszam = $request->input('szamlazasAdat')['hazszam'];
        $rendelesCim->save();
        Log::info($rendelesCim);

        $fizetes = new Fizetes();
        $fizetes->fizetes_osszeg = $rendelesOsszeg;
        $fizetes->fizetes_tipusa = 'bankkartya';
        $fizetes->szamlazasi_cim_id = $rendelesCim->id;
        $fizetes->save();
        Log::info($fizetes);

        $rendeles = new Rendeles();
        $rendeles->user_id = 1;
        $rendeles->vezeteknev = $request->input('szamlazasAdat')['vezeteknev'];
        $rendeles->keresztnev = $request->input('szamlazasAdat')['keresztnev'];
        $rendeles->email = $request->input('szamlazasAdat')['email'];
        $rendeles->fizetes_id = $fizetes->id;
        $rendeles->save();
        Log::info($rendeles);

        //Mail::to('matyasgombocz@gmail.com')->send(new RendelesElkuldese());

        return response()->json(['üzenet' => $rendeles->id.' azonosítójú rendelés sikeresen leadva!']);
    }


    public function show(Rendeles $rendeles)
    {
        return response()->json($rendeles);
    }

    public function update(UpdateRendelesRequest $request, Rendeles $rendeles)
    {
        $tablaMezok = Schema::getColumnListing($rendeles->getTable());

        $updateAdat = $request->only($tablaMezok);

        $rendeles->update($updateAdat);     

        return response()->json($rendeles);
    }

    public function destroy(Rendeles $rendeles)
    {
        $rendeles->delete();
        return response()->json(['üzenet'=>$rendeles->id.' azonosítójú rendelés sikeresen törölve!']);
    }
}
