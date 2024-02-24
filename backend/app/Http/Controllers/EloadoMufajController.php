<?php

namespace App\Http\Controllers;

use App\Models\EloadoMufaj;
use App\Http\Requests\StoreEloadoMufajRequest;
use App\Http\Requests\UpdateEloadoMufajRequest;
use Illuminate\Support\Facades\Schema;
use PhpParser\Node\Expr\Cast\Array_;
use Ramsey\Uuid\Type\Integer;

class EloadoMufajController extends Controller
{

    public function index()
    {
        $eloadoMufaj = EloadoMufaj::all();
        return response()->json($eloadoMufaj);
    }

    public function store(StoreEloadoMufajRequest $request)
    {
        $ujEloadoMufajKapcsolat = new EloadoMufaj();
        $ujEloadoMufajKapcsolat->eloado_id = $request->input('eloado_id');
        $ujEloadoMufajKapcsolat->mufaj_id = $request->input('mufaj_id');

        $ujEloadoMufajKapcsolat->save();
        return response()->json(['üzenet'=>$ujEloadoMufajKapcsolat->id.' azonosítóval új előadó műfaj kapcsolat lett sikeresen létrehozva!']);
    }

    public function show(EloadoMufaj $eloadoMufaj)
    {
        return response()->json($eloadoMufaj);
    }

    public function update(UpdateEloadoMufajRequest $request, EloadoMufaj $eloadoMufaj)
    {
        $tablaMezok = Schema::getColumnListing($eloadoMufaj->getTable());

        $updateAdat = $request->only($tablaMezok);

        $eloadoMufaj->update($updateAdat);     

        return response()->json($eloadoMufaj);
    }

    public function destroy(EloadoMufaj $eloadoMufaj)
    {
        $eloadoMufaj->delete();
        return response()->json(['üzenet'=>$eloadoMufaj->id.' azonosítójú előadó-műfaj kapcsolat sikeresen törölve!']);
    }

    public static function kapcsolatBeszuras(int $eloadoId, String $mufajIdLista) {
        $mufajIdLista = explode(',',$mufajIdLista);

        foreach ($mufajIdLista as $mufajId) {
           EloadoMufaj::create([
            'eloado_id'=>$eloadoId,
            'mufaj_id'=>$mufajId
           ]);
        }
    }

    public static function kapcsolatEltavolitas(int $eloadoId){
        EloadoMufaj::where('eloado_id',$eloadoId)->delete();
    }
}
