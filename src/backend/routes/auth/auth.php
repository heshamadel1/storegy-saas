<?php

use App\Http\Controllers\Api\V1\Auth\LoginController;
use App\Http\Controllers\Api\V1\Auth\LogoutController;
use App\Http\Controllers\Api\V1\Auth\RegisterController;
use Illuminate\Support\Facades\Route;



Route::prefix('auth')->group(function () {
    Route::post('/login', LoginController::class)->middleware('throttle:5,1')->name('api.v1.auth.login');
    Route::post('/register', RegisterController::class)->middleware('throttle:10,1')->name('api.v1.auth.register');
    Route::post('/logout', LogoutController::class)->middleware('auth:sanctum')->name('api.v1.auth.logout');
});
