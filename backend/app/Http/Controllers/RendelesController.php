<?php

namespace App\Http\Controllers;

use App\Models\Rendeles;
use App\Models\SzektorAlegysegAr;
use App\Models\Cim;
use App\Http\Requests\StoreRendelesRequest;
use App\Http\Requests\UpdateRendelesRequest;
use App\Models\Esemeny;
use App\Models\Fizetes;
use App\Models\JegyAdat;
use App\Models\Szektor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

class RendelesController extends Controller
{

    public function index()
    {
        $rendelesek = Rendeles::all();
        return response()->json($rendelesek);
    }

    public function checkout(Request $request){

        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $user = $request->user();

        $rendeles = new Rendeles();
        $rendeles->user_id = $user->id;
        $rendeles->vezeteknev = $user->vezeteknev;
        $rendeles->keresztnev = $user->keresztnev;
        $rendeles->email = $user->email;
        $rendeles->status = 'nem kifizetett';
        $rendeles->save();

        $rendelesOsszeg = 0;
        $jegyAdatok = json_decode($request->input('jegyAdatok'));
        $szamlazasAdatok = $request->input('szamlazasAdatok');

        $lineItems = [];
        foreach ($jegyAdatok as $jegyAdat) {
            
            $esemeny = Esemeny::find($jegyAdat->esemeny_id);
            $szektor = Szektor::find($jegyAdat->szektor_id);

            $szektorAr = SzektorAlegysegAr::where('esemeny_id',$jegyAdat->esemeny_id)->where('szektor_alegyseg_id',$jegyAdat->szektor_alegyseg_id)->value('szektor_alegyseg_ar');

            $ujJegyAdat = new JegyAdat();
            $ujJegyAdat->esemeny_id = $jegyAdat->esemeny_id;
            $ujJegyAdat->helyszin_id = $esemeny->helyszin_id;
            $ujJegyAdat->rendeles_id = $rendeles->id;
            $ujJegyAdat->szektor_id = $jegyAdat->szektor_id;
            $ujJegyAdat->szektor_alegyseg_id = $jegyAdat->szektor_alegyseg_id;
            $ujJegyAdat->ulohely = $jegyAdat->ulo_hely; 

            $ujJegyAdat ->save();

            $rendelesOsszeg+=$szektorAr;

            $lineItems[] =  [
            'price_data' => [
                'currency' => 'huf',
                'product_data' => [
                    'name' => $esemeny->eloado->nev,
                    'description' => $esemeny->helyszin->nev.' '.$szektor->szektor_nev
                ],
                'unit_amount' => $szektorAr*100,                
              ],
            'quantity' => 1,
            ];
        }

        $session = \Stripe\Checkout\Session::create([
          'payment_method_types' => ['card'],
          'line_items' => $lineItems,
          'mode' => 'payment',
          'success_url' => 'http://localhost:4200/success.html',
          'cancel_url' => 'http://localhost:4200/cancel.html',
        ]);

        $rendeles->session_id = $session->id;
        $rendeles->rendeles_osszeg = $rendelesOsszeg;

        return response()->json(['redirect_url'=>$session->url]);
    }

    public function success() {
        
    }

    public function cancel() {
        
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
