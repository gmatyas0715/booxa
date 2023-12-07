<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\EloadoController;
use App\Http\Controllers\MufajController;
use App\Http\Controllers\EloadoMufajController;
use App\Http\Controllers\HelyszinController;
use App\Http\Controllers\CimController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

//Mindenkinek elérhető routok

Route::controller(EloadoController::class)->group(function () {
    Route::get('/eloadok','index');
    Route::get('/eloadok/{eloado}','show');
    Route::patch('/update-eloado/{eloado}','update');
    Route::delete('/delete-eloado/{eloado}','destroy');
});


Route::controller(MufajController::class)->group(function(){
    Route::post('/create-mufaj','store');
    Route::get('/mufajok','index');
    Route::get('/mufajok/{mufaj}','show');
    Route::patch('/update-mufaj/{mufaj}','update');
    Route::delete('/delete-mufaj/{mufaj}','destroy');
});


Route::controller(EloadoMufajController::class)->group(function(){
    Route::post('/create-eloado-mufaj','store');
    Route::get('/eloado-mufaj-kapcsolatok','index');
    Route::get('/eloado-mufaj-kapcsolatok/{eloado_mufaj}','show');
    Route::patch('/update-eloado-mufaj/{eloado_mufaj}','update');
    Route::delete('/delete-eloado-mufaj/{eloado_mufaj}','destroy');
});


Route::controller(HelyszinController::class)->group(function(){
    Route::post('/create-helyszin','store');
    Route::get('/helyszinek','index');
    Route::get('/helyszinek/{helyszin}','show');
    Route::patch('/update-helyszin/{helyszin}','update');
    Route::delete('/delete-helyszin/{helyszin}','destroy');
});


Route::controller(CimController::class)->group(function(){
    Route::post('/create-cim','store');
    Route::get('/cimek','index');
    Route::get('/cimek/{cim}','show');
    Route::patch('/update-cim/{cim}','update');
    Route::delete('/delete-cim/{cim}','destroy');
});



Route::controller(UserController::class)->group(function(){
    Route::post('/create-user','store');
    Route::get('/userek','index');
    Route::middleware('auth:sanctum')->get('/userek/{user}','show');
    Route::patch('/update-user/{user}','update');
    Route::delete('/delete-user/{user}','destroy');
});


use App\Http\Controllers\SzektorController;
Route::controller(SzektorController::class)->group(function(){
    Route::post('/create-szektor','store');
    Route::get('/szektorok','index');
    Route::get('/szektorok/{szektor}','show');
    Route::patch('/update-szektor/{szektor}','update');
    Route::delete('/delete-szektor/{szektor}','destroy');
});


Route::controller(AuthController::class)->group(function () {
    Route::post('/', 'register');
    Route::post('/login', 'login');
    Route::middleware('auth:sanctum')->post('/logout', 'logout');
});


//Vendég user route-ok

Route::controller(AuthController::class)->group(function () {
    Route::post('/', 'register');
    Route::post('/login', 'login');
    Route::middleware('auth:sanctum')->post('/logout', 'logout');
});

Route::group(['middleware'=>['auth:sanctum','role:admin']],function(){
    Route::controller(EloadoController::class)->group(function () {
        Route::get('/eloadok','index');
        Route::get('/eloadok/{eloado}','show');
        Route::patch('/update-eloado/{eloado}','update');
        Route::delete('/delete-eloado/{eloado}','destroy');
    });
});

Route::group(['middleware'=>['auth:sanctum','role:szerkeszto']],function(){
    Route::controller(EloadoController::class)->group(function () {
        Route::get('/eloadok','index');
        Route::get('/eloadok/{eloado}','show');
        Route::patch('/update-eloado/{eloado}','update');
        Route::delete('/delete-eloado/{eloado}','destroy');
    });
});

Route::group(['middleware'=>['auth:sanctum','role:user_support']],function(){

});

Route::group(['middleware'=>['auth:sanctum','role:regisztralt_user']],function(){

});

