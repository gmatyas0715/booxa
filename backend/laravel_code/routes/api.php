<?php

use App\Http\Controllers\EloadoController;
use App\Http\Controllers\EloadoMufajController;
use App\Http\Controllers\MufajController;

Route::get('/eloadok',[EloadoController::class,'index']);
Route::get('/eloadok/{eloado}',[EloadoController::class,'show']);
Route::post('/create-eloado',[EloadoController::class,'create']);
Route::put('/update-leiras/{id}', [EloadoController::class, 'updateLeiras']);
Route::put('/update-eloado-nev/{id}', [EloadoController::class, 'updateEloadoNev']);
Route::put('/update-eloado-kep-eleres/{id}',[EloadoController::class,'updateEloadoKepEleres']);
Route::delete('/delete-eloado/{id}',[EloadoController::class,'destroyEloado']);

Route::get('/eloado-mufaj-kapcsolatok',[EloadoMufajController::class,'index']);
Route::get('/eloado-mufaj-kapcsolatok/{eloado_mufaj}',[EloadoMufajController::class,'show']);
Route::post('/create-eloado-mufaj',[EloadoMufajController::class,'create']);
Route::put('/update-eloado-mufaj/{id}',[EloadoMufajController::class,'updateEloadoMufajKapcsolat']);
Route::delete('/delete-eloado-mufaj/{id}',[EloadoMufajController::class,'deleteEloadoMufajKapcsolat']);

Route::get('/mufajok',[MufajController::class,'index']);
Route::get('/mufajok/{mufaj}',[MufajController::class,'show']);
Route::post('/create-mufaj',[MufajController::class,'create']);
Route::put('/update-mufaj/{id}',[MufajController::class,'updateMufaj']);
Route::delete('/delete-mufaj/{id}',[MufajController::class,'destroyMufaj']);