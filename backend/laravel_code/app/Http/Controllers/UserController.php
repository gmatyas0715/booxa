<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserModel;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getData()
    {
        $data = UserModel::all();

        return response()->json($data);
    }

    public function login(Request $request)
    {
        $userBejelentkezesiAdatok = $request->only('felhasznalonev', 'jelszo');

        if (!bcrypt('teszt123')=='$2y$12$/gSNRrlucAHv/KZIopqhue/jt5h5c8HNdceGYg6z/iFKvIp0qcYd.') {
            dd('ok');
        }

        if (Auth::attempt($userBejelentkezesiAdatok)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->accessToken;

            return response()->json(['token' => $token]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|numeric',
            'vezeteknev' => 'required|string|max:50',
            'keresztnev' => 'required|string|max:50',
            'email' => 'required|email|unique:users',
            'nem' => 'required|string|max:1',
            'szuletesi_datum' => 'required|string|max:10',
            'felhasznalonev' => 'required|string|max:50',
            'jelszo' => 'required|string|min:255',
            'profilkep_eleres' => 'string|max:100',
        ]);

        $user = UserModel::create([
            'id' => $validatedData['id'],
            'vezeteknev' => $validatedData['vezeteknev'],
            'keresztnev' => $validatedData['keresztnev'],
            'email' => $validatedData['email'],
            'nem' => $validatedData['nem'],
            'szuletesi_datum' => $validatedData['szuletesi_datum'],
            'felhasznalonev' => $validatedData['felhasznalonev'],
            'jelszo' => $validatedData['jelszo'],
            'profilkep_eleres' => bcrypt($validatedData['profilkep_eleres']),
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }
}
