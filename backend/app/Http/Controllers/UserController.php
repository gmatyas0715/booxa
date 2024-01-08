<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UpdateuserRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        $user = User::all();
        return response()->json($user);
    }

    public function show(User $user)
    {
        $userInfo = $user->only(['vezeteknev','keresztnev','email','szuletesi_datum','felhasznalonev']);
        return response()->json($userInfo);
    }

    public function userFelhasznalonevek(){
        $felhasznalonevek = User::select('felhasznalonev','email')->get();

        foreach ($felhasznalonevek as $item) {
            $organizedResult['felhasznalonev'][] = $item->felhasznalonev;
            $organizedResult['email'][] = $item->email;
        }

        return $organizedResult;

    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->vezeteknev = $request->input('vezeteknev');
        $user->keresztnev = $request->input('keresztnev');
        $user->email = $request->input('email');
        $user->nem = $request->input('nem');
        $user->szuletesi_datum = $request->input('szuletesi_datum');
        $user->felhasznalonev = $request->input('felhasznalonev');
        $user->jelszo = Hash::make($request->input('jelszo'));

        return response()->json(['üzenet'=>$user->id.' azonosítójú felhasználó sikeresen frissítve!']);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['üzenet'=>$user->id.' azonosítójú felhasználó sikeresen törölve!']);
    }
}
