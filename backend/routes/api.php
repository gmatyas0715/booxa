<?php

use Illuminate\Support\Facades\Route;

Route::namespace('App\Http\Controllers')->group(function () {

    Route::get('/rendelesekEsemennyel/{esemeny}', 'JegyAdatController@szektorFoglaltsag');
    // PUBLIKUS ROUTE-OK
    // Autentikációs route-ok
    Route::post('/register', 'AuthController@register');
    Route::post('/login', 'AuthController@login');

    // Előadó route-ok
    Route::get('/eloadok','EloadoController@index');
    Route::get('/eloado-nevek','EloadoController@eloadoNevek');
    Route::get('/eloadok/{eloado}','EloadoController@show');

    // Műfaj route-ok
    Route::get('/mufajok','MufajController@index');
    Route::get('/mufaj-nevek', 'MufajController@mufajNevek');
    Route::get('/mufajok/{mufaj}','MufajController@show');

    // Előadó-műfaj kapcsolat route-ok
    Route::get('/eloado-mufaj-kapcsolatok','EloadoMufajController@index');
    Route::get('/eloado-mufaj-kapcsolatok/{eloado-mufaj-kapcsolat}','EloadoMufajController@show');

    // Cím route-ok
    Route::get('/helyszin-cimek','CimController@helyszinCimek');

    // Helyszín route-ok
    Route::get('/helyszinek','HelyszinController@index');
    Route::get('/helyszin-nevek','HelyszinController@helyszinek');
    Route::get('/helyszinek/{helyszin}','HelyszinController@show');

    // Szektor alegység route-ok
    Route::get('/szektor-alegysegek','SzektorAlegysegController@index');
    Route::get('/szektor-alegysegek/{szektor-alegyseg}','SzektorAlegyseg@show');


    // Szektor route-ok
    Route::get('/szektor','SzektorController@index');
    Route::get('/kivalasztott-szektorok/{esemeny}','SzektorController@kivalasztottSzektorok');
    Route::get('/szektorok/{szektor}','SzektorController@show');

    // Esemény route-ok
    Route::get('/esemenyek','EsemenyController@index');
    Route::get('/esemenyek/{esemeny}','EsemenyController@show');
    Route::get('/esemenyKereso','EsemenyController@esemenyKereso');

    // BEJELENTKEZÉSHEZ KÖTÖTT ROUTE-OK
    Route::group(['middleware'=>['auth:sanctum']],function(){
            Route::post('/logout', 'AuthController@logout');
        });


    // ADMIN & ESEMÉNY-SZERKESZTŐ JOGOSULTSÁG ROUTE-OK
    Route::group(['middleware'=>['auth:sanctum','role:admin|szerkeszto']],function(){

        // Előadó route-ok
        Route::post('/eloadok', 'EloadoController@store');
        Route::patch('/eloadok/{eloado}', 'EloadoController@update');
        Route::delete('/eloadok/{eloado}', 'EloadoController@destroy');

        // Műfaj route-ok
        Route::post('/mufajok', 'MufajController@store');
        Route::patch('/mufajok/{mufaj}', 'MufajController@update');
        Route::delete('/mufajok/{mufaj}', 'MufajController@destroy');

        // Előadó-műfaj kapcsolat route-ok
        Route::post('/eloado-mufaj-kapcsolatok', 'EloadoMufajController@store');
        Route::patch('/eloado-mufaj-kapcsolatok/{eloado-mufaj-kapcsolat}', 'EloadoMufajController@update');
        Route::delete('/eloado-mufaj-kapcsolatok/{eloado-mufaj-kapcsolat}', 'EloadoMufajController@destroy');

        // Helyszín route-ok
        Route::post('/helyszinek', 'HelyszinController@store');
        Route::patch('/helyszinek/{helyszin}', 'HelyszinController@update');
        Route::delete('/helyszinek/{helyszin}', 'HelyszinController@destroy');

        // Szektor route-ok
        Route::post('/szektorok', 'SzektorController@store');
        Route::patch('/szektorok/{szektor}', 'SzektorController@update');
        Route::delete('/szektorok/{szektor}', 'SzektorController@destroy');

        // Cím route-ok
        Route::post('/cimek', 'CimController@store');
        Route::patch('/cimek/{cim}', 'CimController@update');
        Route::delete('/cimek/{cim}', 'CimController@destroy');

        // Esemény route-ok
        Route::post('/esemenyek', 'EsemenyController@store');
        Route::patch('/esemenyek/{esemeny}', 'EsemenyController@update');
        Route::delete('/esemenyek/{esemeny}', 'EsemenyController@destroy');
    });

    // ADMIN & USER-SUPPORT JOGOSULTSÁG ROUTE-OK
    Route::group(['middleware'=>['auth:sanctum','role:admin|user_support']],function(){

        // Fizetés route-ok
        Route::get('/fizetesek','FizetesController@index');
        Route::patch('/fizetesek/{fizetes}', 'FizetesController@update');
        Route::delete('/fizetesek/{fizetes}', 'FizetesController@destroy');

        // Rendelés route-ok
        Route::get('/rendelesek','RendelesController@index');
        Route::patch('/rendelesek/{rendeles}', 'RendelesController@update');
        Route::delete('/rendelesek/{rendeles}', 'RendelesController@destroy');

        // User route-ok
        Route::get('/userek','UserController@index');
    });

    // ADMIN & USER-SUPPORT & REGISZTRÁLT USER ROUTE-OK JOGOSULTSÁG ROUTE-OK
    Route::group(['middleware'=>['auth:sanctum','role:admin|user_support|regisztralt_user|szerkeszto']],function(){

        // User route-ok
        Route::patch('/userek/{user}', 'UserController@update');
        Route::delete('/userek/{user}', 'UserController@destroy');
        Route::get('/userek/{user}','UserController@show');
    });

    

    // USER-SUPPORT & REGISZTRÁLT USER JOGOSULTSÁG ROUTE-OK
    Route::group(['middleware'=>['auth:sanctum','role:regisztralt_user']],function(){

        // Fizetés route-ok
        Route::get('/fizetesek/{fizetes}','FizetesController@show');

        // Rendelés route-ok
        Route::get('/rendelesek/{rendeles}','RendelesController@show');
    });

    // ADMIN & REGISZTRÁLT USER JOGOSULTSÁG ROUTE-OK
    Route::group(['middleware'=>['auth:sanctum','role:admin|regisztralt_user']],function(){

        // User route-ok
        Route::post('/userek', 'UserController@store');
    });

    // REGISZTRÁLT USER JOGOSULTSÁG ROUTE-OK
    Route::group(['middleware'=>['auth:sanctum','role:regisztralt_user']],function(){

        // Fizetés route-ok
        Route::post('/fizetesek', 'FizetesController@store');

        // Rendelés route-ok
        Route::post('/rendelesek', 'RendelesController@store');

        // Jegy adat route-ok
        Route::get('/jegyadatok','JegyAdatController@index');
        Route::get('/jegyadatok/{jegyadat}','JegyAdatController@show');
        Route::post('/jegyadatok', 'JegyAdatController@store');
        Route::delete('/jegyadatok', 'JegyAdatController@destroy');
        Route::patch('/jegyadatok', 'JegyAdatController@update');
    });
});