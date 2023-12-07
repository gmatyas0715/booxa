<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreuserRequest;
use App\Http\Requests\UpdateuserRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::all();
        return response()->json($user);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
       
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['üzenet'=>$user->id.' azonosítójú felhasználó sikeresen törölve!']);
    }
}
