<?php

use Illuminate\Http\Request;
use App\Http\Controllers\UserController;

Route::get('/data',[UserController::class,'getData']);
Route::post('/login',[UserController::class,'login']);
Route::post('/user-hozzaadas', [UserController::class, 'userHozzaadas']);    