<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->only('vezeteknev', 'keresztnev', 'email',  'nem', 'szuletesi_datum',  'felhasznalonev', 'jelszo', 'jelszo_megerosites'), [
            'vezeteknev'=>'required|string|max:50',
            'keresztnev'=>'required|string|max:50',
            'email'=>'required|email|unique:user,email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
            'nem'=>'required|string|in:f,n',
            'szuletesi_datum'=>'required|string|date-format:Y-m-d',
            'felhasznalonev'=>'required|unique:user,felhasznalonev|string',
            'jelszo'=>'required|string|min:8|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/',
            'profilkep_eleres'=>'string'
        ]);
        if ($validator->fails())
            return response()->json($validator->errors(), 400);
        $input = $request->only('vezeteknev', 'keresztnev', 'email',  'nem', 'szuletesi_datum',  'felhasznalonev', 'jelszo');
        $input['jelszo'] = Hash::make($request['jelszo']) ;
        $user = User::create($input);
        $data =  [
            'token' => $user->createToken('Booxa-bro')->plainTextToken,
            'user' => $user,
        ];
        return response()->json($data, 200);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->only('felhasznalonev', 'jelszo'), [
            'felhasznalonev' => ['required'],
            'jelszo' => ['required'],
        ]);
        if ($validator->fails())
            return response()->json($validator->errors(), 400);

        $user = User::where('felhasznalonev', $request['felhasznalonev'])->first();
        Log::info('Inputból generált: '.Hash::make($request['jelszo']));
        Log::info('Adatbázisból kinyert: '.$user->jelszo);

        if ($user && Hash::check($request['jelszo'], $user->jelszo)) {
            Log::info('Autentikációs rész');

            $token = $user->createToken('Booxa-bro')->plainTextToken;

            return response()->json([
                'üzenet' => 'Sikeres bejelentkezés',
                'user_id' => $user->id,
                'felhasznalonev' => $user->felhasznalonev,
                'token' => $token
            ], 200);
        }
        else{
            return response('Sikertelen bejelentkezés!', 401)
                  ->header('Content-Type', 'text/plain');
        }
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sikeresen kijelentkezett!']);
    }
}
