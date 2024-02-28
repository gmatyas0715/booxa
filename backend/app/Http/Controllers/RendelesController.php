<?php

namespace App\Http\Controllers;

use App\Models\Rendeles;
use App\Models\SzektorAlegysegAr;
use App\Models\Cim;
use App\Http\Requests\UpdateRendelesRequest;
use App\Models\Esemeny;
use App\Models\JegyAdat;
use App\Models\Szektor;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Checkout\Session;
use Carbon\Carbon;


class RendelesController extends Controller
{

    public function index()
    {
        $rendelesek = Rendeles::all();
        return response()->json($rendelesek);
    }

    public function checkout(Request $request){

        $szamlazasAdatok = $request->input('szamlazasAdatok');
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $cim = new Cim();
        $cim->iranyitoszam = $szamlazasAdatok['iranyitoszam'];
        $cim->telepules = $szamlazasAdatok['telepules'];
        $cim->kozterulet = $szamlazasAdatok['kozterulet'];
        $cim->hazszam = $szamlazasAdatok['hazszam'];
        $cim->save();

        $user = $request->user();

        $rendeles = new Rendeles();
        $rendeles->user_id = $user->id;
        $rendeles->vezeteknev = $szamlazasAdatok['vezeteknev'];
        $rendeles->keresztnev = $szamlazasAdatok['keresztnev'];
        $rendeles->email = $szamlazasAdatok['email'];
        $rendeles->szamlazasi_cim_id = $cim->id;
        $rendeles->status = 'nem kifizetett';
        $rendeles->save();

        $rendelesOsszeg = 390;
        $jegyAdatok = json_decode($request->input('jegyAdatok'));

        $customer = Customer::create([
            'email' => $szamlazasAdatok['email']
        ]);

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

        $session = Session::create([
          'payment_method_types' => ['card'],
          'line_items' => $lineItems,
          'mode' => 'payment',
          'customer' => $customer->id,
          'success_url' => 'http://localhost:4200/rendeles/sikeres-fizetes?session_id={CHECKOUT_SESSION_ID}',
          'cancel_url' => 'http://localhost:4200/rendeles/sikertelen-fizetes?session_id={CHECKOUT_SESSION_ID}',
        ]);

        $rendeles->session_id = $session->id;
        $rendeles->rendeles_osszeg = $rendelesOsszeg;
        $rendeles->save();

        return response()->json(['redirect_url'=>$session->url]);
    }

    public function success() {

        
    }

    public function cancel() {
        
    }

    public function sessionData(Request $request) {
        
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
        $sessionId = $request->query('sessionId');

        try {
            $stripeSession = Session::retrieve($sessionId);
            $rendeles = Rendeles::where('session_id', $sessionId)->first();

            if (!$stripeSession || $rendeles->status=='fizetett'){
                return response()->json(['error'=> 'not_found']);
            }

            $rendeles->status='fizetett';
            $rendeles->fizetes_idopont = now();
            $rendeles->save();

            $customer = Customer::retrieve($stripeSession->customer);

            return response()->json(['user' => $customer,'rendeles_id'=>$rendeles->id]);

       } catch (Exception $e) {
           return response()->json(['error'=> 'not_found']);
       }
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
