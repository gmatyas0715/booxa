<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


use App\Http\Controllers\EloadoController;
Route::controller(EloadoController::class)->group(function () {
    Route::get('/eloadok','index');
    Route::get('/eloadok/{eloado}','show');
    Route::patch('/update-eloado/{eloado}','update');
    Route::delete('/delete-eloado/{eloado}','destroy');
});

use App\Http\Controllers\MufajController;
Route::controller(MufajController::class)->group(function(){
    Route::post('/create-mufaj','store');
    Route::get('/mufajok','show');
    Route::get('/mufajok/{mufaj}','show');
    Route::patch('/update-mufaj/{mufaj}','update');
    Route::delete('/delete-mufaj/{mufaj}','destroy');
});

use App\Http\Controllers\EloadoMufajController;
Route::controller(EloadoMufajController::class)->group(function(){
    Route::post('/create-eloado-mufaj','store');
    Route::get('/eloado-mufaj-kapcsolatok','show');
    Route::get('/eloado-mufaj-kapcsolatok/{eloado_mufaj}','show');
    Route::patch('/update-eloado-mufaj/{eloado_mufaj}','update');
    Route::delete('/delete-eloado-mufaj/{eloado_mufaj}','destroy');
});

use App\Http\Controllers\HelyszinController;
Route::controller(HelyszinController::class)->group(function(){
    Route::post('/create-helyszin','store');
    Route::get('/helyszinek','show');
    Route::get('/helyszinek/{helyszin}','show');
    Route::patch('/update-helyszin/{helyszin}','update');
    Route::delete('/delete-helyszin/{helyszin}','destroy');
});

use App\Http\Controllers\CimController;
Route::controller(CimController::class)->group(function(){
    Route::post('/create-cim','store');
    Route::get('/cimek','show');
    Route::get('/cimek/{cim}','show');
    Route::patch('/update-cim/{cim}','update');
    Route::delete('/delete-cim/{cim}','destroy');
});

use App\Http\Controllers\UserController;
Route::controller(UserController::class)->group(function(){
    Route::post('/create-user','store');
    Route::get('/userek','show');
    Route::middleware('auth:sanctum')->get('/userek/{user}','show');
    Route::patch('/update-user/{user}','update');
    Route::delete('/delete-user/{user}','destroy');
});

use App\Http\Controllers\SzektorController;
Route::controller(SzektorController::class)->group(function(){
    Route::post('/create-szektor','store');
    Route::get('/szektorok','show');
    Route::get('/szektorok/{szektor}','show');
    Route::patch('/update-szektor/{szektor}','update');
    Route::delete('/delete-szektor/{szektor}','destroy');
});

use App\Http\Controllers\AuthController;
Route::controller(AuthController::class)->group(function () {
    Route::post('/', 'register');
    Route::post('/login', 'login');
    Route::middleware('auth:sanctum')->post('/logout', 'logout');
});
