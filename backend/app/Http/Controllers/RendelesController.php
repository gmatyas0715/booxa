<?php

namespace App\Http\Controllers;

use App\Models\Rendeles;
use App\Models\SzektorAlegysegAr;
use App\Models\Cim;
use App\Http\Requests\UpdateRendelesRequest;
use App\Models\Esemeny;
use App\Models\JegyAdat;
use App\Models\Szektor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Checkout\Session;
use App\Mail\SikeresRendeles;
use App\Models\SzektorAlegyseg;
use Illuminate\Support\Facades\Mail;
use Barryvdh\DomPDF\Facade\PDF;


class RendelesController extends Controller
{

    public function index()
    {
        $rendelesek = Rendeles::all();
        return response()->json($rendelesek);
    }

    public function checkout(Request $request,Rendeles $rendeles){

        $szamlazasAdatok = $request->input('szamlazasAdatok');
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $cim = new Cim();
        $cim->iranyitoszam = $szamlazasAdatok['iranyitoszam'];
        $cim->telepules = $szamlazasAdatok['telepules'];
        $cim->kozterulet = $szamlazasAdatok['kozterulet'];
        $cim->hazszam = $szamlazasAdatok['hazszam'];
        $cim->save();

        $user = $request->user();

        $rendeles->user_id = $user->id;
        $rendeles->vezeteknev = $szamlazasAdatok['vezeteknev'];
        $rendeles->keresztnev = $szamlazasAdatok['keresztnev'];
        $rendeles->email = $szamlazasAdatok['email'];
        $rendeles->szamlazasi_cim_id = $cim->id;
        $rendeles->status = 'nem kifizetett';
        $rendeles->save();

        $rendelesOsszeg = 390;
        $jegyAdatok = $rendeles->jegyAdat;

        $customer = Customer::create([
            'email' => $szamlazasAdatok['email']
        ]);

        $lineItems = [];
        foreach ($jegyAdatok as $jegyAdat) {

            $esemeny = Esemeny::find($jegyAdat->esemeny_id);
            $szektor = Szektor::find($jegyAdat->szektor_id);

            $szektorAr = SzektorAlegysegAr::where('esemeny_id',$jegyAdat->esemeny_id)->where('szektor_alegyseg_id',$jegyAdat->szektor_alegyseg_id)->value('szektor_alegyseg_ar');

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

        $lineItems[] =  [
            'price_data' => [
                'currency' => 'huf',
                'product_data' => [
                    'name' => 'Szervízköltség',
                    'description' => 'Booxa használati díja'
                ],
                'unit_amount' => 390*100,                
              ],
            'quantity' => 1,
            ];

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

    public function sessionData(Request $request) {
        
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
        $sessionId = $request->query('sessionId');

        $stripeSession = Session::retrieve($sessionId); 
        $rendeles = Rendeles::where('session_id', $sessionId)->first();

        if (!$stripeSession || $rendeles->status=='fizetett'){
            return response()->json(['error'=> 'not_found']);
        }


        //Mail::to($rendeles->email)->send(new SikeresRendeles($rendeles));
        $rendeles->status='fizetett';
        $rendeles->fizetes_idopont = now();
        $rendeles->save();

        $customer = Customer::retrieve($stripeSession->customer);

        return response()->json(['user' => $customer,'rendeles_id'=>$rendeles->id]);
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
    
    public static function pdfJegyGeneralas(Rendeles $rendeles) {

        $jegyAdatok = $rendeles->jegyAdat;
        $jegyek = [];
        $rendeles_id = $rendeles->id;

        foreach ($jegyAdatok as $jegy) {
            $esemeny = Esemeny::find($jegy->esemeny_id);
            $cim = $esemeny->helyszin->cim->first();            

            $jegyPrint = [
                'jegy_id'=>$jegy->id,
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

    public function korabbiVasarlasok(Request $request) {
        $korabbiVasarlasok = 
        /*DB::table('rendeles')->select('rendeles.id as rendeles_id','rendeles.rendeles_idopont as rendeles_idopont','jegy_adat.id as jegy_adat_id','esemeny.idopont as esemeny_idopont','eloado.nev as eloado_nev','helyszin.nev as helyszin_nev','szektor_nev')
            ->join('jegy_adat','jegy_adat.rendeles_id','=','rendeles.id')
            ->join('esemeny','esemeny.id','=','jegy_adat.esemeny_id')
            ->join('eloado','eloado.id','=','esemeny.eloado_id')
            ->join('helyszin','helyszin.id','=','jegy_adat.helyszin_id')
            ->join('szektor','szektor.id','=','jegy_adat.szektor_id')
            ->where('user_id',$request->user()->id)
            ->where('rendeles.status','fizetett')
            ->distinct()
            ->groupBy('rendeles.id')
            ->get();*/
        Rendeles::select(['id','rendeles_idopont'])
        ->with(['jegyAdat'=>function($query){
            $query->select(['id','rendeles_id','esemeny_id','szektor_id'])->with(['esemeny:id,idopont,eloado_id,helyszin_id','esemeny.eloado:id,nev','esemeny.helyszin:id,nev','szektor:id,szektor_nev']);
        }])
        ->where('user_id',$request->user()->id)
        ->where('rendeles.status','fizetett')
        ->get();
        return response()->json([$korabbiVasarlasok]);
    }
}
