<?php


use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::get('/health', function () {
        return response()->json([
            'success' => true,
            'message' => 'API is running',
        ]);
    });

    require __DIR__  . '/auth/auth.php';
});
