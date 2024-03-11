<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    public function userLetrehozas(Request $request) {

        $validator = Validator::make($request->only('vezeteknev', 'keresztnev', 'email',  'nem', 'username'), [
            'vezeteknev'=>'required|string|max:50',
            'keresztnev'=>'required|string|max:50',
            'email'=>'required|email|unique:users,email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
            'nem'=>'required|string|in:f,n',
            'username'=>'required|unique:users,username|string',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        $ujUser = new User();
        $ujUser->password = Hash::make('Booxa-bro-123');
        $ujUser->vezeteknev = $request->vezeteknev;
        $ujUser->keresztnev = $request->keresztnev;
        $ujUser->email = $request->email;
        $ujUser->nem = $request->nem;
        $ujUser->szuletesi_datum = $request->szuletesi_datum;
        $ujUser->username = $request->username;

        $ujUser->save();
        $ujUser->assignRole($request->szerep);

        return response()->json($ujUser,200);
    }

    public function userModositas(Request $request, User $user) {

        $validator = Validator::make($request->only('vezeteknev', 'keresztnev', 'email',  'nem', 'username'), [
            'vezeteknev'=>'required|string|max:50',
            'keresztnev'=>'required|string|max:50',
            'email'=>'email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
            'nem'=>'required|string|in:f,n',
            'username'=>'required|string',
        ]);

        if ($validator->fails()) return response()->json($validator->errors(), 400);

        $user->vezeteknev = $request->vezeteknev;
        $user->keresztnev = $request->keresztnev;
        $user->email = $request->email;
        $user->nem = $request->nem;
        $user->szuletesi_datum = $request->szuletesi_datum;
        $user->username = $request->username;

        $user->save();
        $user->syncRoles([]);
        $user->assignRole($request->szerep);

        return response()->json($user,200);
    }

    public function roleCheck(Request $request)
    {
        $user = $request->user();
        Log::info($user);
        $roles = $request['roles'];
        foreach ($roles as $role) {
            if ($user->hasRole($role)){
                return response()->json(true);
            }
        }
        return response()->json(false);
    }

    public function getSzerepNev(Request $request){
        $user = $request->user();
        $userSzerep = $user->getRoleNames()[0];
        Log::info($userSzerep);
        Log::info($userSzerep);
        return response()->json(['szerep'=>$userSzerep]);
    }

    public function roles() {
        $roles = Role::select('name')->get();
        return response()->json($roles);
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
