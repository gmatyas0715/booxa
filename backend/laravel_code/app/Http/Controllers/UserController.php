<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getData()
    {
        $data = User::all();

        return response()->json($data);
    }

    public function login(Request $request)
    {
        $userBejelentkezesiAdatok = $request->only('felhasznalonev', 'jelszo');

        if (Auth::attempt($userBejelentkezesiAdatok)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->accessToken;

            return response()->json(['token' => $token]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function userHozzaadas(Request $request)
    {
        // Validate the request data
        $request->validate([
            'vezeteknev' => 'required|max:50',
            'keresztnev' => 'required|max:50',
            'email' => 'required|email|max:255',
            'nem' => 'required|in:f,n',
            'szuletesi_datum' => 'required|date',
            'felhasznalonev' => 'required|max:50',
            'jelszo' => 'required|max:255',
            'profilkep_eleres' => 'nullable|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        // Create a new user
        $user = User::create($request->all());

        // You can also return a response or redirect as needed
        return response()->json(['message' => 'User added successfully', 'user' => $user]);
    }
}
