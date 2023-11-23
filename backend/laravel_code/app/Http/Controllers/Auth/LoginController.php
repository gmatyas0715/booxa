<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'jelszo');

        if (Auth::attempt($credentials)) {
            // Authentication successful
            // return redirect()->intended('/kezdooldal'); // Redirect to the intended URL or a default one
            return response()->json(['üzenet'=>'Sikeres bejelentkezés']);
        }

        // Authentication failed
        return back()->withErrors(['email' => 'Sikertelen bejelentkezés']);
    }
 
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
