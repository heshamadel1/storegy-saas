<?php

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
|
| API-First architecture: no server-side rendering.
| All UI is handled by the Next.js frontend.
|
*/

Route::get('/', fn() => response()->json([
    'name'    => config('app.name'),
    'version' => '1.0.0',
    'api'     => '/api/v1',
    'status'  => 'ok',
    'time'    => now()->toIso8601String(),
]));
