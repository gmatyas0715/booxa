<?php

use Illuminate\Support\Facades\Route;

Route::namespace('App\Http\Controllers')->group(function () {

    Route::post('/pdf-jegy-generalas/{rendeles}', 'JegyAdatController@pdfJegyLetoltes');
    Route::post('/pdf-szamla-generalas/{rendeles}', 'JegyAdatController@pdfSzamlaLetoltes');
    Route::get('/cimek', 'CimController@index');

    Route::post('/cimek', 'CimController@store');
    Route::patch('/cimek/{cim}', 'CimController@update');
    Route::delete('/cimek/{cim}', 'CimController@destroy');

    Route::get('/helyszinek','HelyszinController@index');
    Route::get('/helyszin-nevek','HelyszinController@helyszinek');
    Route::get('/helyszinek/{helyszin}','HelyszinController@show');

    Route::post('/helyszinek', 'HelyszinController@store');
    Route::patch('/helyszinek/{helyszin}', 'HelyszinController@update');
    Route::delete('/helyszinek/{helyszin}', 'HelyszinController@destroy');


    Route::get('/session-data','RendelesController@sessionData');

    Route::get('/mufajok-table','MufajController@mufajTable');
    Route::post('/eloadok', 'EloadoController@store');
    Route::post('/user-letrehozas', 'AuthController@userLetrehozas');
    Route::patch('/user-modositas/{user}', 'AuthController@userModositas');

    Route::patch('/eloadok/{eloado}', 'EloadoController@update');
    Route::delete('/eloadok/{eloado}', 'EloadoController@destroy');
    Route::get('/userek','UserController@index');
    Route::delete('/userek/{user}', 'UserController@destroy');

    Route::post('/rendeles', 'RendelesController@store');

    Route::group(['middleware'=>['auth:sanctum']],function(){
        Route::post('/rendelesElkuldes', 'RendelesController@checkout');
    });



    Route::post('/user-letrehozas', 'AuthController@userLetrehozas');


    Route::get('/szerep-osszes','AuthController@roles');

    Route::get('/rendelesekEsemennyel/{esemeny}', 'JegyAdatController@szektorFoglaltsag');

    Route::post('/mufajok', 'MufajController@store');
    Route::patch('/mufajok/{mufaj}', 'MufajController@update');
    Route::delete('/mufajok/{mufaj}', 'MufajController@destroy');

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

    // Cím route-ok
    Route::get('/helyszin-cimek','CimController@helyszinCimek');

    // Helyszín route-ok


    // Szektor alegység route-ok
    Route::get('/szektor-alegyseg-foglaltsag-check/{esemeny}','JegyAdatController@foglaltsagLekerdezes');
    Route::get('/szektor-alegyseg-szabad-hely','JegyAdatController@szabadHelySzam');
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
            Route::post('/role-check','AuthController@roleCheck');
        });



        
    // ADMIN & ESEMÉNY-SZERKESZTŐ JOGOSULTSÁG ROUTE-OK
    Route::group(['middleware'=>['auth:sanctum','role:admin|szerkeszto']],function(){

        // Előadó route-ok

        // Műfaj route-ok

        // Helyszín route-ok


        // Szektor route-ok
        Route::post('/szektorok', 'SzektorController@store');
        Route::patch('/szektorok/{szektor}', 'SzektorController@update');
        Route::delete('/szektorok/{szektor}', 'SzektorController@destroy');

        // Cím route-ok


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
    });

    Route::get('/user-felhasznalonevek','UserController@userFelhasznalonevek');
    
    // ADMIN & USER-SUPPORT & REGISZTRÁLT USER ROUTE-OK JOGOSULTSÁG ROUTE-OK
    Route::group(['middleware'=>['auth:sanctum','role:admin|user_support|regisztralt_user|szerkeszto']],function(){

        // User route-ok
        Route::patch('/userek/{user}', 'UserController@update');
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


        // Jegy adat route-ok
        Route::get('/jegyadatok','JegyAdatController@index');
        Route::get('/jegyadatok/{jegyadat}','JegyAdatController@show');
        Route::post('/jegyadatok', 'JegyAdatController@store');
        Route::delete('/jegyadatok', 'JegyAdatController@destroy');
        Route::patch('/jegyadatok', 'JegyAdatController@update');
    });
});