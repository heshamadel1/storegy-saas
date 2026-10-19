<?php

use App\Http\Controllers\Api\V1\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::get('/health', function () {
        return response()->json([
            'success' => true,
            'message' => 'API is running',
        ]);
    });

    Route::prefix('auth')->group(function () {
        Route::post('/register', RegisterController::class)
            ->middleware('throttle:10,1')
            ->name('api.v1.auth.register');
    });
});
