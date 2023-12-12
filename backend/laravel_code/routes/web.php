<?php

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

Route::get('/helyszin-kep/{kep-nev}', function ($filename) {
    $path = public_path('images/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    $file = file_get_contents($path);
    $type = mime_content_type($path);

    return response($file)->header('Content-Type', $type);
})->where('filename', '.*');