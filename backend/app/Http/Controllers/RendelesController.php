<?php

namespace App\Http\Controllers;

use App\Models\Rendeles;
use App\Http\Requests\StoreRendelesRequest;
use App\Http\Requests\UpdateRendelesRequest;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

class RendelesController extends Controller
{

    public function index()
    {
        $rendelesek = Rendeles::all();
        return response()->json($rendelesek);
    }

    public function store(StoreRendelesRequest $request)
    {
        
        Log::info($request);
        $ujrendeles = new Rendeles();
        $ujrendeles->rendeles_idopont = $request->input('rendeles_idopont');
        $ujrendeles->user_id = $request->input('user_id');
        $ujrendeles->fizetes_id = $request->input('fizetes_id');
        $ujrendeles->save();

        return response()->json(['üzenet' => $ujrendeles->id.' azonosítójú rendelés sikeresen leadva!']);
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
