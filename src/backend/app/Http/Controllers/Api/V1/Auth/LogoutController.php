<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Actions\Auth\LogoutUser;
use Illuminate\Http\JsonResponse;

class LogoutController extends Controller
{
    public function __invoke(Request $request, LogoutUser $action): JsonResponse
    {
        $action->execute($request->user());

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }
}
