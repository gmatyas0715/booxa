<?php

use App\Http\Controllers\EloadoController;
use App\Http\Controllers\EloadoMufajController;

Route::post('/create-eloado',[EloadoController::class,'create']);
Route::put('/update-leiras/{id}', [EloadoController::class, 'updateLeiras']);
Route::put('/update-eloado-nev/{id}', [EloadoController::class, 'updateEloadoNev']);
Route::put('/update-eloado-kep-eleres/{id}',[EloadoController::class,'updateEloadoKepEleres']);

Route::post('/create-eloado-mufaj',[EloadoMufajController::class,'create']);
Route::put('/update-eloado-mufaj/{id}',[EloadoMufajController::class,'updateEloadoMufajKapcsolat']);