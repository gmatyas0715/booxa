<?php

use Illuminate\Support\Facades\Route;

Route::namespace('App\Http\Controllers')->group(function () {

    // ÁLTALÁNOS ROUTE-OK
    // Autentikáció
    Route::post('/register', 'AuthController@register');
    Route::post('/login', 'AuthController@login');
    
    // Cím
    Route::get('/helyszin-cimek','CimController@helyszinCimek');

    // Előadó
    Route::get('/eloado-nevek','EloadoController@eloadoNevek');
    Route::get('/random-10-eloado','EloadoController@random10Eloado');

    // Esemény
    Route::get('/esemeny-kereso','EsemenyController@esemenyKereso');
    Route::get('/esemenyek/{esemeny}','EsemenyController@show');

    // Jegyadat
    Route::get('/szektor-alegyseg-foglaltsag-check/{esemeny}','JegyAdatController@foglaltsagLekerdezes');
    
    // Helyszín
    Route::get('/helyszin-nevek','HelyszinController@helyszinek');

    // Műfaj
    Route::get('/mufaj-nevek','MufajController@mufajNevek');

    // Szektor
    Route::get('/kivalasztott-szektorok/{esemeny}','SzektorController@kivalasztottSzektorok');

    // User
    Route::get('/user-emailek-felhasznalonevek','UserController@userEmailekFelhasznalonevek');



    // BEJELENTKEZETT USER ROUTE-OK
    Route::group(['middleware'=>['auth:sanctum']],function(){

        // Autentikáció
        Route::post('/logout', 'AuthController@logout');
        Route::post('/role-check','AuthController@roleCheck');
        Route::get('/user-szerep','AuthController@getSzerepNev');

        // Esemény
        Route::get('/helyszin-eloado-nev-id','EsemenyController@helyszinEloadoNevId');

        // Rendelés
        Route::post('/rendeles-elkuldes', 'RendelesController@checkout');
        Route::post('/pdf-jegy-generalas/{rendeles}', 'RendelesController@pdfJegyLetoltes');
        Route::post('/pdf-szamla-generalas/{rendeles}', 'RendelesController@pdfSzamlaLetoltes');
        Route::get('/session-data','RendelesController@sessionData');

        // User
        Route::get('/userek/{user}','UserController@show');
        Route::patch('/userek/{user}', 'UserController@update');
        Route::delete('/userek/{user}', 'UserController@destroy');
    });



    // ESEMÉNYSZERKESZTŐ && ADMIN USER ROUTE-OK
    Route::group(['middleware'=>['auth:sanctum','role:admin|esemenyszerkeszto']],function(){

        // Esemény
        Route::post('/esemenyek', 'EsemenyController@store');
        Route::get('/esemenyek','EsemenyController@index');
        Route::patch('/esemenyek/{esemeny}', 'EsemenyController@update');
        Route::delete('/esemenyek/{esemeny}', 'EsemenyController@destroy');
    });


    
    // ADMIN USER ROUTE-OK
    Route::group(['middleware'=>['auth:sanctum','role:admin']],function(){

        // Autentikáció
        Route::post('/user-letrehozas', 'AuthController@userLetrehozas');
        Route::get('/szerep-osszes','AuthController@roles');
        Route::patch('/user-modositas/{user}', 'AuthController@userModositas');

        // Cím
        Route::post('/cimek', 'CimController@store');
        Route::get('/cimek', 'CimController@index');
        Route::patch('/cimek/{cim}', 'CimController@update');
        Route::delete('/cimek/{cim}', 'CimController@destroy');

        // Előadó
        Route::post('/eloadok', 'EloadoController@store');
        Route::get('/eloadok','EloadoController@index');
        Route::patch('/eloadok/{eloado}', 'EloadoController@update');
        Route::delete('/eloadok/{eloado}', 'EloadoController@destroy');

        // Helyszín
        Route::post('/helyszinek', 'HelyszinController@store');
        Route::get('/helyszinek','HelyszinController@index');
        Route::patch('/helyszinek/{helyszin}', 'HelyszinController@update');
        Route::delete('/helyszinek/{helyszin}', 'HelyszinController@destroy');

        // Műfaj
        Route::post('/mufajok', 'MufajController@store');
        Route::get('/mufajok','MufajController@index');
        Route::patch('/mufajok/{mufaj}', 'MufajController@update');
        Route::delete('/mufajok/{mufaj}', 'MufajController@destroy');

        // User
        Route::get('/userek','UserController@index');
    });   
});