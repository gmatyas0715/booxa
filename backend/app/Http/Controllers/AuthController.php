<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function roleCheck(Request $request)
    {
        $user = $request->user();
        Log::info($user);
        return response()->json($user->hasRole($request['role']));
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->only('vezeteknev', 'keresztnev', 'email',  'nem', 'szuletesi_datum',  'felhasznalonev', 'jelszo', 'jelszo_megerosites'), [
            'vezeteknev'=>'required|string|max:50',
            'keresztnev'=>'required|string|max:50',
            'email'=>'required|email|unique:users,email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
            'nem'=>'required|string|in:f,n',
            'szuletesi_datum'=>'required|string|date-format:Y-m-d',
            'felhasznalonev'=>'required|unique:users,username|string',
            'jelszo'=>'required|string|min:8|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/'
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);
        $input = $request->only('vezeteknev', 'keresztnev', 'email',  'nem', 'szuletesi_datum','jelszo','felhasznalonev');
        $input['username'] =  $request['felhasznalonev']; 
        $input['password'] = Hash::make($request['jelszo']) ;
        $user = User::create($input);
        $user -> assignRole('regisztralt_user');
        $data =  [
            'üzenet' => 'Sikeres regisztráció',
            'token' => $user->createToken('Booxa-bro')->plainTextToken,
            'felhasznalonev' => $user->username,
            'userId' => $user->id,
            'roles' => $user->getRoleNames()
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

        $credentials = ['username'=>$request['felhasznalonev'],'password'=>$request['jelszo']];

        if (Auth::attempt($credentials)) {

            /** @var \App\Models\User */
            $user = Auth::user();
            $token = $user->createToken('Booxa-bro')->plainTextToken;

            return response()->json([
                'üzenet' => 'Sikeres bejelentkezés',
                'felhasznalonev' => $user->username,
                'token' => $token,
                'userId' => $user->id,
                'roles' => $user->getRoleNames()
            ], 200);
        }
        else{

        }
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sikeresen kijelentkezett!']);
    }
}
