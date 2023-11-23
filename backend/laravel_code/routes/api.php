<?php

use App\Http\Controllers\EloadoController;
use App\Http\Controllers\EloadoMufajController;
use App\Http\Controllers\MufajController;
use App\Http\Controllers\HelyszinController;
use App\Http\Controllers\CimController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\LoginController;

Route::post('/create-eloado',[EloadoController::class,'store']);
Route::get('/eloadok',[EloadoController::class,'index']);
Route::get('/eloadok/{eloado}',[EloadoController::class,'show']);
Route::put('/update-eloado/{eloado}',[EloadoController::class,'update']);
Route::delete('/delete-eloado/{eloado}',[EloadoController::class,'destroy']);

Route::post('/create-mufaj',[MufajController::class,'store']);
Route::get('/mufajok',[MufajController::class,'index']);
Route::get('/mufajok/{mufaj}',[MufajController::class,'show']);
Route::put('/update-mufaj/{mufaj}',[MufajController::class,'update']);
Route::delete('/delete-mufaj/{mufaj}',[MufajController::class,'destroy']);

Route::post('/create-eloado-mufaj',[EloadoMufajController::class,'store']);
Route::get('/eloado-mufaj-kapcsolatok',[EloadoMufajController::class,'index']);
Route::get('/eloado-mufaj-kapcsolatok/{eloado_mufaj}',[EloadoMufajController::class,'show']);
Route::put('/update-eloado-mufaj/{eloado_mufaj}',[EloadoMufajController::class,'update']);
Route::delete('/delete-eloado-mufaj/{eloado_mufaj}',[EloadoMufajController::class,'destroy']);

Route::post('/create-helyszin',[HelyszinController::class,'store']);
Route::get('/helyszinek',[HelyszinController::class,'index']);
Route::get('/helyszinek/{helyszin}',[HelyszinController::class,'show']);
Route::put('/update-helyszin/{helyszin}',[HelyszinController::class,'update']);
Route::delete('/delete-helyszin/{helyszin}',[HelyszinController::class,'destroy']);

Route::post('/create-cim',[CimController::class,'store']);
Route::get('/cimek',[CimController::class,'index']);
Route::get('/cimek/{cim}',[CimController::class,'show']);
Route::put('/update-cim/{cim}',[CimController::class,'update']);
Route::delete('/delete-cim/{cim}',[CimController::class,'destroy']);

Route::post('/create-user',[UserController::class,'store']);
Route::get('/userek',[UserController::class,'index']);
Route::get('/userek/{user}',[UserController::class,'show']);
Route::put('/update-user/{user}',[UserController::class,'update']);
Route::delete('/delete-user/{user}',[UserController::class,'destroy']);

Route::post('/login', [LoginController::class, 'login']);