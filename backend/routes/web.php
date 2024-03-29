<?php

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::get('/eloado-kep/{kepNev}', function ($kepNev) {
    $path = public_path('egyuttes_kepek/' . $kepNev);

    if (!file_exists($path)) {
        abort(404);
    }

    $file = file_get_contents($path);
    $type = mime_content_type($path);

    return response($file)->header('Content-Type', $type);
})->where('filename', '.*');

Route::get('/helyszin-kep/{kepNev}', function ($kepNev) {
    $path = public_path('helyszin_kep/' . $kepNev);

    if (!file_exists($path)) {
        abort(404);
    }

    $file = file_get_contents($path);
    $type = mime_content_type($path);

    return response($file)->header('Content-Type', $type);
})->where('filename', '.*');

Route::get('/svg-helyszin-kep/{kepNev}', function ($kepNev) {
    $path = public_path('svg_helyszin/' . $kepNev);

    if (file_exists($path)) {

        $response = Response::make(file_get_contents($path),200);
        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Content-Type', 'image/svg+xml');

        return $response;
    }
    abort(404);
})->where('filename', '.*\.svg');


Route::get('/', function () {
    return view('welcome');
});